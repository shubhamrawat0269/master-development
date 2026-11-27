import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("Home ROUTE");
});

app.get("/login", (req, res) => {
  res.send("Login ROUTE");
});

app.post("/user-details", (req, res) => {
  res.send("Fetch User Details");
});

app.put("/update-user", (req, res) => {
  res.send("Update User Details");
});

app.delete("/delete-user", (req, res) => {
  res.send("Delete User Details");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
