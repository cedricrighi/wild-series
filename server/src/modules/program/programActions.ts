import type { RequestHandler } from "express";
import joi from "joi";
import programRepository from "./programRepository";

const browse: RequestHandler = async (req, res) => {
  const programsFromDB = await programRepository.readAll();

  res.json(programsFromDB);
};

const read: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const programFromDB = await programRepository.read(Number.parseInt(id));

  res.json(programFromDB);
};

const edit: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const program = req.body;

  const result = await programRepository.update(Number.parseInt(id), program);

  res.json(result);
};

const add: RequestHandler = async (req, res) => {
  const program = req.body;

  const result = await programRepository.create(program);

  res.json(result);
};

const destroy: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const result = await programRepository.delete(Number.parseInt(id));

  res.json(result);
};

const validate: RequestHandler = (req, res, next) => {
  const programSchema = joi.object({
    title: joi.string().required(),
    synopsis: joi.string().required(),
    poster: joi.string().required(),
    country: joi.string().required(),
    year: joi.number().required(),
    category_id: joi.number().required(),
  });

  const { error } = programSchema.validate(req.body, { abortEarly: false });

  if (!error) {
    next();
  } else {
    console.info(error);

    res.status(400).json({ validationErrors: error });
  }
};

export default { browse, read, add, edit, destroy, validate };
