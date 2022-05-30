import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect } from "react";
export default function Cards() {
  useEffect(() => {}, []);
  return (
    <div className="card-container">
      <CardItem />
      <CardItem />
    </div>
  );
}
