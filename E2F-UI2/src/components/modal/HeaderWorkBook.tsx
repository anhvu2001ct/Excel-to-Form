import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import DefaultImage from "../../data/img/default-img.webp";
import { Workbook } from "../../types/Workbook";
import "./HeaderWorkBook.scss";
type Props = {
  workbook: Workbook;
};
export default function HeaderWorkBook({ workbook }: Props) {
  if (!workbook) return null;
  const [title, setTitle] = useState(workbook.name);
  const [description, setDescription] = useState(workbook.description || "");
  return (
    <div className="flex gap-5 max-h-[150px]">
      <div className="w-1/4 object-cover rounded-md">
        <img
          src={workbook.url || DefaultImage}
          alt="hinh"
          className="w-full h-full object-cover rounded-md "
        />
      </div>
      <div className=" flex flex-col gap-3 flex-grow">
        <div
          className={`header-top-title font-bold flex-shrink transition-all ${
            title?.length < 1 ? "error" : ""
          }`}
        >
          <label htmlFor="header-name" className="header-top-label">
            <i className="fas fa-pen-alt"></i>
          </label>
          <input
            placeholder="Enter title"
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
          rows={4}
          placeholder="Enter your description here"
          className="flex-grow"
          value={description}
          onChange={(e) => {
            const value = e.target.value;
            workbook.description = value ? value : undefined;
            setDescription(value);
          }}
        />
      </div>
    </div>
  );
}
