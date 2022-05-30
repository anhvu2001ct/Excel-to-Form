import { useEffect, useState } from "react";
import { WorkbookImport } from "../../types/WorkbookImport";
import Separator from "../common/separator/Separator";
import Sheets from "../sheet/Sheets";
import "./Modal.scss";
type Props = {
  close: () => void;
  file?: File;
};
export default function Modal({ file, close }: Props) {
  const [response, setReseponse] = useState<WorkbookImport>();
  const formData = new FormData();
  formData.append("file", file!);
  const endpoint = `http://localhost:5121/api/v1/import/sheet`;
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await fetch(endpoint, {
          method: "POST",
          body: formData,
        });
        const data = await resp.json();
        if (!resp.ok) throw new Error(data.message);
        setReseponse(data.message);
      } catch (error) {
        console.error(error);
        close();
      }
    };
    getData();
  }, []);
  return (
    <div className="modal">
      <div className="overlay"></div>
      <div className="modal-container">
        <div className="modal-top">
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="modal-top-image"
          />
          <div className="modal-top-content">
            <div className="modal-top-title">{response?.name}</div>
            <textarea
              className="modal-top-desc"
              value={response?.description}
            ></textarea>
          </div>
        </div>
        <Separator title="Infomation of file" />
        {response?.sheets.map((sheet) => {
          return <Sheets {...sheet}></Sheets>;
        })}
      </div>
    </div>
  );
}
