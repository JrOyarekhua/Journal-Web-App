import express from "express";
import userRouter from "./routes/usersRouter.js";
import notesRouter from "./routes/notesRouter.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

import "./passportConfig.js";
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(
  cors({
    origin: "http://localhost:5173", // or your frontend URL
    credentials: true,
  })
);
app.use("/api/users", userRouter);
app.use("/api/notes", notesRouter);

app.listen(8080, () => {
  console.log("server is listening on http://localhost:8080/");
});

export default app;
