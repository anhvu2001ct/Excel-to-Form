import React, { memo, useId, useRef, useState } from "react";
import { genHTMLId } from "../../../lib/customId";
import { ObjectType } from "../../../types/common";
import "./InputForm.scss";

const validateInput = (type: string, input: string) => {
  if (type === "text") return true;
  if (type === "phone") {
    const regex = /^[0-9]+$/;
    return input.match(regex) !== null;
  } else if (type === "email") {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return input.match(regex) != null;
  }
};

interface Props {
  title: string;
  id: string;
  type: string;
  value?: string;
  validateObj: ObjectType<boolean>;
}

export default memo(function InputForm({
  title,
  id,
  type,
  value = "",
  validateObj,
}: Props) {
  const cid = useId();
  const [valid, setValid] = useState(() => {
    return validateInput(type, value)!;
  });

  function updateValid(newValid: boolean) {
    setValid(newValid);
    if (!newValid) validateObj[id] = newValid;
    else delete validateObj[id];
  }

  const handleErorr = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateValid(validateInput(type, e.target.value)!);
  };

  return (
    <div className="input-container">
      <label htmlFor={cid} className="label">
        {title}
      </label>
      <input
        type={type === "phone" ? "text" : type}
        name={id}
        id={cid}
        placeholder="Enter your data"
        className="input-form"
        defaultValue={value}
        onChange={handleErorr}
      />
      {!valid && (
        <p className="text-error">{`Please enter correct format ${type}`}</p>
      )}
    </div>
  );
});
