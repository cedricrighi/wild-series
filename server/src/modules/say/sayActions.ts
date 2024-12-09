import type { RequestHandler } from "express";

const mainRoot: RequestHandler = (req, res) => {
  console.info(req.query);
  res.send(`Welcome to Wild Series, ${req.query.name} !`);
};

export default { mainRoot };
