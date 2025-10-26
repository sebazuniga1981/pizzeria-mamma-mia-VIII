import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CardPizza = ({ name, price, ingredients, img, onViewMore, onAdd, desc }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAdd();
    setAdded(true);
    // vuelve al estado normal después de 1 segundo
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <Card style={{ width: "18rem", margin: "1rem", minHeight: "430px" }}>
      <Card.Img variant="top" src={img} alt={name} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title>Pizza {name}</Card.Title>
        <Card.Text>
          <strong>Precio:</strong>{" "}
          {price ? `$${price.toLocaleString("es-CL")}` : "No disponible"}
        </Card.Text>

        <Card.Text>
          <strong>Ingredientes:</strong>
        </Card.Text>
        <ul style={{ marginTop: 0, paddingLeft: "1rem" }}>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <Card.Text>
          <strong>Descripción:</strong> {desc}
        </Card.Text>

        {/* Botones */}
        <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
          <Button
            style={{
              flex: 1,
              backgroundColor: "black",
              color: "white",
              border: "none",
            }}
            onClick={onViewMore}
          >
            Ver más
          </Button>

          <Button
            onClick={handleAdd}
            style={{
              flex: 1,
              backgroundColor: added ? "green" : "white",
              color: added ? "white" : "black",
              border: "1px solid black",
              transition: "all 0.3s ease",
            }}
          >
            {added ? "Agregada ✅" : "Añadir"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPizza;
