import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo/todo.slice'

export const store = configureStore({
  reducer: {
    todo: todoReducer
  }
})
