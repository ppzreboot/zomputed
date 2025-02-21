# zomputed.js

zomputed = Zustand computed

zomputed.js ensure the computation occurs only once when:
+ dependencies change
+ multiple dependencies change at the same time

zomputed.js provide:
+ eager computation: compute immediately when dependencies change
+ lazy computation: defer computation until the result is needed

> zomputed.js is default to lazy computation

``` bash
npm install zomputed
```

## Usage

``` js
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { zomputed } from 'zomputed'

const useStore = create(
  subscribeWithSelector(() => ({
    first_name: 'John',
    last_name: 'Doe',
  }))
)

const useName = zomputed(
  useStore, // the store to listen
  ['first_name', 'last_name'], // the properties to listen
  state => state.first_name + ' ' + state.last_name, // compute
)

function App() {
  const fullname = useName() // John Doe
  return <div>{fullname}</div>
}
```
