import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("Rotas", () => {
  it.each(["/", "/mural", "/desafio-pr"])("encontra uma página para %s", (path) => {
    const router = createRouter({ routeTree });
    const matches = router.matchRoutes(path);
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
