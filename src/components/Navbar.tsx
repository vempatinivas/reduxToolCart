import { Button, Container, Nav, Navbar as NavbarBS } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//import { useShoppingCart } from "../context/ShoppingCartContext";
import { getTotalItems, toggleCart } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { ShoppingCart as CartIcon } from "lucide-react";
import ShoppingCart from "./ShoppingCart";

function Navbar() {
  const dispatch = useDispatch();
  const TotalCart = getTotalItems(
    useSelector((state: RootState) => state.cart)
  );
  const isOpen = useSelector((state: RootState) => state.cart.isOpen);

  return (
    <>
      <ShoppingCart isOpen={isOpen} />
      <NavbarBS sticky="top" className="bg-white shadow-sm mb-3 ">
        <Container>
          <Nav className="me-auto">
            <Nav.Link to="/" as={NavLink}>
              Home
            </Nav.Link>

            <Nav.Link to="/store" as={NavLink}>
              Store
            </Nav.Link>

            <Nav.Link to="/about" as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Button
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
            onClick={() => dispatch(toggleCart())}
          >
            <CartIcon size={24} />

            <div
              className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                position: "absolute",
                color: "white",
                bottom: 0,
                right: 0,
                transform: "translate(25%, 25%)",
              }}
            >
              {TotalCart}
            </div>
          </Button>
        </Container>
      </NavbarBS>
    </>
  );
}

export default Navbar;
