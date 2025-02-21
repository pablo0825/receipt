/* Table.tsx */
import React from "react";
import Btn from "./Btn";

interface TableDats {
  ID: string;
  Name: string;
  Unit: string;
  JT: string;
  IN: string;
  BN: string;
  BC: string;
  BRN: string;
}

interface TaDatPerson {
  people: TableDats[];
}

const Table = ({ people }: TaDatPerson) => {
  return (
    <table className="rounded-sm">
      <thead>
        <tr className="bg-emerald-50">
          <th>姓名</th>
          <th>單位</th>
          <th>職稱</th>
          <th>身分證字號</th>
          <th>銀行名稱</th>
          <th>銀行代碼</th>
          <th>銀行帳號</th>
          <th>下載領據</th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {people.length > 0 ? (
          people.map((pve, idx) => {
            return (
              <tr key={pve.ID}>
                <td className="border border-gray-500 p-2">{pve.Name}</td>
                <td className="border border-gray-500 p-2">{pve.Unit}</td>
                <td className="border border-gray-500 p-2">{pve.JT}</td>
                <td className="border border-gray-500 p-2">{pve.IN}</td>
                <td className="border border-gray-500 p-2">{pve.BN}</td>
                <td className="border border-gray-500 p-2">{pve.BC}</td>
                <td className="border border-gray-500 p-2">{pve.BRN}</td>
                <td className="border border-gray-500 p-2">
                  <Btn idx={idx} people={people} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>沒有資料</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
