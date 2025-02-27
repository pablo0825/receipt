import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

interface CopyBtnProps {
  text: string;
}

const CopyBtn = ({ text }: CopyBtnProps) => {
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess((pre) => ({ ...pre, [text]: true }));
      alert("複製成功");
      setTimeout(() => {
        setCopySuccess((prev) => ({ ...prev, [text]: false }));
      }, 1300);
    } catch (error) {
      console.error("複製失敗", error);
    }
  };

  return (
    <button
      onClick={() => handleCopy(text)}
      className="p-2 bg-[#F9FAFB] rounded-lg group"
    >
      {copySuccess[text] ? (
        <LuCopyCheck className="text-emerald-500" />
      ) : (
        <LuCopy className="group-hover:text-emerald-500" />
      )}
    </button>
  );
};

export default CopyBtn;
