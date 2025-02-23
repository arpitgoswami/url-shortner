import { FormEvent, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LcKN-AqAAAAAAtVON7EVGjv-oz1yKcYf6QuGLQJ";

function App() {
  const [url, setUrl] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [data, setData] = useState<{ id: string } | null>(null);
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!captchaValue) {
      alert("Please solve the CAPTCHA before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "https://stake-mines-1.onrender.com/api/short",
        { website: url, captcha: captchaValue }
      );

      setData(response.data);
      setLoading(false);
      setCopySuccess(""); // Reset copy message
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    }
  };

  const handleCopy = () => {
    if (data) {
      const shortUrl = `https://stake-mines-1.onrender.com/${data.id}`;
      navigator.clipboard.writeText(shortUrl);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000); // Reset message after 2s
    }
  };

  return (
    <div>
      <h1>Urlify</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL..."
          required
        />
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={(value) => {
            console.log("CAPTCHA Value:", value); // Debugging
            setCaptchaValue(value);
          }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading .." : "Submit"}
        </button>
      </form>

      {data && (
        <div>
          <p>
            Shortened URL:{" "}
            <a
              href={`https://stake-mines-1.onrender.com/${data.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              https://stake-mines-1.onrender.com/{data.id}
            </a>
          </p>
          <button onClick={handleCopy}>Copy URL</button>
          {copySuccess && <span> {copySuccess}</span>}
        </div>
      )}
    </div>
  );
}

export default App;
