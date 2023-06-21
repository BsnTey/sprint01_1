import { Router, Request, Response } from "express";
import { database } from "../setting";
import { CreateVideoDto, RequestItemVideoDTO } from "../dto/videos/videos.dto";
import { createItemDB, RequestBody } from "../types";
import { ValidationDTO } from "../validations";

export const videosRoute = Router({});
const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];

videosRoute.get("/", (req: Request, res: Response) => {
  const data = database.getAll();
  res.json(data);
});

videosRoute.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  if (isNaN(Number(id))) {
    res.sendStatus(404);
    return;
  }

  const data = database.findOne(+id);

  if (!data) {
    res.sendStatus(404);
    return;
  }

  res.json(data);
});

videosRoute.post("/", (req: RequestBody<CreateVideoDto>, res: Response) => {
  const checker = new ValidationDTO(req.body);

  const checkedError = checker
    .isNotNullable(["author", "title"])
    .isString(["author", "title"])
    .isMaxLength({
      author: 20,
      title: 40,
    })
    .isFieldsCorrectArray("availableResolutions", availableResolutionsArray)
    .getErrorArray();

  if (checkedError.errorsMessages !== 0) {
    res.status(400).json(checkedError);
    return;
  }

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();
  currentDate.setDate(currentDate.getDate() + 1);
  const nextDay = currentDate.toISOString();
  const availableResolutions = req.body.availableResolutions ? req.body.availableResolutions : ["P144"];

  const data = {
    id: Date.now(),
    title: req.body.title,
    author: req.body.author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: currentDateString,
    publicationDate: nextDay,
    availableResolutions: availableResolutions,
  };

  database.insert(data);
  res.status(201).json(data);
});

videosRoute.put("/:id", (req: RequestBody<RequestItemVideoDTO>, res: Response) => {
  const id: string = req.params.id;

  if (isNaN(Number(id))) {
    res.sendStatus(404);
    return;
  }

  let data = database.findOne(+id);

  if (!data) {
    res.sendStatus(404);
    return;
  }

  const checker = new ValidationDTO(req.body);

  const checkedError = checker
    .isNotNullable(["author", "title"])
    .isString(["author", "title"])
    .isMaxLength({
      author: 20,
      title: 40,
    })
    .isFieldsCorrectArray("availableResolutions", availableResolutionsArray)
    .isBoolean(["canBeDownloaded"])
    .isNumber(["minAgeRestriction"], true)
    .isMinMax(
      {
        minAgeRestriction: [1, 18],
      },
      true
    )
    .getErrorArray();

  if (checkedError.errorsMessages !== 0) {
    res.status(400).json(checkedError);
    return;
  }

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();
  const availableResolutions = req.body.availableResolutions ? req.body.availableResolutions : ["P144"];

  data = {
    id: +id,
    title: req.body.title,
    author: req.body.author,
    availableResolutions: availableResolutions,
    canBeDownloaded: req.body.canBeDownloaded,
    minAgeRestriction: req.body.minAgeRestriction,
    createdAt: req.body.createdAt,
    publicationDate: req.body.publicationDate,
  };

  database.replace(data);

  res.sendStatus(204);
});

videosRoute.delete("/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;

  if (isNaN(Number(id))) {
    res.sendStatus(404);
    return;
  }

  const data = database.findOne(+id);

  if (!data) {
    res.sendStatus(404);
    return;
  }

  database.deleteId(+id);

  res.sendStatus(204);
});
