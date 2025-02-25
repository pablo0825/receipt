/* APP.tsx */
import { useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./components/Table";

interface peopleDats {
  ID: string;
  Name: string;
  Unit: string;
  JT: string;
  IN: string;
  BN: string;
  BC: string;
  BRN: string;
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

  const isValidUrl = (url: string) => {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/gm;
    return regex.test(url);
  };

  const handleFetch = () => {
    setError(null);
    if (!isValidUrl(apiUrl)) {
      setError("請輸入有效的 API URL");
      return;
    }
    fetchData(apiUrl);
    setApiUrl("");
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#F3F4F6]">
        <div className="flex flex-col max-w-[90rem] mx-auto">
          {/* input */}
          <div className="flex-none space-x-4 mt-12 px-4">
            <input
              type="text"
              placeholder="請輸入 API URL"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="p-2 rounded border border-gray-300 w-80"
            />
            <button
              onClick={handleFetch}
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition transform hover:scale-105 active:scale-95"
            >
              載入資料
            </button>
          </div>
          {/* error */}
          <div className="">
            {error && <p className="text-red-500">{error}</p>}
          </div>
          {/* tablo */}
          <div className="flex-1 items-center justify-center">
            {loading ? (
              <p className="p-4">載入中...</p>
            ) : (
              <Table people={people} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
