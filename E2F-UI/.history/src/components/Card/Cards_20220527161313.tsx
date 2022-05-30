import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect, useState } from "react";
import { Workbook } from "../../types/Wordbook";
import { subscribe, unSubscribe } from "../modal/Modal";
type Props = {
  search: string;
};
export default function Cards({ search }: Props) {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const reponse = fetch(`http://localhost:5121/api/v1/workbook/get/all`)
        .then((data) => data.json())
        .then((data) => {
          setWorkbooks(data.message);
        });
    };
    subscribe(loadData);
    return () => unSubscribe(loadData);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      const params = new URLSearchParams(
        "http://localhost:5121/api/v1/workbook/search/name"
      );
      params.append("name", search);
      const response = await fetch(params.toString(), {
        method: "GET",
        signal: controller.signal,
      });
      console.log(response);
      const data = await response.json();
      //const result = data.message;
      //setWorkbooks(result);
    };
    loadData();
    //return () => controller.abort();
  }, [search]);

  return (
    <div className="card-container">
      {workbooks.map((item) => {
        return <CardItem key={item.id} {...item} />;
      })}
    </div>
  );
}
