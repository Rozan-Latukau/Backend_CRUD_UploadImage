import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import LigaRouter from "./routes/LigaRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"))
app.use(LigaRouter)


app.listen(3000, () => console.log('Server up and running...'))