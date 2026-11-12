import { createFileRoute } from "@tanstack/react-router";
import { Onboarding } from "@/components/onboarding";
import { pageHead } from "@/lib/community";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Seu primeiro commit. Seu próximo café.",
      "Entre para uma comunidade universitária de devs iniciantes. Um projeto real, aprendizado em equipe e seu primeiro pull request.",
    ),
  component: Onboarding,
});
