import express from "express";
import userRouter from "./routes/users";
import notesRouter from "./routes/notes";
import passport from "passport";
import cookieParser from "cookie-parser";
import passportConfig from "./passportConfig";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/users/:id/notes", notesRouter);

app.listen(8000, () => {
  console.log("server is listening on http://localhost:8000/");
});
