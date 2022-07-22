import * as React from "react";
import { FC } from "react";
import { createEstate } from "../../src";
import { Buttons } from "./Buttons";
import { Count } from "./Count";
import { CounterEstate } from "./Counter";

interface Props {}

export const CounterWithInitialState: FC<Props> = () => {
  return (
    <CounterEstate.Root initialState={{ count: 10 }}>
      <Count />
      <Buttons />
    </CounterEstate.Root>
  );
};
