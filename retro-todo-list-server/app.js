const express = require("express");
const cors = require("cors")

const app = express();
app.listen(1234);
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const userRouter = require("./routes/users");
const listRouter = require("./routes/lists");
app.use("/users", userRouter);
app.use("/lists", listRouter);
