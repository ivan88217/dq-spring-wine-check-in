import { Elysia, t } from "elysia";
import { testController } from "./test";

const app = new Elysia({ prefix: "/api" }).use(testController)


export const GET = app.handle;
export const POST = app.handle;
export type API = typeof app;
