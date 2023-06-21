import { createItemDB } from "../types";

export class DataBase {
  private db: createItemDB[];

  constructor() {
    this.db = [];
  }

  clearDB(): void {
    this.db = [];
  }

  deleteId(id: number): void {
    this.db = this.db.filter((video) => video.id !== id);
  }

  insert(video: createItemDB): void {
    this.db.push(video);
  }

  findOne(id: number) {
    const data = this.db.filter((video) => video.id === +id);
    return data[0];
  }

  replace(inputVideo: createItemDB) {
    let index = this.db.findIndex((video) => video.id === inputVideo.id);

    if (index !== -1) {
      this.db[index] = inputVideo;
    }
  }

  getAll() {
    return this.db;
  }
}
