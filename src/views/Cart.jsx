import { useContext, useState } from "react";
import { Container, Table, Button, Image, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart, total, clearCart } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const [message, setMessage] = useState(null);

  const handleCheckout = async () => {
    if (!token) {
      setMessage({ type: "error", text: "Debes iniciar sesión para pagar." });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error al realizar el pago");

      setMessage({ type: "success", text: "✅ ¡Compra realizada con éxito!" });
      clearCart(); // Limpia el carrito después de pagar
    } catch (error) {
      setMessage({ type: "error", text: "❌ Error: " + error.message });
    }
  };

  return (
    <Container className="mt-4">
      <h2>🛒 Carrito de compras</h2>

      {message && (
        <Alert
          variant={message.type === "success" ? "success" : "danger"}
          className="mt-3"
        >
          {message.text}
        </Alert>
      )}

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Pizza</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((pizza) => (
              <tr key={pizza.id}>
                <td>{pizza.name}</td>
                <td>
                  <Image
                    src={pizza.img}
                    alt={pizza.name}
                    style={{ width: "80px" }}
                    rounded
                  />
                </td>
                <td>${pizza.price.toLocaleString("es-CL")}</td>
                <td>{pizza.count}</td>
                <td>${(pizza.price * pizza.count).toLocaleString("es-CL")}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => increment(pizza.id)}
                  >
                    +
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => decrement(pizza.id)}
                  >
                    -
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => removeFromCart(pizza.id)}
                  >
                    🗑
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h4>Total: ${total.toLocaleString("es-CL")}</h4>
      <Button
        variant="primary"
        disabled={!token || cart.length === 0}
        onClick={handleCheckout}
      >
        {token ? "Pagar" : "Inicia sesión para pagar"}
      </Button>
    </Container>
  );
};

export default Cart;
