import express from "express";
import userRouter from "./routes/usersRouter.js";
import notesRouter from "./routes/notesRouter.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import "./passportConfig.js";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/users", userRouter);
app.use("/api/users/:id/notes", notesRouter);

app.listen(8000, () => {
  console.log("server is listening on http://localhost:8000/");
});
