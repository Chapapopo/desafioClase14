import mongoose from "mongoose";
import {config} from 'dotenv';
config();

const uri = process.env.mongooseURL;

mongoose.connect(uri,/*  { useNewUrlParser: true, useUnifiedTopology: true } */)
  .catch(err => console.error(err));

const db = mongoose.connection;

db.once("open", _ => {
  console.log("Database is connected to:", uri);
});

db.on("error", err => {
  console.error("Database connection error:", err);
});