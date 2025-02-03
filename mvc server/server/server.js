const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 8080;
// for env
require("dotenv").config();

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URL;

// mongoose atlas connection
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async (user, pass, dbName) => {
  const conn = await mongoose.connect(
    //   "mongodb+srv://test:test121212@dev.pucwl.mongodb.net/?retryWrites=true&w=majority",
    url,
    options
  );
  console.log(
    `MongoDB Connected: ${conn.connection.db.databaseName.substring(
      0,
      3
    )}******`
  );
};

connectDB();
// mongoose atlas connection end


// for articles router
const articlesRouter = require("./routes/articles");
app.use("/articles", articlesRouter);
// for articles router end


// for live server
app.listen(port, () => console.log(`server is runing at ${port}`));
