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

      /* name */
      page.drawText(`${peopleData.Name}`, {
        x: 85,
        y: 670,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      /* unit */
      const unitLines_unit = wrapText(peopleData.Unit, 11);

      if (unitLines_unit.length < 11) {
        unitLines_unit.forEach((line, index) => {
          page.drawText(line, {
            x: 248,
            y: 678 - index * 15,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        });
      } else {
        unitLines_unit.forEach((line) => {
          page.drawText(line, {
            x: 248,
            y: 670,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        });
      }

      /* 職稱 */
      page.drawText(`${peopleData.JT}`, {
        x: 458,
        y: 670,
        size: 12,
        font: customFont,
        color: rgb(0, 0, 0),
      });

      /* 身分證字號 */
      const unitSpacing_IN = spacingText(peopleData.IN);

      unitSpacing_IN.forEach((line, idx) => {
        page.drawText(line, {
          x: 90 + idx * 28,
          y: 428,
          size: 12,
          font: customFont,
          color: rgb(0, 0, 0),
        });
      });

      /* 銀行名稱 */
      const unitLines_BN = wrapText(peopleData.BN, 5);

      if (unitLines_BN.length < 5) {
        unitLines_BN.forEach((line, index) => {
          page.drawText(line, {
            x: 172,
            y: 360 - index * 15,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        });
      } else {
        unitLines_BN.forEach((line) => {
          page.drawText(line, {
            x: 172, // 固定 X 座標
            y: 352,
            size: 12,
            font: customFont,
            color: rgb(0, 0, 0),
          });
        });
      }

      /* 銀行帳號 */
      const unitSpacing_BRN = spacingText(String(peopleData.BRN));

      unitSpacing_BRN.forEach((line, idx) => {
        page.drawText(line, {
          x: 260 + idx * 20,
          y: 354,
          size: 10,
          font: customFont,
          color: rgb(0, 0, 0),
        });
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

const wrapText = (text: string, maxLength: number) => {
  const cleanedText = text.replace(/[-\s]/g, "");

  const lines = [];
  for (let i = 0; i < cleanedText.length; i += maxLength) {
    lines.push(cleanedText.slice(i, i + maxLength));
  }
  return lines;
};

const spacingText = (text: string) => {
  const cleanedText = text.replace(/[-\s]/g, "");

  const lines = [];
  for (let i = 0; i < cleanedText.length; i++) {
    lines.push(cleanedText.slice(i, i + 1));
  }
  return lines;
};

export default PdfBtn;
