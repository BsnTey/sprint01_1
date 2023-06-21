import { createItemDB } from "../../types";

export type CreateVideoDto = {
  title: string;
  author: string;
  availableResolutions?: string[];
};

type createItemDBOmitId = Omit<createItemDB, "id">;
export type RequestItemVideoDTO = createItemDBOmitId & { id: string };
