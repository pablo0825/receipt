/* APP.tsx */
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Table from "./Table";

const url =
  "https://script.google.com/macros/s/AKfycbyrQsDNziAEy7ea0dyXaLlSrwcMKr-T1LYm4qXGaSYhwWosJa5h3-ZGvdqEcXlmSOJm/exec";

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
  const [people, setPeople] = useState<peopleDats[]>(() => []);
  const [loading, setLoading] = useState<boolean>(false);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return (
    <>
      <div className="bg-yellow-100">
        {loading ? <p>載入中...</p> : <Table people={people} />}
      </div>
    </>
  );
}

export default App;
