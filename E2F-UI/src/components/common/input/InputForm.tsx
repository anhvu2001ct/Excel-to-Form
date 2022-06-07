import React, { memo, useRef, useState } from "react";
import { genHTMLId } from "../../../lib/customId";
import "./InputForm.scss";
interface Props {
  title: string;
  id: string;
  type: string;
  error: string[];
  setErrorForm: React.Dispatch<React.SetStateAction<string[]>>;
}
export default memo(function InputForm({
  title,
  id,
  type,
  error,
  setErrorForm,
}: Props) {
  const cid = useRef(genHTMLId()).current;
  function updateError() {
    if (error.length < 1) {
      setErrorForm([type]);
    } else {
      if (!error.includes(type)) {
        setErrorForm((prevState) => {
          return [...prevState, type];
        });
      }
    }
  }
  const handleErorr = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "phone") {
      const regex = /^[0-9]+$/;
      if (!e.target.value.match(regex)) {
        updateError();
      } else {
        setErrorForm(error.filter((item) => item !== type));
      }
    } else if (type === "email") {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!e.target.value.match(regex)) {
        updateError();
      } else {
        setErrorForm(error.filter((item) => item !== type));
      }
    }
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
        onChange={(e) => {
          handleErorr(e);
        }}
      />
      <>
        {error?.map((item) => {
          return item === type ? (
            <p className="text-error">{`Please enter correct format ${type}`}</p>
          ) : null;
        })}
      </>
    </div>
  );
});
