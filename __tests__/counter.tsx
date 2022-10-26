import * as React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { Counter } from "../__fixtures__/Counter/Counter";
import { CounterWithInitialState } from "../__fixtures__/Counter/CounterWithInitialState";
import { createEstate } from "../src";
import { CountText } from "../__fixtures__/Extras/CountText";
import { Button } from "../__fixtures__/Extras/Button";

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

  it("works with connect()", async () => {
    const CounterEstate = createEstate({
      initialState: {
        count: 3,
      },
      actions: {
        increment: (state, by: number = 1) => {
          state.count += by;
        },
        decrement: (state, by: number = 1) => {
          state.count -= by;
        },
        setCount: (state, count: number) => {
          state.count = count;
        },
      },
    });

    const CountTextConnected = CounterEstate.connect(
      CountText,
      ({ count }) => ({
        count,
      })
    );

    const IncreaseButton = CounterEstate.connect(
      Button,
      (_, { increment }) => ({
        onClick: () => increment(),
        testId: "add",
      })
    );

    render(
      <CounterEstate.Root>
        <CountTextConnected />

        <IncreaseButton text="test" />
      </CounterEstate.Root>
    );

    expect(screen.getAllByRole("count")[0]).toHaveTextContent("3");

    expect(screen.getByTestId("add")).toHaveTextContent("test");

    act(() => {
      fireEvent.click(screen.getByTestId("add"));
    });

    expect(screen.getAllByRole("count")[0]).toHaveTextContent("4");
  });
});
