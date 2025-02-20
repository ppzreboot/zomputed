import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { eager_zomputed } from 'zomputed'

interface I_state {
  first_name: string
  last_name: string
}

export
const useStore = create<I_state>()(
  subscribeWithSelector(() => ({
    first_name: "John",
    last_name: "Doe",
  })
))

export
function update_first_name(first_name: string) {
  useStore.setState({ first_name })
}

export
const useName = eager_zomputed(
  useStore,
  ['first_name', 'last_name'],
  state => {
    console.log('Computing fullname')
    return state.first_name + ' ' + state.last_name
  },
)
