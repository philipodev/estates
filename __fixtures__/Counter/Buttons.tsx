import * as React from "react";
import { FC } from "react";
import { useEstate } from "../../src";
import { CounterEstate } from "./Counter";

interface Props {}

export const Buttons: FC<Props> = () => {
  const { increment, decrement, setCount } = useEstate(CounterEstate);

  return (
    <div>
      <button role="increment" onClick={() => increment()}>
        +
      </button>
      <button role="decrement" onClick={() => decrement()}>
        -
      </button>
      <button role="reset" onClick={() => setCount(0)}>
        reset
      </button>
    </div>
  );
};
