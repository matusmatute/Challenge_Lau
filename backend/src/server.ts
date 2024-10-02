import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";

const port = 5000;

mongoose
  .connect(process.env.MONGO_CONNECTION as string)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);


