import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectors';

import './checkout.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button';


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
        <div className="total">TOTAL: ${total}</div>
        <div className="test-message">
            *Please use the following data to test the payment using creadit card
            <br/>
            4242 4242 4242 4242  -   Exp: 01/20   - CVV: 123
        </div>
        <StripeCheckoutButton price= {total}/>
    </div>

)

const maptStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(maptStateToProps)(CheckoutPage);