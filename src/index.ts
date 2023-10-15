import express from "express";
import { config } from "dotenv";

config();
const app = express();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on por ${port}...`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
