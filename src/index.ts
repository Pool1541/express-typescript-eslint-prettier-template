/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import express from "express";
import { initLogging, HttpLogger } from "./lib/logger";
import { requestContextMiddleware } from "./middlewares/persist-request";

const app = express();
const port = process.env.PORT ?? "9001";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestContextMiddleware);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello world",
  });

  HttpLogger.success("Success with status 200");
});

app.post("/create-user", (req, res) => {
  try {
    const { name, lastname, imageUrl, role } = req.body;

    if (!name) throw new Error("Name is required", { cause: "name" });

    const newUser = {
      createdAt: new Date().getTime(),
      uuid: crypto.randomUUID(),
      name,
      lastname,
      imageUrl,
      role,
    };

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });

    HttpLogger.success("User created", newUser.uuid);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: "Server error",
      });
      HttpLogger.error(error.message);
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

(async function () {
  await initLogging();
})();
