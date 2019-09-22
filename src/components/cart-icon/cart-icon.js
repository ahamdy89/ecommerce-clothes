import React from 'react';
import {connect} from 'react-redux';
import {toggleCart} from '../../redux/cart/cart.action';
import {ReactComponent as BagIcon} from '../../assets/cart-bag.svg';

import './cart-icon.scss';


const CartIcon = ({toggleCart}) => (
    <div className="cart-icon" onClick={toggleCart}>
        <BagIcon className="bag-icon"/>
        <span className="item-count">0</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCart : ()=> dispatch(toggleCart())
});


export default connect(null, mapDispatchToProps)(CartIcon);