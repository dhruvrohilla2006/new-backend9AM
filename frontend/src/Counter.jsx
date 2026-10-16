import counterStore from "./store/counterStore";

function Counter() {
  const { count, inc } = counterStore()
  console.log(counterStore())
  return ( 
    <div>
      <span>{count}</span>
      <br />
      <hr />
      <button onClick={inc}>one up</button>
    </div>
  )
}

export default Counter;