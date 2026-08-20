import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App routing", () => {
  it("redirects a retired dashboard route to the portfolio demo", async () => {
    window.history.pushState({}, "", "/dashboard");

    render(<App />);

    expect(
      await screen.findByRole("heading", {
        name: "Find a local care option and start a conversation.",
      })
    ).toBeInTheDocument();

    expect(window.location.pathname).toBe("/demo");
  });
});