import * as React from "react";
import { FC } from "react";
import { createEstate } from "../../src";
import { Buttons } from "./Buttons";
import { Count } from "./Count";

interface Props {}

export const CounterEstate = createEstate({
  initialState: {
    count: 0,
  },
  actions: {
    increment: (state, by = 1) => {
      state.count += by;
    },
    decrement: (state, by = 1) => {
      state.count -= by;
    },
    setCount: (state, count: number) => {
      state.count = count;
    },
  },
});

export const Counter: FC<Props> = () => {
  return (
    <CounterEstate.Root>
      <Count />
      <Buttons />
    </CounterEstate.Root>
  );
};
