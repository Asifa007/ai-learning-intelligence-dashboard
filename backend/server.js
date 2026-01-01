const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./topics.json";

const readData = () =>
  JSON.parse(fs.readFileSync(FILE, "utf-8"));

const writeData = (data) =>
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

// CREATE
app.post("/topics", (req, res) => {
  const data = readData();
  const newItem = {
    id: Date.now(),
    topic: req.body.topic,
    status: req.body.status
  };
  data.push(newItem);
  writeData(data);
  res.json(newItem);
});

// READ
app.get("/topics", (req, res) => {
  res.json(readData());
});

// UPDATE
app.put("/topics/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex(
    item => item.id == req.params.id
  );
  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

// DELETE
app.delete("/topics/:id", (req, res) => {
  let data = readData();
  data = data.filter(item => item.id != req.params.id);
  writeData(data);
  res.json({ message: "Deleted" });
});

app.listen(5000, () =>
  console.log("Backend running on port 5000")
);
