import CardItem from "./CardItem";
import "./Card.scss";
import { useEffect, useRef, useState } from "react";
import { Workbook } from "../../types/Wordbook";
import { modalEvent } from "../modal/Modal";
import { workbookEnpoint } from "../../fetchingAPI/fetchingApi";
import { add } from "../notification/Notifications";
type Props = {
  search: string;
};
export default function Cards({ search }: Props) {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const deleteData = useRef<(id: number) => void>();
  useEffect(() => {
    const loadData = async () => {
      const response = fetch(`http://localhost:5121/api/v1/workbook/get/all`)
        .then((data) => data.json())
        .then((data) => {
          setWorkbooks(data.message);
        });
    };
    deleteData.current = async (id: number) => {
      try {
        const response = await fetch(workbookEnpoint + `/delete/${id}`, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log("deleteData ~ data", data);
        if (!response.ok) throw new Error(data.message);
        add("success", "Deleted successful");
      } catch (error) {
        const e = error as Error;
        add("error", e.message);
      }
      loadData();
    };
    modalEvent.subscribe(loadData);
    return () => {
      modalEvent.unSubscribe(loadData);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const loadData = async () => {
      const params = new URLSearchParams();
      params.append("name", search);

      const response = await fetch(
        `http://localhost:5121/api/v1/workbook/search/name?${params.toString()}`,
        {
          method: "GET",
          signal: controller.signal,
        }
      );
      try {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setWorkbooks(data.message);
      } catch (error) {}
    };
    loadData();
    return () => controller.abort();
  }, [search]);

  return (
    <div className="card-container">
      {workbooks.map((item) => {
        return (
          <CardItem key={item.id} {...item} onDelete={deleteData.current!} />
        );
      })}
    </div>
  );
}
