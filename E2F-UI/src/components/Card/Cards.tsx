import CardItem from "./CardItem";
import "./Card.scss";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import { Workbook } from "../../types/Wordbook";
import { modalEvent } from "../modal/Modal";
import { workbookEnpoint } from "../../fetchingAPI/fetchingApi";
import { add } from "../notification/Notifications";
import useDebounceState from "../../hooks/useDebounceState";
import Spinner from "../loading/Spinner";
type Props = {
  search: string;
};

const CardContext = createContext({ reload: () => {} });
export { CardContext };

export default function Cards({ search }: Props) {
  const [workbooks, setWorkbooks] = useState<Workbook[]>([]);
  const loadWorkbook = async () => {
    const params = new URLSearchParams();
    params.append("name", search);

    const response = await fetch(
      `http://localhost:5121/api/v1/workbook/search/name?${params.toString()}`,
      {
        method: "GET",
      }
    );
    try {
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setWorkbooks(data.message);
    } catch (error) {}
  };

  const pending = useDebounceState(loadWorkbook, [search]);

  const deleteWorkbook = async (id: number) => {
    try {
      const response = await fetch(workbookEnpoint + `/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      add("success", "Deleted successful");
    } catch (error) {
      const e = error as Error;
      add("error", e.message);
    }
    loadWorkbook();
  };

  useEffect(() => {
    loadWorkbook();
    modalEvent.subscribe(loadWorkbook);
    return () => {
      modalEvent.unSubscribe(loadWorkbook);
    };
  }, []);

  return (
    <div className="card-container">
      {pending && (
        <div className="card-spinner">
          <Spinner className="spinner-center" size="40px" borderSize="4px" />
        </div>
      )}
      <CardContext.Provider value={{ reload: loadWorkbook }}>
        {workbooks.map((item) => {
          return <CardItem key={item.id} {...item} onDelete={deleteWorkbook} />;
        })}
      </CardContext.Provider>
    </div>
  );
}
