import React, { useContext, useRef, useState } from "react";
import ReactDom from "react-dom";
import DefaultImage from "../../data/img/default-img.webp";
import { workbookEnpoint } from "../../fetchingAPI/fetchingApi";
import { ObjectType } from "../../types/common";
import Button from "../common/button/btnPrimary/Button";
import { add } from "../notification/Notifications";
import { CardContext } from "./Cards";
import "./EditCard.scss";

interface IProps {
  onClose: () => void;
  workbookUpdate: {
    id: number;
    name: string;
    description?: string;
    url?: string;
  };
}
const EditCard = ({ onClose, workbookUpdate }: IProps) => {
  if (typeof document === "undefined") return null;
  const { reload } = useContext(CardContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<File>();
  const [error, setError] = useState<ObjectType<boolean>>({});
  const [loading, setLoading] = useState(false);
  const abortFetch = useRef(new AbortController());
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileRef.current = e.target.files[0];
      imgRef.current!.src = URL.createObjectURL(fileRef.current);
    }
  };

  const validateInput = (key: string, isValid: boolean) => {
    setError((old) => {
      const newError = { ...old };
      if (isValid) delete newError[key];
      else newError[key] = true;
      return newError;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const arrError = Object.keys(error);
      if (arrError.length) {
        throw new Error(`Input ${arrError.join(", ")} invalid`);
      }
      const formData = new FormData(e.target as HTMLFormElement);
      if (fileRef.current) formData.append("image", fileRef.current);
      setLoading(true);
      abortFetch.current.abort();
      abortFetch.current = new AbortController();
      const response = await fetch(
        `${workbookEnpoint}/edit/${workbookUpdate.id}`,
        {
          method: "POST",
          body: formData,
          signal: abortFetch.current.signal,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setLoading(false);
      add("success", "Updated successfully");
      reload();
    } catch (error) {
      const _error = error as Error;
      setLoading(false);
      add("error", _error.message);
    }
  };
  return ReactDom.createPortal(
    <div className="edit">
      <div className="edit-overlay"></div>
      <form className="edit-content" onSubmit={handleSubmit}>
        <h3 className="edit-title">EDIT WORKBOOK</h3>
        <span className="edit-icon" onClick={onClose}>
          <i className="fal fa-times"></i>
        </span>
        <div className="edit-main">
          <div className="edit-input-image">
            <input
              type="file"
              name="edit-image"
              accept="image/*"
              id="edit-image"
              onChange={changeImage}
            />
            <img
              ref={imgRef}
              src={workbookUpdate.url || DefaultImage}
              alt="edit-image"
            />
            <label htmlFor="edit-image" className="edit-label-image">
              <i className="fal fa-upload"></i>
            </label>
          </div>
          <div className="edit-main-content">
            <div className={`edit-main-title ${error.name ? "error" : ""}`}>
              <input
                type="text"
                name="name"
                placeholder="Enter title workbook"
                defaultValue={workbookUpdate.name}
                onChange={(e) =>
                  validateInput("name", e.target.value.length > 0)
                }
              />
            </div>
            <textarea
              name="description"
              className={`edit-main-desc ${error.description ? "error" : ""}`}
              placeholder="Enter your content here"
              defaultValue={workbookUpdate.description}
              onChange={(e) =>
                validateInput("description", e.target.value.length > 0)
              }
            ></textarea>
          </div>
        </div>
        <div className="edit-btn-container">
          <Button
            type="secondary"
            onClick={() => {
              abortFetch.current.abort();
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button isFormSubmit={true} isLoading={loading}>
            Save
          </Button>
        </div>
      </form>
    </div>,
    document.querySelector("body") as HTMLBodyElement
  );
};

export default EditCard;
