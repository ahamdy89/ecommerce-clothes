import React from 'react';
import {connect} from 'react-redux';
import {toggleCart} from '../../redux/cart/cart.action';
import {createStructuredSelector} from 'reselect';

import {selectCartItemsCount} from '../../redux/cart/cart.selectors';

import {ReactComponent as BagIcon} from '../../assets/cart-bag.svg';

import './cart-icon.scss';


const CartIcon = ({toggleCart, itemCount}) => (
    <div className="cart-icon" onClick={toggleCart}>
        <BagIcon className="bag-icon"/>
        <span className="item-count">{itemCount}</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleCart : ()=> dispatch(toggleCart())
});

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);