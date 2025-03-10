import React from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

interface BtnDats {
  ID: string;
  Name: string;
  Unit: string;
  JT: string;
  IN: string;
  BN: string;
  BC: string;
  BRN: string;
}

interface BtnPerson {
  idx: number;
  people: BtnDats[];
}

const Btn = ({ idx, people }: BtnPerson) => {
  const generateWord = async (id: number, name: string) => {
    if (people.length === 0) {
      alert("請先獲取 API 資料");
      return;
    }

    try {
      const response = await fetch("/template.docx");
      if (!response.ok) throw new Error("無法載入 Word 模板");

      const templateArrayBuffer = await response.arrayBuffer();
      const zip = new PizZip(templateArrayBuffer);
      const doc = new Docxtemplater(zip);

      const peopleData = people[id];

      const idNumber = (peopleData.IN || "").padEnd(10, " ");
      const idDigits = idNumber.split("");

      const cleanBrn = String(peopleData.BRN || "").replace(/-/g, "");
      const idBrn = cleanBrn.padEnd(16, " ");
      const idBrnDigits = idBrn.split("");

      const idObject: { [key: string]: string } = {};
      const brnObject: { [key: string]: string } = {};

      handletring(10, "IN", idObject, idDigits);
      handletring(16, "B", brnObject, idBrnDigits);

      doc.setData({ ...peopleData, ...idObject, ...brnObject });
      doc.render();

      const output = doc.getZip().generate({ type: "blob" });

      saveAs(output, `${name}-領據.docx`);
    } catch (error) {
      console.error("產生 Word 檔案失敗:", error);
      alert("發生錯誤，請確認模板檔案是否存在");
    }
  };

  return (
    <button
      onClick={() => {
        generateWord(idx, people[idx].Name);
      }}
    >
      下載{people[idx].Name}
    </button>
  );
};

function handletring(
  nub: number,
  variable: string,
  index: { [key: string]: string },
  vaule: string[]
) {
  for (let i = 0; i < nub; i++) {
    index[`${variable}${i + 1}`] = vaule[i] || "";
  }
}

export default Btn;
