import { edenTreaty } from "@elysiajs/eden";
import type { API } from "@/app/api/[[...slugs]]/route";

export const edenApi = edenTreaty<API>(
  typeof window === "undefined"
    ? `http://localhost:${process.env.PORT ?? 3000}`
    : window.location.origin
);
