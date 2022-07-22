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
- A global state machine

## How to use it

```tsx
const CounterEstate = createEstate({
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

function Counter() {
  return (
    <CounterEstate.Root>
      <Count />
      <Buttons />
    </CounterEstate.Root>
  );
}

function Count() {
  const {
    state: { count },
  } = useEstate(CounterEstate);

  return <div>count: {count}</div>;
}

function Buttons() {
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

* [Simple counters](https://estates-demo.stackblitz.io) (StackBlitz)

## TODO

Feel free to help implement these features by opening pull requests

- [ ] HOC's for `Root` and a connector for class components.
