const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();

// URL del webhook N8N
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://n8nbis.onrender.com/webhook/registrazione"; // <-- è il tuo URL

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/api/registrazione", async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.json({ status: "error" });
    }

    const response = await axios.post(N8N_WEBHOOK_URL, { email });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.json({ status: "error" });
  }
});

app.listen(PORT, () => {
  console.log("Server avviato su porta " + PORT);
});
