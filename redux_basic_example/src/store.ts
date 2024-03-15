import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./components/counterSlice";
// import counterReducer from "./redux/reducers/counterReducer";

export const store=configureStore({
  reducer:{
    counter:counterReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch