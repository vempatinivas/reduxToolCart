import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type CartItem = {
  id: number;
  quantity: number;
};

interface CartState {
  cartItems: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  cartItems: getLocalStorage('cartItems'),
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {   
    removeFromCart(state, action: PayloadAction<number>) {
      state.cartItems = getLocalStorage('cartItems');
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== idToRemove);
      setLocalStorage('cartItems', state.cartItems);
    },
    increaseCartQuantity(state, action: PayloadAction<number>) {
      setLocalStorage('cartItems', state.cartItems);
      const idToIncrease = action.payload;
      const itemToIncrease = state.cartItems.find(item => item.id === idToIncrease);
      if (!itemToIncrease) {
        state.cartItems.push({ id:idToIncrease, quantity:1 });
      }
      if (itemToIncrease) {
        itemToIncrease.quantity++;
      }
      setLocalStorage('cartItems', state.cartItems);
    },
    decreaseCartQuantity(state, action: PayloadAction<number>) {
      state.cartItems = getLocalStorage('cartItems');
      const idToDecrease = action.payload;
      const itemToDecrease = state.cartItems.find(item => item.id === idToDecrease);
      if (itemToDecrease && itemToDecrease.quantity > 1) {
        itemToDecrease.quantity--;
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== idToDecrease);
      }
      setLocalStorage('cartItems', state.cartItems);
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {  
  removeFromCart,
  increaseCartQuantity,
  decreaseCartQuantity,
  toggleCart,
} = cartSlice.actions;

function setLocalStorage(key: string, value: any) {
  localStorage.setItem  (key, JSON.stringify(value)); 
}

function getLocalStorage(key: string) {
  const jsonValue = localStorage.getItem(key);
  return jsonValue !== null ? JSON.parse(jsonValue) : [];
}

export const getQuantity = (state: CartState, id: number) => {
  const item = state.cartItems.find(item => item.id === id);
  return item ? item.quantity : 0;
};

export const getTotalItems = (state: CartState) => {
  return state.cartItems.reduce((total, item) => total + item.quantity, 0);
}

export default cartSlice.reducer;
