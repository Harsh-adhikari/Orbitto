import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js"
import { connectDB } from "./lib/db.js";

import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

// app.use(express.json());// This will help to extract json data out of req
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(cookieParser()); // This will help to parse cookies from the req
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies and Authorization header
  })
);

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  })
}

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
