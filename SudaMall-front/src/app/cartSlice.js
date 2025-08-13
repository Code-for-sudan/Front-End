import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    itemList: [],
    totalQuantity: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,

    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.itemList.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.itemList.push({ 
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    totalPrice: action.payload.totalPrice,
                    quantity: 1.
                })
            }
        },


        removeFromCart: (state, action) => {
            const findItem = state.itemList.find(item => item.id === action.payload.id);
            
            if (findItem.quantity === 1) {
                state.itemList.filter(item => item.id != action.payload.id);
            } else {
                findItem.quantity--;
                findItem.totalPrice -= findItem.price;
            }

        },

        clearCart: (state) => {
            state.itemList = [];
        }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;