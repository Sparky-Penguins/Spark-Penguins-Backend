require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

// Google OAuth Route
app.get("/hello", async (req, res) => {
  try {
    res.send("hello");
  } catch (error) {
    res.status(500).json({ error: "uh oh something broke :(" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const productsData = fs.readFileSync("products.json", "utf-8");

    const products = JSON.parse(productsData);

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "uh oh something broke :(" });
  }
});

const ADMIN_IDS = ["107691617831155436521", "111491319769959639930", "100340497450246826880"];
app.post("/admin/login", (req, res) => {
  const { adminId } = req.body;
  console.log(adminId);

  if (ADMIN_IDS.includes(adminId)) {
    const messageInvoicesFile = fs.readFileSync("invoices.json", "utf-8");

    const messageInvoices = JSON.parse(messageInvoicesFile);

    res.json(messageInvoices);
  } else {
    res.status(401).json({ error: "Login failed. Invalid ID." });
  }
});

app.post("/admin/orders", (req, res) => {
  const { adminId } = req.body;
  console.log(adminId);
  console.log(ADMIN_IDS.includes(adminId));

  if (ADMIN_IDS.includes(adminId)) {
    const messageInvoicesFile = fs.readFileSync("orders.json", "utf-8");

    const messageInvoices = JSON.parse(messageInvoicesFile);

    res.json(messageInvoices);
  } else {
    res.status(401).json({ error: "Login failed. Invalid ID." });
  }
});

app.post("/user/login", (req, res) => {
  const { adminId } = req.body;

  const messageInvoicesFile = fs.readFileSync("invoices.json", "utf-8");
  console.log(adminId);
  const messageInvoices = JSON.parse(messageInvoicesFile);
  const userMessages = messageInvoices.filter(obj => obj.UserId === adminId);
  console.log(userMessages);
  if (!ADMIN_IDS.includes(adminId) && userMessages.length !== 0) {
    res.json(userMessages);
    
  } else {
    res.status(401).json({ error: "No message are linked with this account" });
  }
});

app.post("/user/orders", (req, res) => {
  console.log("hello")
  const { adminId } = req.body;

  const messageInvoicesFile = fs.readFileSync("orders.json", "utf-8");
  console.log(adminId);
  const messageInvoices = JSON.parse(messageInvoicesFile);
  console.log(messageInvoices)
  const userMessages = messageInvoices.filter(obj => obj.userId === adminId);
  console.log(userMessages);
  if (!ADMIN_IDS.includes(adminId) && userMessages.length !== 0) {
    res.json(userMessages);
    
  } else {
    res.status(401).json({ error: "No message are linked with this account" });
  }
});

app.post("/order", (req, res) => {
  const newEntry = {
    ...req.body,
    timestamp: new Date().toISOString(), // Add timestamp in ISO format
  };

  try {
    // Check if the file already exists
    let invoices = [];
    if (fs.existsSync(ORDER_FILE)) {
      const data = fs.readFileSync(ORDER_FILE, "utf-8");
      invoices = JSON.parse(data);
    }

    // Add new entry to the list
    invoices.push(newEntry);

    // Save the updated data to invoices.json
    fs.writeFileSync(ORDER_FILE, JSON.stringify(invoices, null, 2));

    res.json({
      message:
        "Your request has been received. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Error saving invoice:", error);
    res.status(500).json({ error: "Error saving your data." });
  }
});

const INVOICE_FILE = path.join(__dirname, "invoices.json");
const ORDER_FILE = path.join(__dirname, "orders.json");

// Contact form endpoint to save data
app.post("/contact", (req, res) => {
  const newEntry = {
    ...req.body,
    timestamp: new Date().toISOString(), // Add timestamp in ISO format
  };

  try {
    // Check if the file already exists
    let invoices = [];
    if (fs.existsSync(INVOICE_FILE)) {
      const data = fs.readFileSync(INVOICE_FILE, "utf-8");
      invoices = JSON.parse(data);
    }

    // Add new entry to the list
    invoices.push(newEntry);

    // Save the updated data to invoices.json
    fs.writeFileSync(INVOICE_FILE, JSON.stringify(invoices, null, 2));

    res.json({
      message:
        "Your request has been received. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Error saving invoice:", error);
    res.status(500).json({ error: "Error saving your data." });
  }
});

const PORT = process.env.PORT || 3232;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
