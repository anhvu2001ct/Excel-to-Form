import { SheetColumn } from "../../../types/Wordbook";
import "./Table.scss";
interface Props {
  sheetData?: string[][];
  columns: SheetColumn[];
}
export default function Table({ columns, sheetData }: Props) {
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
            </tr>
          </thead>
          <tbody>
            {sheetData?.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx}>
                    <div className="sheet-table-content">{cell}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
