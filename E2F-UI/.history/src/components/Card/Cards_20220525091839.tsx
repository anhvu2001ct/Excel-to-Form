import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect } from "react";
export default function Cards() {
  useEffect(() => {
    const reponse: {} = fetch(`http://localhost:5121/api/v1/workbook/get/all`);
  }, []);
  return (
    <div className="card-container">
      <CardItem />
      <CardItem />
    </div>
  );
}
