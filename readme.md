# zomputed.js

zomputed = Zustand computed

``` bash
npm install zomputed
```

`zomputed.js` ensure the computation occurs **only once** when:
+ dependencies change
+ multiple dependencies change at the same time

`zomputed.js` provide:
+ **eager** computation: compute immediately when dependencies change
+ **lazy** computation: defer computation until the result is needed

> `zomputed.js` is default to **lazy** computation

> [!TIP]
> Use `useMemo` for simple computations to keep the code simple. **Simple is important**.

## Usage

``` js
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import zomputed from 'zomputed' // default to lazy_zomputed
// import { lazy_zomputed, eager_zomputed } from 'zomputed'

const useStore = create(
  subscribeWithSelector(() => ({
    first_name: 'John',
    last_name: 'Doe',
  }))
)

const useName = zomputed(
  useStore, // the store to listen
  ['first_name', 'last_name'], // the properties to listen
  compute_fullname, // compute
)

function App() {
  const fullname = useName() // John Doe
  return <div>{fullname}</div>
}

function compute_fullname(first_name: string, last_name: string) {
  // heavy computation
  // heavy computation
  // heavy computation
  return first_name + ' ' + last_name
}
```
