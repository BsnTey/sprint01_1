"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const videosRoute_1 = require("./routes/videosRoute");
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = require("./database/db");
exports.app = (0, express_1.default)();
exports.database = new db_1.DataBase();
exports.app.use(body_parser_1.default.json());
exports.app.use("/videos", videosRoute_1.videosRoute);
exports.app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>");
});
exports.app.delete("/all-data", (req, res) => {
    exports.database.clearDB();
    res.sendStatus(204);
});
