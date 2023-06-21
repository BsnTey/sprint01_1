import { Request, Response } from "express";

export type RequestBody<T> = Request<{ id: string }, {}, T>;

export interface createItemDB {
  id: number;
  title: string;
  author: string;
  canBeDownloaded?: boolean;
  minAgeRestriction?: number | null;
  createdAt?: string;
  publicationDate?: string;
  availableResolutions?: string[];
}
