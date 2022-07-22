import { Draft } from "immer";
import { PropsWithChildren } from "react";

export interface EstateCreator<State, Actions> {
  initialState: State;
  actions: Actions;
}

export interface EstateActions<State> {
  [key: string]: (state: Draft<State>, ...args: any[]) => void;
}

export interface Estate<State, Actions> {
  initialState: State;
  actions: Actions;
  Root: React.FC<EstateProviderProps<State>>;
  context: React.Context<EstateContext<State, Actions>>;
}

export interface EstateContext<State, Actions> {
  state: State;
  actions: EstateActionsWithoutState<Actions>;
  dispatch: EstateDispatch;
}

export type EstateDispatch = (action: string, ...args: any[]) => void;

type EstateActionsWithoutState<Actions> = {
  [key in keyof Actions]: (...args: any[]) => void;
};

export interface EstateProviderProps<State> extends PropsWithChildren {
  initialState?: State;
}

export interface EstateHook<State> {
  state: State;
}

export type EstateActionsCallable<Actions> = {
  [key in keyof Actions]: OmitFirstArg<Actions[key]>;
};

/*
Omit the first argument of a function.
We use this to remove the `state` argument from the actions when used in the hook.

setCount(state, count) becomes setCount(count) in the hook.
*/
type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never;
