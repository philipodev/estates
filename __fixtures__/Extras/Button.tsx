import React, { FC, PropsWithChildren } from "react";

interface Props {
  onClick: () => void;
  testId: string;
  text: string;
}

export const Button: FC<Props> = ({ onClick, testId, text }) => {
  return (
    <button onClick={onClick} data-testid={testId}>
      {text}
    </button>
  );
};
