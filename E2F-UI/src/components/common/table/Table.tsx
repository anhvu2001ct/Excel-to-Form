import { SheetColumn, SheetRow } from "../../../types/Wordbook";
import Dropdown from "../dropdown/Dropdown";
import "./Table.scss";
interface Props {
  sheetData?: SheetRow[];
  columns: SheetColumn[];
  onRemove: (rowId: number) => void;
}
export default function Table({ columns, sheetData, onRemove }: Props) {
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
                      list={["Delete"]}
                      onClick={(idx) => onRemove(row.id)}
                    />
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
