import cartTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};



const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartTypes.TOGGLE_CART:
            return {
                ...state,
                hidden: !state.hidden
            }
        
        case cartTypes.ADD_ITEM:
            return{
                ...state,
                cartItems:[...state.cartItems, action.payload]
            }
        default:
            return state;
    }
}

export default cartReducer;