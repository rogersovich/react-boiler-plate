import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "services/dummy-json/API"
import { loginAPI } from "services/dummy-json/auth"

export const login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await loginAPI(credentials)
  return response.data
})

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = token
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    profile: {
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      image: null,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    unsetToken: (state) => {
      state.token = null
    },
    setProfile: (state, action) => {
      state.profile.username = action.payload.username
      state.profile.email = action.payload.email
      state.profile.firstName = action.payload.firstName
      state.profile.lastName = action.payload.lastName
      state.profile.image = action.payload.image
    },
    unsetProfile: (state) => {
      state.profile.username = null
      state.profile.email = null
      state.profile.firstName = null
      state.profile.lastName = null
      state.profile.image = null
    },
    unsetError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        authSlice.caseReducers.unsetToken(state)
        authSlice.caseReducers.unsetProfile(state)
        state.isLoading = true
        state.error = null
      })
      // handle successful login
      .addCase(login.fulfilled, (state, action) => {
        const data = action.payload

        // set auth
        authSlice.caseReducers.setToken(state, { payload: data.token })
        // set profile
        authSlice.caseReducers.setProfile(state, { payload: data })

        setAuthToken(data.token)

        state.isLoading = false
        state.error = null
      })
      // handle failed login
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  },
})

// Action creators are generated for each case reducer function
export const { setToken, unsetToken, setProfile, unsetProfile, unsetError } =
  authSlice.actions

export default authSlice.reducer
