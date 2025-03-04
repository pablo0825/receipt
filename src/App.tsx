/* APP.tsx */
import { useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";
import APIInput from "./components/APIInput";
import { ToastContainer, toast } from "react-toastify";

interface peopleDats {
  ID: string;
  Name: string;
  Unit: string;
  JT: string;
  IN: string;
  BN: string;
  BC: string;
  BRN: string;
  Email: string;
}

function App() {
  const [apiUrl, setApiUrl] = useState<string>(""); // 儲存輸入的 API URL
  const [people, setPeople] = useState<peopleDats[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // 錯誤提示

  const fetchData = async (url: string) => {
    setLoading(true);
    try {
      const response = await axios.get(url);

      if (
        !Array.isArray(response.data) ||
        response.data.length === 0 ||
        !response.data[0]?.data
      ) {
        console.error("資料格式錯誤:", response.data);
        setPeople([]);
        return;
      }

      setPeople(response.data[0].data);
    } catch (error) {
      console.error("載入資料失敗:", error);
      setError("載入資料失敗，請檢查 API URL。");
    } finally {
      setLoading(false);
    }
  };

  const botCenter = () => {
    toast.success("複製成功 🎉", {
      position: "bottom-center",
    });
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#F3F4F6]">
        <div className="flex flex-col max-w-[90rem] mx-auto">
          {/* input */}
          <div className="flex-none mt-12 px-4">
            <APIInput
              setError={setError}
              fetchData={fetchData}
              setApiUrl={setApiUrl}
              apiUrl={apiUrl}
            />
          </div>
          {/* error */}
          <div className="">
            {error && <p className="px-4 pt-2 pb-2 text-red-500">{error}</p>}
          </div>
          {/* tablo */}
          <div className="flex-1 items-center justify-center">
            {loading ? (
              <p className="p-4">載入中...</p>
            ) : (
              <Table people={people} botCenter={botCenter} />
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
