import { FormEvent, useState } from "react";
import axios from "axios";
import "./index.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [url_base, setUrlBase] = useState<string>(
    "https://stake-mines-1.onrender.com"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url_base}/api/short`, {
        website: url,
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const handleCopy = () => {
    if (data) {
      const shortUrl = `${url_base}/${data.id}`;
      navigator.clipboard.writeText(shortUrl);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="container-gradient p-12 w-[100vw] h-[100vh] text-white">
      <div>
        <h1 className="text-gray-500">
          URL SHORTNER
          <span className="bg-blue-500 ml-2 text-white text-sm rounded px-2">
            BETA
          </span>
        </h1>

        <p className="my-12 text-4xl font-medium">
          Shorten your long URLs into brief, shareable links.
        </p>
      </div>

      <div className="mb-12">
        {data?.id && (
          <div className="text-gray-500 bg-black/50 hover:-translate-y-1 duration-200 p-8 rounded-lg space-y-3 text-sm max-w-2xl">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="mr-3 h-2 w-2 rounded-full bg-green-400"></div>
                <p className="font-medium text-blue-300">
                  <a
                    href={`${url_base}/${data.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {url_base}/{data.id}
                  </a>
                </p>
              </div>

              <div>Created Link</div>
            </div>

            <div className="text-white text-lg">{url}</div>

            <div className="flex justify-between items-center">
              <div>Never Expires</div>
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white cursor-pointer p-1 text-sm rounded-lg hover:bg-blue-600 duration-200"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-[#0a0d14] gap-4 max-w-lg box flex justify-between py-5 px-10 element rounded-lg"
        >
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL..."
            className="w-full"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
