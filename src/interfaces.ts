import { Draft } from "immer";
import React, { PropsWithChildren } from "react";

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
  connect: <
    OriginalProps extends {},
    MappedProps extends Partial<OriginalProps>
  >(
    Component: React.ComponentType<OriginalProps>,
    map: (state: State, actions: EstateActionsCallable<Actions>) => MappedProps
  ) => React.FC<Omit<OriginalProps, keyof MappedProps>>;
}

export interface EstateContext<State, Actions> {
  state: State;
  actions: EstateActionsWithoutState<Actions>;
  dispatch: EstateDispatch;
}

export type EstateDispatch = (action: string, ...args: any[]) => void;

export type EstateActionsWithoutState<Actions> = {
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

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
