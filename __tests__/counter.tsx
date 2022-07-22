import * as React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { Counter } from "../__fixtures__/Counter/Counter";
import { CounterWithInitialState } from "../__fixtures__/Counter/CounterWithInitialState";

describe("Simple Counter", () => {
  it("renders", async () => {
    render(<Counter />);

    await waitFor(() => screen.getByRole("count"));

    expect(screen.getByRole("count")).toHaveTextContent("0");
  });

  it("handles increment", async () => {
    render(<Counter />);
    await waitFor(() => screen.getByRole("count"));
    fireEvent.click(screen.getByRole("increment"));
    expect(screen.getByRole("count")).toHaveTextContent("1");
  });

  it("handles decrement", async () => {
    render(<Counter />);
    await waitFor(() => screen.getByRole("count"));
    fireEvent.click(screen.getByRole("decrement"));
    expect(screen.getByRole("count")).toHaveTextContent("-1");
  });

  it("handles reset", async () => {
    render(<Counter />);
    await waitFor(() => screen.getByRole("count"));
    fireEvent.click(screen.getByRole("increment"));
    expect(screen.getByRole("count")).toHaveTextContent("1");
    fireEvent.click(screen.getByRole("reset"));
    expect(screen.getByRole("count")).toHaveTextContent("0");
  });

  it("respects `initialState` on `Root` element", async () => {
    render(<CounterWithInitialState />);
    await waitFor(() => screen.getByRole("count"));
    fireEvent.click(screen.getByRole("increment"));
    expect(screen.getByRole("count")).toHaveTextContent("11");
    fireEvent.click(screen.getByRole("decrement"));
    expect(screen.getByRole("count")).toHaveTextContent("10");
  });

  it("to only render once on each state change", async () => {
    render(<Counter />);
    await waitFor(() => screen.getByRole("count"));
    fireEvent.click(screen.getByRole("increment"));

    expect.assertions(2);
  });
});
