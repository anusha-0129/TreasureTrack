import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const username=process.env.MONGO_DB_USERNAME;
const password=process.env.MONGO_DB_PASSWORD;
const url=process.env.MONGO_DB_URL;
const database=()=>{
mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>console.log("mongodb connected")).catch((err)=>
console.error(err));
};
export default database;