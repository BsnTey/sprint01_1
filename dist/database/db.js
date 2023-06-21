"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBase = void 0;
class DataBase {
    constructor() {
        this.db = [];
    }
    clearDB() {
        this.db = [];
    }
    deleteId(id) {
        this.db = this.db.filter((video) => video.id !== id);
    }
    insert(video) {
        this.db.push(video);
    }
    findOne(id) {
        const data = this.db.filter((video) => video.id === +id);
        return data[0];
    }
    replace(inputVideo) {
        let index = this.db.findIndex((video) => video.id === inputVideo.id);
        if (index !== -1) {
            this.db[index] = inputVideo;
        }
    }
    getAll() {
        return this.db;
    }
}
exports.DataBase = DataBase;
