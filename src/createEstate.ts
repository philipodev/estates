import React, { createContext, FC, PropsWithChildren } from "react";
import produce from "immer";

import type {
  EstateActions,
  EstateCreator,
  Estate,
  EstateContext,
  EstateProviderProps,
} from "./interfaces";

/*
Function to create a new Estate (Context)
*/
export function createEstate<State, Actions extends EstateActions<State>>(
  options: EstateCreator<State, Actions>
): Estate<State, Actions> {
  const { initialState, actions } = options;

  /*
   * Create the react context
   */
  const context = createContext<EstateContext<State, Actions>>(null as any);

  /*
  Define the Provider component. This component will be used to wrap the
  component that will be the root of the Context (the Estate)
  */
  const Provider: FC<PropsWithChildren<EstateProviderProps<State>>> = ({
    children,
    initialState: initialStateProp,
  }) => {
    const [state, setState] = React.useState(initialStateProp ?? initialState);

    /*
    Create a Dispatch function that will be used to update the state
    */
    const dispatch = (action: keyof Actions, payload: any) => {
      const reducer = actions[action];
      if (reducer) {
        setState((state) => {
          /*
          use immer to produce a new immutable state
          */
          return produce(state, (draft) => {
            reducer(draft, payload);
          });
        });
      }
    };

    /*
    Return a react element with the provider and its values, state and dispatch function.
    */
    return React.createElement(
      context.Provider,
      { value: { state, actions, dispatch } },
      children
    );
  };

  return {
    Root: Provider,
    context,
    initialState,
    actions,
  };
}
