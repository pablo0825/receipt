/* Table.tsx */
import React from "react";
import Btn from "./Btn";
import PreviewBtn from "./PreviewBtn";
import PdfBtn from "./PdfBtn";

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
    <div className="overscroll-x-auto p-4">
      <table className="min-w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <thead className=" bg-[#F9FAFB]">
          <tr className="border-b-[1px] text-center">
            <th className="px-6 py-3">姓名</th>
            <th className="px-6 py-3">單位</th>
            <th className="px-6 py-3">職稱</th>
            <th className="px-6 py-3">身分證字號</th>
            <th className="px-6 py-3">銀行名稱</th>
            <th className="px-6 py-3">銀行代碼</th>
            <th className="px-6 py-3">銀行帳號</th>
            <th className="px-6 py-3">預覽/下載領據</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {people.length > 0 ? (
            people.map((pve, idx) => {
              return (
                <tr key={pve.ID} className="hover:bg-gray-100 text-center">
                  <td className="px-6 py-4">{pve.Name}</td>
                  <td className="px-6 py-4">{pve.Unit}</td>
                  <td className="px-6 py-4">{pve.JT}</td>
                  <td className="px-6 py-4">{pve.IN}</td>
                  <td className="px-6 py-4">{pve.BN}</td>
                  <td className="px-6 py-4">{pve.BC}</td>
                  <td className="px-6 py-4">{pve.BRN}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-row space-x-2">
                      <PreviewBtn />
                      <Btn idx={idx} people={people} />
                      <PdfBtn idx={idx} people={people} />
                    </div>
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
    </div>
  );
};

export default Table;
