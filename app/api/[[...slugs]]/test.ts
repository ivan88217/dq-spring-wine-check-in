import Elysia from "elysia";

export const testController = new Elysia().get("/test", ({ query }) => query);
