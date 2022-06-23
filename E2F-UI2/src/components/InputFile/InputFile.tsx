import { useRef, useState } from "react";
type Props = {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const InputFile = ({ name, onChange, ...props }: Props) => {
  return (
    <>
      <label
        htmlFor={name}
        className="flex items-center justify-between w-[150px] cursor-pointer"
      >
        <i className="fal fa-file-import"></i>
        <span>Import</span>
      </label>
      <input
        className="hidden"
        type="file"
        name={name}
        id={name}
        onChange={(e) => onChange(e)}
      />
    </>
  );
};

export default InputFile;
