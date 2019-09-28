import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/react.svg';
import {createStructuredSelector} from 'reselect';

import {selectCurrentUser} from '../../redux/user/user.selectors';
import {selectCartHidden} from '../../redux/cart/cart.selectors';

import CartIcon from '../cart-icon/cart-icon';
import Cart from '../cart-dropdown/cart-dropdown';
import './header.scss';
import { signOutStart } from '../../redux/user/user.action';

const Header = ({currentUser, hidden, signOutStart}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>
        <div className="options">
            <Link className="option" to="/shop">Shop</Link>
            <Link className="option" to="/shop">Contact</Link>
            {
                currentUser ?
                <div className="option" onClick={signOutStart}>Sign Out</div>
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

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch (signOutStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);