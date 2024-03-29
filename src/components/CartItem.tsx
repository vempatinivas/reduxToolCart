import storeItems from "../data/items.json";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Button, Stack } from "react-bootstrap";
import { formatCurrency } from "../utils/formatCurrency";
import { Trash } from "lucide-react";

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const item = storeItems.find((item) => item.id === id);
  const { removeFromCart } = useShoppingCart();
  if (item) {
    return (
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "125px", objectFit: "cover" }}
        />

        <div className="me-auto">
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: "0.65rem" }}>
                x {quantity}
              </span>
            )}
          </div>

          <div className="text-muted" style={{ fontSize: "0.75rem" }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div>{formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(id)}
        >
          <Trash />
        </Button>
      </Stack>
    );
  }
  return null;
};
