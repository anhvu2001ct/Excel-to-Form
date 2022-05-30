import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect, useState } from "react";
import { Workbook } from "../../types/Wordbook";

export default function Cards() {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  useEffect(() => {
    const reponse = fetch(`http://localhost:5121/api/v1/workbook/get/all`)
      .then((data) => data.json())
      .then((data) => {
        setWorkbooks(data);
      });
  }, []);
  return (
    <div className="card-container">
      <CardItem />
      <CardItem />
    </div>
  );
}
