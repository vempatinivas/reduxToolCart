import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartContext = {
  getQuantity: (id: number) => number;
  getTotalQuantity: number;
  removeFromCart: (id: number) => void;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  cartClose: () => void;
  cartOpen: () => void;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shipping-cart",
    []
  );

  const [isOpen, setIsOpen] = useState(false);

  function cartClose() {
    setIsOpen(false);
  }

  function cartOpen() {
    setIsOpen(true);
  }

  function getQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function removeFromCart(id: number) {
    setCartItems((items) => items.filter((item) => item.id !== id));
  }

  function increaseCartQuantity(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        return items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { id, quantity: 1 }];
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        return items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return items.filter((item) => item.id !== id);
    });
  }

  const getTotalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        getQuantity,
        removeFromCart,
        increaseCartQuantity,
        decreaseCartQuantity,
        getTotalQuantity,
        cartClose,
        cartOpen,
        cartItems,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
