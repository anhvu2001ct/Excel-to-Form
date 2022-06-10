import { useRef, useState } from "react";
import { sheetEnpoint } from "../../../fetchingAPI/fetchingApi";
import { SheetColumn, SheetRow } from "../../../types/Wordbook";
import { add } from "../../notification/Notifications";
import EditSheetRow from "../../workbook-detail/EditSheetRow";
import Dropdown from "../dropdown/Dropdown";
import "./Table.scss";
interface Props {
  sheetId: number;
  workbookId: number;
  sheetData?: SheetRow[];
  columns: SheetColumn[];
  refreshData: () => void;
}
export default function Table({
  sheetId,
  workbookId,
  columns,
  sheetData,
  refreshData,
}: Props) {
  const [editModal, setEditModal] = useState(-1);

  const handleItem = (idx: number, rowId: any) => {
    if (idx === 0) deleteData(rowId);
    else if (idx === 1) setEditModal(rowId);
  };

  const deleteData = async (rowId: number) => {
    try {
      const response = await fetch(
        sheetEnpoint + `/delete/${workbookId}/${sheetId}/${rowId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log("deleteData ~ data", data);
      if (!response.ok) throw new Error(data.message);
      add("success", "Deleted successful");
    } catch (error) {
      const e = error as Error;
      add("error", e.message);
    }
    refreshData();
  };

  const editData = async (e: React.FormEvent, rowId: number) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      const response = await fetch(
        `${sheetEnpoint}/edit/${workbookId}/${sheetId}/${rowId}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      refreshData();
      add("success", "Data Edited successfully");
    } catch (error) {
      const _error = error as Error;
      add("error", _error.message);
    }
  };

  return (
    <>
      <div className="sheet-detail-content">
        <table className="sheet-detail-table">
          <thead>
            <tr>
              {columns.map((item, index) => (
                <th key={index}>
                  <div className="sheet-table-header">{item.name}</div>
                </th>
              ))}
              <th className="sheet-table-action">
                <div className="sheet-table-header sheet-table-header--action">
                  Action
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sheetData?.map((row) => (
              <tr key={row.id}>
                {row.data.map((cell, cellIdx) => (
                  <td key={cellIdx}>
                    <div className="sheet-table-content">{cell}</div>
                  </td>
                ))}

                <td className="sheet-table-action">
                  <div className="sheet-table-action--item">
                    <Dropdown
                      list={[
                        { title: "Delete", type: "danger" },
                        { title: "Edit", type: "normal" },
                      ]}
                      onClick={(idx) => handleItem(idx, row.id)}
                    />
                    {editModal === row.id && (
                      <EditSheetRow
                        columns={columns}
                        rowData={row}
                        onClose={() => setEditModal(-1)}
                        onSave={editData}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
