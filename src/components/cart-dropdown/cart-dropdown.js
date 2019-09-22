import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';
import {selectCartItems} from '../../redux/cart/cart.selectors';

import './cart-dropdown.scss';



const Cart = ({cartItems})=> (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.map(cartItem => (
                <CartItem key={cartItem.id} item ={cartItem}/>
                ))}
        </div>
        <CustomButton>go to checkout</CustomButton>
    </div>
);

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})
export default connect(mapStateToProps)(Cart);