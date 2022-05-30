import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect } from "react";
export default function Cards() {
  useEffect(() => {
    const [d]
    const reponse = fetch(`http://localhost:5121/api/v1/workbook/get/all`)
      .then((data) => data.json())
      .then((data) => {});
  }, []);
  return (
    <div className="card-container">
      <CardItem />
      <CardItem />
    </div>
  );
}
