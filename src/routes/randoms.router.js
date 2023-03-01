import { Router } from "express";
import { fork } from "child_process";
import path from "path";
const __dirname = path.resolve();

const router = Router();

router.get("/", (req, res) => {
  const cant = parseInt(req.query.cant) || 100000000;

  const child = fork(path.join(__dirname, "../randoms.js"));
  child.send(cant);

  const numbers = {};

  child.on("message", (message) => {
    Object.keys(message).forEach((key) => {
      numbers[key] = (numbers[key] || 0) + message[key];
    });
  });

  child.on("exit", () => {
    res.json(numbers);
  });
});

export default router;