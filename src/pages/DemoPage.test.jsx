import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import DemoPage from "./DemoPage";

describe("DemoPage", () => {
  it("shows the Pet Owner view by default", () => {
    render(
      <MemoryRouter>
        <DemoPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "Pet Owner" })
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("switches to the Service Provider view", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DemoPage />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", { name: "Service Provider" })
    );

    expect(
      screen.getByRole("button", { name: "Service Provider" })
    ).toHaveAttribute("aria-pressed", "true");

    expect(
      screen.getByRole("heading", { name: "Your fictional profile" })
    ).toBeInTheDocument();
  });
});
it("starts in the Service Provider view when role=provider is in the URL", () => {
  render(
    <MemoryRouter initialEntries={["/demo?role=provider"]}>
      <DemoPage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("button", { name: "Service Provider" })
  ).toHaveAttribute("aria-pressed", "true");

  expect(
    screen.getByRole("heading", { name: "Your fictional profile" })
  ).toBeInTheDocument();
});