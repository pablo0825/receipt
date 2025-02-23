import React from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import fontkit from "@pdf-lib/fontkit";

interface PdfBtnDats {
  ID: string;
  Name: string;
  Unit: string;
  JT: string;
  IN: string;
  BN: string;
  BC: string;
  BRN: string;
}

interface PdfBtnPerson {
  idx: number;
  people: PdfBtnDats[];
}

const PdfBtn = ({ idx, people }: PdfBtnPerson) => {
  const generatePDF = async (id: number, name: string) => {
    if (people.length === 0) {
      alert("請先獲取API資料");
      return;
    }

    try {
      const response = await fetch("/template.pdf");
      if (!response.ok) throw new Error("無法載入 PDF 模板");

      const templateArrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateArrayBuffer);

      // 註冊 fontkit
      pdfDoc.registerFontkit(fontkit);

      // 讀取支援中文的字型
      const fontResponse = await fetch("/fonts/NotoSansCJK-Regular.ttf");
      if (!fontResponse.ok) throw new Error("無法載入中文字型");

      const fontArrayBuffer = await fontResponse.arrayBuffer();
      const customFont = await pdfDoc.embedFont(fontArrayBuffer);

      // 取得第一頁
      const page = pdfDoc.getPages()[0];

      const peopleData = people[id];

      page.drawText(`${peopleData.Name}`, {
        x: 80,
        y: 680,
        size: 14,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      page.drawText(`${peopleData.Unit}`, {
        x: 230,
        y: 670,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      // 下載 PDF
      saveAs(
        new Blob([pdfBytes], { type: "application/pdf" }),
        `${name}-領據.pdf`
      );
    } catch (error) {
      console.error("產生 PDF 檔案失敗:", error);
      alert("發生錯誤，請確認模板檔案是否存在");
    }
  };
  return (
    <button
      onClick={() => generatePDF(idx, people[idx].Name)}
      className="py-1 px-3 bg-fuchsia-300 rounded-full text-white hover:bg-fuchsia-400 transition transform hover:scale-105 active:scale-95"
    >
      PDF
    </button>
  );
};

export default PdfBtn;
