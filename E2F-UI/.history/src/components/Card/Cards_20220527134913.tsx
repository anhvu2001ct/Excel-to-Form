import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect, useState } from "react";
import { Workbook } from "../../types/Wordbook";
import { subscribe } from "../modal/Modal";

export default function Cards() {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  useEffect(() => {
    const loadData = async () => {
      const reponse = fetch(`http://localhost:5121/api/v1/workbook/get/all`)
      .then((data) => data.json())
      .then((data) => {
        setWorkbooks(data.message);
      });
    }
    
    subscribe(() => {

    })
  }, []);
  return (
    <div className="card-container">
      {workbooks.map((item) => {
        return <CardItem key={item.id} {...item} />;
      })}
    </div>
  );
}
