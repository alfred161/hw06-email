import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config();
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });

    console.log("Database connect successful");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1);
  });
