import React, { createContext, FC, PropsWithChildren } from "react";
import produce from "immer";

import type {
  EstateActions,
  EstateCreator,
  EstateContext,
  EstateProviderProps,
  EstateActionsCallable,
  PartialBy,
  Estate,
} from "./interfaces";
import { createCallableActions } from "./helpers/createCallableActions";

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

  /*
  Connect function to connect a component to the context, kinda like in redux. But more type friendly.
  */
  function connect<
    OriginalProps extends {},
    MappedProps extends Partial<OriginalProps>
  >(
    Component: React.ComponentType<OriginalProps>,
    map: (state: State, actions: EstateActionsCallable<Actions>) => MappedProps
  ) {
    /*
      Mark the props passed in "map" as optional, so we can use the component without passing them.
      */
    type NewProps = Omit<OriginalProps, keyof MappedProps>;

    const ConnectedComponent: FC<NewProps> = (props) => {
      const { state, actions, dispatch } = React.useContext(context);

      /*
        Create a new object with the mapped props
        */
      const newProps = {
        ...map(state, createCallableActions(actions, dispatch)),
        ...props,
      };

      /*
        Return a react element with the component and the new props
        */
      return React.createElement<NewProps>(
        Component as React.FunctionComponent<NewProps>,
        newProps
      );
    };

    return ConnectedComponent;
  }

  return {
    Root: Provider,
    context,
    initialState,
    actions,
    connect,
  };
}
