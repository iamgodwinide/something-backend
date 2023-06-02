const express = require("express");
const cors = require("cors");
const app = express();

// CONFIGS
require("dotenv").config();
require("./config/db")();
// MIDDLEWARES
app.use(cors());
app.use(express.static('./public'))
app.use(express.json());

const PORT = process.env.PORT || 2022;

// URLS
// app.use("*", require("./routes/down"))
app.use("/api", require("./routes"));

app.listen(PORT, () => console.log(`server started on port ${PORT}`));