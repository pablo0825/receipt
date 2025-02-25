import React, { useState } from "react";

const fieldLabels = ["Name", "Unit", "JT", "IN", "BN", "BC", "BRN"];

const PDFPositionEditor = () => {
  // 設定初始座標
  const [positions, setPositions] = useState({
    Name: { x: 80, y: 660 },
    Unit: { x: 230, y: 670 },
    JT: { x: 100, y: 640 },
    IN: { x: 150, y: 620 },
    BN: { x: 200, y: 600 },
    BC: { x: 250, y: 580 },
    BRN: { x: 300, y: 560 },
  });

  const [dragging, setDragging] = useState(null);

  // 處理拖曳開始
  const handleMouseDown = (field) => (e) => {
    setDragging({ field, offsetX: e.clientX, offsetY: e.clientY });
  };

  // 處理拖曳移動
  const handleMouseMove = (e) => {
    if (dragging) {
      const deltaX = e.clientX - dragging.offsetX;
      const deltaY = e.clientY - dragging.offsetY;

      setPositions((prev) => ({
        ...prev,
        [dragging.field]: {
          x: prev[dragging.field].x + deltaX,
          y: prev[dragging.field].y - deltaY,
        },
      }));

      setDragging({
        field: dragging.field,
        offsetX: e.clientX,
        offsetY: e.clientY,
      });
    }
  };

  // 處理拖曳結束
  const handleMouseUp = () => {
    setDragging(null);
  };

  return (
    <div
      className="relative w-[595px] h-[842px] border mx-auto mt-5"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        backgroundImage: "url('/template-preview.png')", // 這裡放置 PDF 模板的圖片
        backgroundSize: "cover",
      }}
    >
      {fieldLabels.map((field) => (
        <div
          key={field}
          onMouseDown={handleMouseDown(field)}
          className="absolute bg-fuchsia-300 text-white px-2 py-1 rounded cursor-move"
          style={{
            left: positions[field].x,
            top: 842 - positions[field].y, // 將 PDF 的 y 軸轉換為瀏覽器座標
          }}
        >
          {field}
        </div>
      ))}

      {/* 顯示座標資料 */}
      <div className="mt-4 p-2 bg-white rounded shadow">
        <h3 className="font-bold">座標設定</h3>
        <pre className="text-sm">{JSON.stringify(positions, null, 2)}</pre>
      </div>
    </div>
  );
};

export default PDFPositionEditor;
