const express = require("express");
const cors = require("cors");
const ytdl = require("@distube/ytdl-core");
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Basic route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// YouTube video info route
app.post("/info", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const info = await ytdl.getInfo(url);
    const formats = info.formats;

    return res.json(formats);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to process video information" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
