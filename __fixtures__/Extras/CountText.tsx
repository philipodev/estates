import React, { FC, PropsWithChildren } from "react";

interface Props {
  count: number;
}

export const CountText: FC<PropsWithChildren<Props>> = ({ count }) => {
  return (
    <div>
      count is
      <i role="count">{count}</i>
    </div>
  );
};
