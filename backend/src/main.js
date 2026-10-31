import express from "express";
import AuthRoute from "./route/auth.route.js";
import dbConnect from "./config/db.config.js";
import MenuRoute from "./route/menu.route.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import OrderRouter from "./route/order.route.js";
const app = express();
const PORT = 3000;
app.use(cors({
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 ,
     credentials: true,
}))
app.use(cookieParser())
app.use(express.json());

app.use("/auth", AuthRoute);
app.use("/menu", MenuRoute);
app.use('/order',OrderRouter)
app.get("/", async (request, response) => {
  response.json({
    success: true,
    message: "Server is Running ",
  });
});

app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is Running at localhost:${PORT}`);
});
