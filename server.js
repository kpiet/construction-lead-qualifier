const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

app.get("/api/search", async (req, res) => {
  const { query, location } = req.query;

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/textsearch/json",
      {
        params: {
          query: `${query} in ${location}`,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );

    res.json(response.data.results);
  } catch (err) {
    res.status(500).json({ error: "API error" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});