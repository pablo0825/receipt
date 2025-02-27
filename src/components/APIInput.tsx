interface APIInputPerson {
  setError: (error: string | null) => void;
  fetchData: (url: string) => void;
  setApiUrl: (url: string) => void;
  apiUrl: string;
}

const APIInput = ({
  setError,
  fetchData,
  setApiUrl,
  apiUrl,
}: APIInputPerson) => {
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
      <input
        type="text"
        placeholder="請輸入 API URL"
        value={apiUrl}
        onChange={(e) => setApiUrl(e.target.value)}
        className="p-2 rounded-l-lg border border-gray-300 w-80"
      />
      <button
        onClick={handleFetch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 "
      >
        載入資料
      </button>
    </>
  );
};

export default APIInput;
