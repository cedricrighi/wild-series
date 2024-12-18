import categoryRepository from "./categoryRepository";

// Some data to make the trick

import type { RequestHandler } from "express";

const categories = [
  {
    id: 1,
    name: "Comédie",
  },
  {
    id: 2,
    name: "Science-Fiction",
  },
];

// Declare the actions

const browse: RequestHandler = async (req, res) => {
  const categoriesFromDB = await categoryRepository.readAll();

  res.json(categoriesFromDB);
};

const read: RequestHandler = (req, res) => {
  const parsedId = Number.parseInt(req.params.id);

  const category = categories.find((c) => c.id === parsedId);

  if (category != null) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

const edit: RequestHandler = (req, res) => {
  const id = Number.parseInt(req.params.id);
  const { category } = req.body;

  const result = categoryRepository.update(id, category);

  res.json(result);
};

const add: RequestHandler = (req, res) => {
  const category = req.body;

  const result = categoryRepository.create(category);

  res.json(result);
};

const destroy: RequestHandler = (req, res) => {
  const id = Number.parseInt(req.params.id);

  const result = categoryRepository.delete(id);

  res.json(result);
};

const validate: RequestHandler = (req, res, next) => {
  type ValidationError = {
    field: string;
    message: string;
  };

  const errors: ValidationError[] = [];

  const { name } = req.body;

  // put your validation rules here

  if (errors.length === 0) {
    next();
  } else {
    res.status(400).json({ validationErrors: errors });
  }
};

// Export them to import them somewhere else

export default { browse, read, edit, add, destroy, validate };
