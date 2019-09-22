import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/logo.svg';

import './header.scss';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';
import Cart from '../cart-dropdown/cart-dropdown';

const Header = ({currentUser, hidden}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">Shop</Link>
            <Link className="option" to="/shop">Contact</Link>
            {
                currentUser ?
                <div className="option" onClick={()=> auth.signOut()}>Sign Out</div>
                :
                <Link className="option" to="/signin">Sign In</Link>
            }
            <CartIcon/>
        </div>
        {
        hidden ? null : <Cart/>
        }
    </div>
)

const mapStateToProps = ({user: {currentUser}, cart:{ hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);