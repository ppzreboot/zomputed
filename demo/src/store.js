import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import zomputed from 'zomputed'

console.log('using store.js')

export
const useStore = create(
  subscribeWithSelector(() => ({
    first_name: 'John',
    last_name: 'Doe',
  }))
)

export
function update_first_name(first_name) {
  useStore.setState({ first_name })
}

export
const useName = zomputed(
  useStore,
  ['first_name', 'last_name'],
  state => {
    console.log('Computing fullname')
    return state.first_name + ' ' + state.last_name
  },
)
