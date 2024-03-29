import { Offcanvas, Stack } from "react-bootstrap";
//import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { formatCurrency } from "../utils/formatCurrency";
import storeItems from "../data/items.json";
import { toggleCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

type ShoppingCartProps = {
  isOpen: boolean;
};

function ShoppingCart({ isOpen }: ShoppingCartProps) {
  //const { cartClose, cartItems } = useShoppingCart();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  return (
    <>
      <Offcanvas
        show={isOpen}
        placement="end"
        onHide={() => dispatch(toggleCart())}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 && <p>Cart is empty</p>}
          <Stack gap={3}>
            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between">
                <CartItem key={item.id} {...item} />
              </div>
            ))}
            {cartItems.length > 0 && (
              <div className="ms-auto fw-bold fs-5">
                Total:
                {formatCurrency(
                  cartItems.reduce((total, cartItem) => {
                    const item = storeItems.find(
                      (item) => item.id === cartItem.id
                    );
                    return total + (item?.price || 0) * cartItem.quantity;
                  }, 0)
                )}
              </div>
            )}
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ShoppingCart;
