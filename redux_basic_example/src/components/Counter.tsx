import { useAppDispatch, useAppSelector } from "../hooks";
import { decrement, increment, reset } from "./counterSlice";

const Counter=()=>{
  const count = useAppSelector((state)=>state.counter.value)
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <button
          aria-label="Reset"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
    </div>
  )
}

export default Counter;