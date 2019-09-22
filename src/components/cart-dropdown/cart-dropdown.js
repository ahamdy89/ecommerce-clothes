import React from 'react';

import './cart-dropdown.scss';
import CustomButton from '../custom-button/custom-button';


const Cart = ()=> (
    <div className="cart-dropdown">
        <div className="cart-items"/>
        <CustomButton>go to checkout</CustomButton>
    </div>
);

export default Cart;