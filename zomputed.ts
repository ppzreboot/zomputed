import { useSyncExternalStore } from 'react'

type I_listener = () => void

interface I_store<I_state> {
    subscribe: (selector: (state: I_state) => any, listener: () => void) => void
    getState: () => I_state
}

export
function eager_zomputed<I_state, I_computed>(
    store: I_store<I_state>,
    deps: (keyof I_state)[],
    compute: (state: I_state) => I_computed,
) {
    let computed = compute(store.getState())
    const l_list: I_listener[] = []
    for (const k of deps)
        store.subscribe(
            state => state[k],
            () => {
                computed = compute(store.getState())
                l_list.forEach(l => l())
            }
        )

    return () =>
        useSyncExternalStore(
            (listener: I_listener) => {
                l_list.push(listener)
                return () => {
                    l_list.splice(l_list.indexOf(listener), 1)
                }
            },
            () => computed,
        )
}

export
function lazy_zomputed<I_state, I_computed>(
    store: I_store<I_state>,
    deps: (keyof I_state)[],
    compute: (state: I_state) => I_computed,
) {
    let no_value = Symbol('no_value')
    let computed: I_computed | Symbol = no_value

    const l_list: I_listener[] = []
    for (const k of deps)
        store.subscribe(
            state => state[k],
            () => {
                computed = no_value
                l_list.forEach(l => l())
            }
        )

    return () =>
        useSyncExternalStore(
            (listener: I_listener) => {
                l_list.push(listener)
                return () => {
                    l_list.splice(l_list.indexOf(listener), 1)
                }
            },
            () =>
                computed === no_value
                    ? (computed = compute(store.getState()))
                    : computed as I_computed
            ,
        )
}

export default lazy_zomputed
