# estates

![estates size](https://img.shields.io/badge/size-0.5kb-blue) [![Build and Test](https://github.com/philipodev/estates/actions/workflows/build-test.yml/badge.svg)](https://github.com/philipodev/estates/actions/workflows/build-test.yml) [![npm](https://img.shields.io/npm/v/estates)](https://www.npmjs.com/package/estates)

---

- TINY (0.5kb) 🔥
- Written in Typescript <img width="15" alt="typescript" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg"/>
- Typings for autocomplete automatically shipped.
- Internally uses `React.Context` and `useState`
- SSR support

## Installation

```bash
yarn add estates
```

```bash
npm install estates --save
```

## How does it work?

Essentially it's a modifyable react context. It uses react's context API and states to store and edit the data.
It uses `immer` (shipped with redux-toolkit) to make sure that the data is immutable.

## What it is

- A tiny state machine for component trees.
- Editable react contexts

## What it is not

- A replacement to redux, mobx etc.
- A global state machine (although it can, but it's not what it's made for)

## Why?

I wanted to have a tiny state machine for component trees rather than a global state or drilling props.
This is a great solution for components that are dependent on multiple smaller components but where they all need to share the same state.

## How to use it

Imagine the following folder structure:

```
Counter
├── Counter.state.ts
├── Counter.tsx
├── Count.tsx
├── CountButtons.tsx
└── index.ts
```


```tsx
// Counter.state.ts

export const CounterEstate = createEstate({
  initialState: {
    count: 0,
  },
  actions: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setCount(state, by: number) {
      state.count = by;
    },
  },
});

// ====================
// Counter.tsx

function Counter() {
  return (
    <CounterEstate.Root>
      <Count />
      <Buttons />
    </CounterEstate.Root>
  );
}

// ====================
// Count.tsx

function Count() {
  const {
    state: { count },
  } = useEstate(CounterEstate);

  return <div>count: {count}</div>;
}

// ====================
// CountButtons.tsx

function CountButtons() {
  const { increment, decrement, setCount } = useEstate(CounterEstate);

  return (
    <div>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => setCount(5)}>Set to 5</button>
    </div>
  );
}
```

### Connect components

Sometimes you have components from other libraries, like UI libraries etc., that you want to connect to the estate without having to create a new component for it. You can do this by using the `connect` function.

`connect()` will omit the props you pass in the map function and pass the rest to the connected component, so you can use it like you would normally use it, but without having to pass the already mapped props.

```tsx
import { CounterEstate } from './Counter';
import MuiButton from '@mui/material/Button';

const Button = CounterEstate.connect(MuiButton, (state, actions) => ({
  onClick: actions.increment,
  children: `Count is ${state.count}`,
}))

function Buttons() {
  return (
    <div>
      <Button />
    </div>
  );
}

```

### How it can be used

Compared to a global state where this could get a bit annoying with props drilling and internal state management, this is a little more declarative.

In this example we render three `Counter`s (see above). They all have their own context and it's children can read/edit the state for that tree.

```tsx
function App(){
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}

```
![estates counters](https://github.com/philipodev/estates/blob/main/resources/counters.png?raw=true)


### Code examples

* [Simple counters](https://stackblitz.com/edit/estates-demo?file=App.tsx) (StackBlitz)
* [Counter with MUI](https://stackblitz.com/edit/estates-example?file=demo.tsx) (StackBlitz)

