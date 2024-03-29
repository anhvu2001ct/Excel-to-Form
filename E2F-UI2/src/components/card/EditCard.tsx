import { Button, message, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useId, useRef, useState } from "react";
import { toast } from "react-toastify";
import { apiEndpoint } from "../../API/endpoint";
import DefaultImage from "../../data/img/default-img.webp";
import { Workbook } from "../../types/Workbook";
import "./EditCard.scss";

type Props = {
  workbook: Workbook;
  visible: boolean;
  onClose: (update: boolean) => void;
};

const EditCard = ({ workbook, visible, onClose }: Props) => {
  const [waiting, setWaiting] = useState(false);
  const [title, setTitle] = useState(workbook.name);
  const [description, setDescription] = useState(workbook.description);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<File>();
  const imgId = useId();

  const updateData = async () => {
    try {
      if (!title) {
        toast.error("Title cannot empty!");
        return;
      }

      setWaiting(true);
      const formData = new FormData();
      formData.append("name", title);
      formData.append("description", description ?? "");
      if (fileRef.current) formData.append("image", fileRef.current);

      const response = await fetch(
        apiEndpoint("workbook", "edit", workbook.id.toString()),
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) throw new Error((await response.json()).message);
      onClose(true);
      message.info("Edited workbook");
    } catch (_error) {
      const error = _error as Error;
      toast.error(error.message);
    } finally {
      setWaiting(false);
    }
  };

  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      fileRef.current = e.target.files[0];
      imgRef.current!.src = URL.createObjectURL(fileRef.current);
      console.log(imgRef.current?.src);
    }
  };

  return (
    <Modal
      title="Edit workbook"
      visible={visible}
      onCancel={() => onClose(false)}
      width={800}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={() => onClose(false)}
          className="text-blue-500"
        >
          Cancel
        </Button>,
        <Button
          key="link"
          type="primary"
          onClick={updateData}
          className="bg-blue-500"
          loading={waiting}
        >
          Submit
        </Button>,
      ]}
    >
      <div className="flex gap-5 max-h-[150px]">
        <div className="w-1/4 object-cover rounded-md relative">
          <label
            htmlFor={imgId}
            className="rounded-md flex items-center justify-center absolute inset-0 z-[2] cursor-pointer transition-all group hover:bg-black/[.2]"
          >
            <i
              className="fal fa-upload opacity-50

             text-lg group-hover:opacity-100"
            ></i>
          </label>
          <input
            type="file"
            accept="image/*"
            id={imgId}
            className="hidden"
            onChange={changeImage}
          />

          <img
            ref={imgRef}
            src={workbook.url || DefaultImage}
            alt="hinh"
            className="w-full h-full object-cover rounded-md "
          />
        </div>
        <div className=" flex flex-col gap-3 flex-grow">
          <div
            className={`header-top-title font-bold flex-shrink transition-all ${
              title.length < 1 ? "error" : ""
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
                const value = e.target.value;
                setTitle(value);
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
              setDescription(value);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default EditCard;
