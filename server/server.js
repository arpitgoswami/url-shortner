const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const Urls = require("./models/Urls");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

PORT = process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://syiedelta:TuD_i%40z9wuR9FJm@primary-cluster.lajeaaa.mongodb.net/"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: ", err));

app.post("/api/short", async (req, res) => {
  try {
    const { website } = req.body;

    if (!website) {
      return res.status(400).json({ error: "Website URL is required" });
    }

    let id = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");

    const newUrl = new Urls({ id, website });

    await newUrl.save();

    res.status(201).json({ message: "Saved successfully", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;

    const newUrl = await Urls.findOne({ id: id });

    if (!newUrl) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.redirect(newUrl.website);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
