import { useState } from 'react'
import { useName, useStore, update_first_name } from './store'

export default
function App() {
  const [no_computed, set_no_computed] = useState(false)
  const first_name = useStore(s => s.first_name)

  return <>
    {no_computed || <ComputedDemo />}
    <button
      onClick={() =>
        set_no_computed(!no_computed)
      }
    >Disable</button>
    <div>
      <label>First Name: </label>
      <input
        value={first_name}
        onChange={e => update_first_name(e.target.value)}
      />
    </div>
  </>
}

function ComputedDemo() {
  const fullname = useName()
  return <h1>Hello, {fullname}</h1>
}
