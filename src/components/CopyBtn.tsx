import { useState } from "react";
import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";

interface CopyBtnProps {
  text: string;
  botCenter: () => void;
}

const CopyBtn = ({ text, botCenter }: CopyBtnProps) => {
  const [copySuccess, setCopySuccess] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess((pre) => ({ ...pre, [text]: true }));
      setTimeout(() => {
        setCopySuccess((prev) => ({ ...prev, [text]: false }));
      }, 1500);
    } catch (error) {
      console.error("複製失敗", error);
    }
  };

  return (
    <button
      onClick={() => {
        handleCopy(text);
        botCenter();
      }}
      className="p-2 hover:bg-[#F9FAFB] rounded-lg group"
    >
      {copySuccess[text] ? (
        <LuCopyCheck className="text-emerald-500" />
      ) : (
        <LuCopy className=" group-hover:text-emerald-500" />
      )}
    </button>
  );
};

export default CopyBtn;
