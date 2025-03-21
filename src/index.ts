import app from "./app";
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

sequelize
  .sync() 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
