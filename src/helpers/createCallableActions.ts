import { EstateActionsCallable, EstateDispatch } from "../interfaces";

/*
Function that takes the actions in the context and turns them into callable actions 
that will trigger the dispatch function with the arguments index 1 and onwards.
*/
export function createCallableActions<Actions>(
  actions: any,
  dispatch: EstateDispatch
) {
  return {
    ...(Object.keys(actions) as (keyof Actions)[]).reduce(
      (acc, key) => ({
        ...acc,
        [key]: (...args: any[]) => dispatch(key as string, ...args),
      }),
      {}
    ),
  } as EstateActionsCallable<Actions>;
}
