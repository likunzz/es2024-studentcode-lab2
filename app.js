// app.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB model
const Item = mongoose.model("students", new mongoose.Schema({
    name: String,
    number: Number
}, { versionKey: false }));

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// CRUD routes
app.get("/api/students", async (req, res) => {
    const items = await Item.find();
    res.send(items);
});

app.post("/api/students", async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.send(newItem);
});

app.put("/api/students/:id", async (req, res) => {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updatedItem);
});

app.delete("/api/students/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: "Item deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});