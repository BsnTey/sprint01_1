"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRoute = void 0;
const express_1 = require("express");
const setting_1 = require("../setting");
const validations_1 = require("../validations");
exports.videosRoute = (0, express_1.Router)({});
const availableResolutionsArray = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"];
exports.videosRoute.get("/", (req, res) => {
    const data = setting_1.database.getAll();
    res.json(data);
});
exports.videosRoute.get("/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.sendStatus(404);
        return;
    }
    const data = setting_1.database.findOne(+id);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    res.json(data);
});
exports.videosRoute.post("/", (req, res) => {
    const checker = new validations_1.ValidationDTO(req.body);
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
    setting_1.database.insert(data);
    res.status(201).json(data);
});
exports.videosRoute.put("/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.sendStatus(404);
        return;
    }
    let data = setting_1.database.findOne(+id);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    const checker = new validations_1.ValidationDTO(req.body);
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
        .isMinMax({
        minAgeRestriction: [1, 18],
    }, true)
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
    setting_1.database.replace(data);
    res.sendStatus(204);
});
exports.videosRoute.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (isNaN(Number(id))) {
        res.sendStatus(404);
        return;
    }
    const data = setting_1.database.findOne(+id);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    setting_1.database.deleteId(+id);
    res.sendStatus(204);
});
