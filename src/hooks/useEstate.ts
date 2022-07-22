import React from "react";
import { createCallableActions } from "../helpers/createCallableActions";
import {
  Estate,
  EstateActions,
  EstateActionsCallable,
  EstateHook,
} from "../interfaces";

export function useEstate<State, Actions extends EstateActions<State>>(
  estate: Estate<State, Actions>
): EstateHook<State> & EstateActionsCallable<Actions> {
  const {
    state: _state,
    actions: _actions,
    dispatch,
  } = React.useContext(estate.context);

  const actions = React.useMemo(
    () => createCallableActions<Actions>(_actions, dispatch),
    [_actions]
  );

  const state = React.useMemo(() => _state, [_state]);

  return { state, ...actions };
}
