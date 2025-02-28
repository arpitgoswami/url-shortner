import { FormEvent, useState } from "react";
import axios from "axios";
//import toast, { Toaster } from "react-hot-toast";
import {
  Link2,
  Copy,
  Check,
  Clock,
  ExternalLink,
  LinkIcon,
  Loader,
} from "lucide-react";
import "./index.css";

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const url_base = "https://stake-mines-1.onrender.com";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url_base}/api/short`, {
        website: url,
      });

      setData(response.data);
      // toast.success("URL shortened successfully!");
    } catch (error) {
      console.error("Error:", error);
      //toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (data) {
      const shortUrl = `${url_base}/${data.id}`;
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      // toast.success("URL copied to clipboard!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 min-h-screen text-white flex flex-col items-center p-6 md:p-12">
      {/* <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid rgba(59, 130, 246, 0.5)",
            },
            iconTheme: {
              primary: "#38bdf8",
              secondary: "#1e293b",
            },
          },
          error: {
            style: {
              background: "#1e293b",
              color: "#fff",
              border: "1px solid rgba(239, 68, 68, 0.5)",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#1e293b",
            },
          },
        }}
      /> */}

      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-6">
            <LinkIcon className="text-blue-400 mr-2" size={28} />
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500">
              URL SHORTENER
            </h1>
            <span className="ml-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
              BETA
            </span>
          </div>

          <p className="text-2xl md:text-4xl font-medium text-gray-100 max-w-2xl mx-auto leading-tight">
            Transform your long URLs into brief, shareable links.
          </p>
        </div>

        <div className="mb-8 w-full relative">
          <div
            className={`${
              isFocused ? "animate-gradient-rotate opacity-100" : "opacity-0"
            } absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-xl blur transition-all duration-300`}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-gray-700/50 flex flex-col md:flex-row w-full relative"
          >
            <div className="flex items-center flex-grow bg-gray-900">
              <Link2 className="text-gray-400 ml-4" size={20} />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter the URL you want to shorten..."
                className="flex-grow p-4 md:p-6 bg-transparent outline-none text-gray-100 placeholder-gray-400 text-lg w-full"
                required
                disabled={data ? true : false}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-500"
              } text-white font-semibold px-8 py-4 md:py-0 transition-colors duration-300 flex items-center justify-center`}
            >
              {loading ? (
                <span className="flex items-center">
                  <Loader className="animate-spin mr-2" size={20} />
                  Processing
                </span>
              ) : (
                <>
                  <LinkIcon className="mr-2" size={20} />
                  Shorten URL
                </>
              )}
            </button>
          </form>
        </div>

        {data?.id && (
          <div className="bg-gray-900 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-700/50 transform transition-all duration-300 hover:shadow-blue-900/20 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="flex items-center mb-2 md:mb-0">
                <div className="mr-3 h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <Link2 className="text-blue-400 mr-2" size={16} />
                <a
                  href={`${url_base}/${data.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 text-lg flex items-center"
                >
                  {url_base}/{data.id}
                  <ExternalLink className="ml-2" size={14} />
                </a>
              </div>

              <div className="text-gray-300 text-sm font-medium bg-green-600/20 px-3 py-1 rounded-full flex items-center">
                <Check className="mr-1" size={14} />
                Successfully Created
              </div>
            </div>

            <div className="mb-4 p-3 bg-gray-700/30 rounded-lg break-all text-gray-200 border border-gray-600/30">
              {url}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="text-gray-400 text-sm mb-2 md:mb-0">
                <span className="inline-flex items-center">
                  <Clock className="mr-1" size={16} />
                  Never Expires
                </span>
              </div>
              <button
                onClick={handleCopy}
                className={`${
                  copied ? "bg-green-600" : "bg-blue-600 hover:bg-blue-500"
                } text-white px-4 py-2 rounded-lg transition-colors duration-300 flex items-center`}
              >
                {copied ? (
                  <>
                    <Check className="mr-1" size={16} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-1" size={16} />
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center">
            <LinkIcon className="mr-2" size={14} />
            Secure, fast, and reliable URL shortening service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
