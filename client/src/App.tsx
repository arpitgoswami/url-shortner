import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import {
  Link2,
  Copy,
  Check,
  Clock,
  ExternalLink,
  LinkIcon,
  Loader,
  QrCode,
  LockKeyhole,
} from "lucide-react";
import "./index.css";

function App() {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [qrCodeSvg, setQrCodeSvg] = useState<string>("");

  const url_base = "https://stake-mines-1.onrender.com";

  useEffect(() => {
    if (data?.id) {
      generateQrCode();
    }
  }, [data]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url_base}/api/short`, {
        website: url,
      });

      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (data) {
      const shortUrl = `${url_base}/${data.id}`;
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const generateQrCode = async () => {
    if (data) {
      const shortUrl = `${url_base}/${data.id}`;

      try {
        // Using QR Server API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
          shortUrl
        )}`;
        setQrCodeSvg(qrCodeUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-indigo-900 min-h-screen text-white flex flex-col items-center p-6 md:p-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-tl from-blue-400 via-blue-600 to-blue-800 bg-clip-text text-transparent">
              Url Shortner
            </h1>
            <span className="ml-3 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold">
              BETA RELEASE
            </span>
          </div>

          <p className="text-2xl md:text-5xl font-bold text-gray-100 max-w-2xl mx-auto leading-tight">
            Build shorter digital links ..
          </p>
          <p className="text-xs md:text-sm font-medium text-gray-100 max-w-3xl mx-auto leading-tight">
            Use our URL shortener, QR Codes, and Sharing Feature to engage your
            audience and connect them to the right information. Build and share
            everything with our Link Shortener Platform.
          </p>
        </div>

        <div className="mb-8 w-full relative">
          <div
            className={`${
              isFocused ? "animate-gradient-rotate opacity-100" : "opacity-0"
            } absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded blur transition-all duration-300`}
          ></div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-800/40 backdrop-blur-sm rounded overflow-hidden shadow-lg border border-gray-700/50 flex flex-col md:flex-row w-full relative"
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
                className="flex-grow p-4 md:py-6 bg-transparent outline-none text-gray-100 placeholder-gray-400 text-lg w-full"
                required
                disabled={data ? true : false}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-blue-700" : "bg-blue-600 hover:bg-blue-500"
              } cursor-pointer text-white font-semibold px-8 py-4 md:py-0 transition-colors duration-300 flex items-center justify-center`}
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
          <div className="bg-gray-900 backdrop-blur-sm rounded p-6 shadow-lg border border-gray-700/50 transform transition-all duration-300 hover:shadow-blue-900/20 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div className="flex items-center mb-6 md:mb-0">
                <div className="mr-3 h-2 w-2 rounded bg-green-400 animate-pulse"></div>
                <Link2 className="text-blue-400 mr-2" size={16} />
                <a
                  href={`${url_base}/${data.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-lg flex items-center"
                >
                  {url_base}/{data.id}
                  <ExternalLink className="ml-2" size={14} />
                </a>
              </div>

              <div className="text-white text-sm font-medium bg-green-600 px-3 py-1 rounded flex items-center">
                <Check className="mr-1" size={14} />
                Successfully Created
              </div>
            </div>

            <div className="mb-4 p-3 bg-gray-700/30 rounded break-all text-gray-200 border border-gray-600/30">
              {url}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* QR Code Display */}
              <div className="bg-gray-800 p-4 rounded flex flex-col items-center">
                <div className="flex items-center mb-3">
                  <QrCode className="text-blue-400 mr-2" size={20} />
                  <span className="font-medium text-blue-400">QR Code</span>
                </div>
                {qrCodeSvg ? (
                  <img
                    src={qrCodeSvg}
                    alt="QR Code for shortened URL"
                    className="w-full max-w-xs bg-white p-2 rounded"
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <Loader className="animate-spin text-blue-400" size={32} />
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-2 text-center">
                  Scan this QR code to access your shortened URL
                </p>
              </div>

              {/* URL Stats and Copy Button */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-medium text-blue-400 mb-3">
                    URL Details
                  </h3>
                  <div className="bg-gray-800/50 p-3 rounded mb-3">
                    <p className="text-gray-400 text-sm mb-1">Original URL:</p>
                    <p className="text-gray-200 break-all">{url}</p>
                  </div>
                  <div className="bg-gray-800/50 p-3 rounded mb-3">
                    <p className="text-gray-400 text-sm mb-1">Short URL:</p>
                    <p className="text-blue-400 break-all">{`${url_base}/${data.id}`}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-gray-400 text-sm">
                    <span className="inline-flex items-center">
                      <Clock className="mr-1" size={16} />
                      Never Expires
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={`${
                      copied ? "bg-blue-600" : "bg-blue-600 hover:bg-blue-500"
                    } text-white px-4 py-2 rounded transition-colors duration-300 flex items-center`}
                  >
                    {copied ? (
                      <>
                        <Check className="mr-1" size={16} />
                        Copied
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
            </div>
          </div>
        )}

        <div className="mt-12 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center">
            <LockKeyhole className="mr-2" size={14} />
            Secure, fast, and reliable URL shortening service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
