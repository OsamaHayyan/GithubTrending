const express = require("express");
const cors = require("cors");
const gitRepoApi = require("./routes");

const app = express();
app.use(express.json());

app.use(cors());
app.use(gitRepoApi);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  res.status(status).json({ error });
});

app.listen(3000);
