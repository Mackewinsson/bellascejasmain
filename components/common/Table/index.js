import React from "react";
import { Table } from "react-bootstrap";
import { BtnEdit } from "./styles";

const DataTable = ({ headers, data, onClickV, onClickE, onClickD }) => {
  let data2 = [];
  if (headers && headers.length > 0 && data && data.length > 0) {
    let arr1 = [];
    headers.forEach((el) => {
      arr1.push(el.key);
    });
    data.forEach((el) => {
      let info = {};
      arr1.map((el2) => {
        Object.keys(el).map((key) => {
          if (el2 == key) info[key] = el[key];
        });
      });
      data2.push(info);
    });
  }
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            {headers.map((item) => (
              <th key={item.key}>{item.text}</th>
            ))}
            {(onClickE || onClickD || onClickV) && (
              <th colSpan={onClickV ? 1 : 2} style={{ textAlign: "center" }}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data2 && data2.length > 0 ? (
            <>
              {data2.map((item, i) => (
                <tr key={JSON.stringify(item)}>
                  {Object.keys(item).map((item2) => (
                    <td key={item2}>{item[item2]}</td>
                  ))}
                  {onClickV && (
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <BtnEdit onClick={() => onClickV(item, i)}>V</BtnEdit>
                      </div>
                    </td>
                  )}
                  {onClickE && (
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <BtnEdit onClick={() => onClickE(item, i)}>E</BtnEdit>
                      </div>
                    </td>
                  )}
                  {onClickD && (
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <BtnEdit onClick={() => onClickD(item, i)}>D</BtnEdit>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td
                colSpan={
                  onClickE || onClickD ? headers.length + 1 : headers.length
                }
                style={{ textAlign: "center" }}
              >
                List is empty!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};
export default DataTable;
