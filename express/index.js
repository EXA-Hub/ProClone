const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("probot.io"));
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "probot.io", "ProBot - Bot for Discord.html")
  );
});

app.get("/api/stats", (req, res) => {
  res.json({
    guilds: 9500000000000000,
    members: 738800000,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
