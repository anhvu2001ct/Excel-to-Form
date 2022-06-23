import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import DefaultImage from "../../data/img/default-img.webp";
import { Workbook } from "../../types/Workbook";
import "./HeaderWorkbook.scss";
type Props = {
  workbook: Workbook;
  disable?: boolean;
};
export default function HeaderWorkbook({ workbook, disable = false }: Props) {
  const [title, setTitle] = useState(workbook.name);
  const [description, setDescription] = useState(workbook.description || "");
  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <div className="w-full md:max-h-[250px] md:max-w-[250px] object-cover rounded-md">
        <img
          src={workbook.url || DefaultImage}
          alt="hinh"
          className="w-full h-full object-cover rounded-md "
        />
      </div>
      <div className=" flex flex-col gap-3 flex-grow">
        <div
          className={`header-top-title font-bold flex-shrink w-full md:max-w-[200px] transition-all ${
            title?.length < 1 ? "error" : ""
          }`}
        >
          {!disable && (
            <label htmlFor="header-name" className="header-top-label">
              <i className="fas fa-pen-alt"></i>
            </label>
          )}
          <input
            placeholder="Enter title"
            disabled={disable}
            name="name"
            id="header-name"
            value={title}
            className="text-center text-inherit relative z-[2] bg-transparent"
            onChange={(e) => {
              setTitle(e.target.value);
              workbook.name = e.target.value;
            }}
          />
        </div>
        <TextArea
          disabled={disable}
          rows={4}
          placeholder="Enter your description here"
          className="flex-grow"
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            workbook.description = value ? value : "";
            setDescription(value);
          }}
        />
      </div>
    </div>
  );
}
