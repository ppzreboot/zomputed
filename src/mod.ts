import { useSyncExternalStore } from 'react'

type I_listener = () => void

interface I_store<I_state> {
    subscribe: (selector: (state: I_state) => any, listener: () => void) => void
    getState: () => I_state
}

export
function Zomputed<I_state, I_computed>(
    store: I_store<I_state>,
    deps: (keyof I_state)[],
    compute: (state: I_state) => I_computed,
) {
    let l_list: I_listener[] = []
    for (const k of deps)
        store.subscribe(
            state => state[k],
            () => {
                l_list.forEach(l => l())
            }
        )
    return () =>
        useSyncExternalStore(
            (listener: I_listener) => {
                l_list = [...l_list, listener]
                return () => {
                    l_list = l_list.filter(l => l !== listener)
                }
            },
            () => compute(store.getState()),
        )
}
