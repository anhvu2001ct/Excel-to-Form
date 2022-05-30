import { useEffect, useState } from "react";
import { Workbook } from "../../types/Wordbook";
import Separator from "../common/separator/Separator";
import Sheet from "../sheet/Sheet";
import "./Modal.scss";
type Props = {
  setFile: Function;
  file?: File;
};
export default function Modal({ file,setFile }: Props) {
  const [response, setReseponse] = useState<Workbook>();
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
            <div className="modal-top-title">Lorem ipsum dolor</div>
            <textarea className="modal-top-desc" value="abcd"></textarea>
          </div>
        </div>
        <Separator title="Infomation of file" />
        <Sheet></Sheet>
      </div>
    </div>
  );
}
