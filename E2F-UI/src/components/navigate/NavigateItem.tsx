import { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  useWorkbookImport,
  WorkbookImportProvider,
} from "../../context/workbookImport-context";
import { Modal } from "../modal/Modal";
import { add } from "../notification/Notifications";
type Props = {
  title: string;
  icon: string;
  href?: string;
  position: "left" | "right";
  input?: "file";
};

const NavigateItem = ({ title, icon, position, href, input }: Props) => {
  const [file, setFile] = useState<File>();
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files![0];
    if (_file.size > 50000000) {
      add("error", "File size exceed 50MB!");
      return;
    }
    setFile(_file);
  };
  return (
    <Fragment>
      {input && (
        <>
          <label htmlFor="input-file" className="navigate-item">
            <span className="navigate-item-text">{title}</span>
            <span className="navigate-item-icon">
              <i className={`fal fa-${icon}`}></i>
            </span>
          </label>

          <input
            type="file"
            id="input-file"
            className="navigate-input"
            accept=".xlsx"
            onChange={handleFile}
            onClick={(e) => ((e.target as HTMLInputElement).value = "")}
          />
          {file && (
            <WorkbookImportProvider>
              <Modal
                file={file}
                close={() => {
                  setFile(undefined);
                }}
              />
            </WorkbookImportProvider>
          )}
        </>
      )}
      {!input && (
        <NavLink to={href ?? title} className="navigate-item">
          {position === "left" ? (
            <>
              <span className="navigate-item-text">{title}</span>
              <span className="navigate-item-icon">
                <i className={`fal fa-${icon}`}></i>
              </span>
            </>
          ) : (
            <>
              <span className="navigate-item-icon">
                <i className={`fal fa-${icon}`}></i>
              </span>
              <span className="navigate-item-text">{title}</span>
            </>
          )}
        </NavLink>
      )}
    </Fragment>
  );
};

export default NavigateItem;
