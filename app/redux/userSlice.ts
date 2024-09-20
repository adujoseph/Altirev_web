import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface UserState {
  user: any
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  message: string | any
}

interface Payload {
  Username: string
  Password: string
}

const initialState: UserState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// login user
export const login = createAsyncThunk(
  'user/login',
  async (payload: Payload, thunkAPI) => {
    try {
      return await payload
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)
// logout user
export const logout = createAsyncThunk('user/logout', async (payload) => {
  return await payload
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state: UserState, action: any) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(logout.fulfilled, (state: UserState, action: any) => {
        state.user = null
      })
      .addCase(login.rejected, (state: UserState, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
  }
})

export default userSlice.reducer
