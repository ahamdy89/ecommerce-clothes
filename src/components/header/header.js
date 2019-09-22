import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon';
import Cart from '../cart-dropdown/cart-dropdown';
import './header.scss';

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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);