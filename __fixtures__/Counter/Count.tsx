import * as React from "react";
import { FC } from "react";
import { useEstate } from "../../src";
import { CounterEstate } from "./Counter";

interface Props {}

export const Count: FC<Props> = () => {
  const {
    state: { count },
  } = useEstate(CounterEstate);

  expect(count).toBe(count);

  return (
    <div>
      count: <span role={"count"}>{count}</span>
    </div>
  );
};
