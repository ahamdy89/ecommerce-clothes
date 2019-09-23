import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import './checkout.scss';
import CartItem from '../../components/cart-item/cart-item';
import CheckoutItem from '../../components/checkout-item/checkout-item';


const CheckoutPage = ({cartItems, total}) => (

    <div className="checkout-page">
        <div className="checkout-header">
            <div className="header-item">
                <span>Product</span>
            </div>
            <div className="header-item">
                <span>Description</span>
            </div>
            <div className="header-item">
                <span>Quantity</span>
            </div>
            <div className="header-item">
                <span>Price</span>
            </div>
            <div className="header-item">
                <span>Remove</span>
            </div>
        </div>
        { 
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )
        }
        <div className="total">
            <span>TOTAL: ${total}</span>
        </div>
    </div>

)

const maptStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(maptStateToProps)(CheckoutPage);