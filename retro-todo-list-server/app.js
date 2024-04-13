const express = require("express");
const cors = require("cors")
const cookieParser = require("cookie-parser")
require('dotenv').config()
const app = express();
app.listen(process.env.PORT);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser())

const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");

app.use("/users", userRouter);
app.use("/lists", listRouter);
