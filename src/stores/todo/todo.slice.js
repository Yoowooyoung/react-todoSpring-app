import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todoData, thunkAPI) => {
    // 1️⃣ pending 상태 시작 (자동)
    try {
      // 2️⃣ MockAPI 서버에 데이터 전송
      const newTodo = {
        todoName: todoData.todoName,
        comBtn: false
      }
      // MockAPI 서버에 전송
      const response = await axios.post(
        "https://6970250aa06046ce61889fe1.mockapi.io/todos",
        newTodo
      )
      console.log("✅ 서버 응답:", response.data)
      // 3️⃣ fulfilled 상태 (성공), todos배열에 추가
      return response.data
      
    } catch (error) {
      // 4️⃣ rejected 상태 (실패)
      return thunkAPI.rejectWithValue("할 일 추가 실패")
    }
  }
)

const initialState = {
        todos: [],
        todoName: "",
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {}, 
    extraReducers: (builder) => {
        
        builder
        .addCase(addTodo.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(addTodo.fulfilled, (state, action)=> {
            state.isLoading = false
            state.order = action.payload
        })
        .addCase(addTodo.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })
    },
})