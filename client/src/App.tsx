import { FormEvent, useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<any>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/short", { website: url })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <>
      <div>
        <h1>Urlify</h1>
        <h3>{url}</h3>
        <form onSubmit={handleSubmit}>
          {" "}
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
            required
          />
          <button type="submit">Submit</button>
        </form>
        {data && <p>Shortened URL: {data.id}</p>}
      </div>
    </>
  );
}

export default App;
