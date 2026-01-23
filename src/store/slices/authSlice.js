import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conf from "../../config";


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, selectedRole }, thunkAPI) => {
    try {
      const res = await fetch(`${conf.apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      return { data, selectedRole };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);


export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ name, email, password, role }, thunkAPI) => {
    try {
      const payload = {
        name,
        email,
        password,
        role:
          role === "staff"
            ? "Teacher"
            : role.charAt(0).toUpperCase() + role.slice(1),
      };

      const res = await fetch(`${conf.apiBaseUrl}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const Logout = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const res = await fetch(`${conf.apiBaseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }

      // clear client-side data
      localStorage.clear();

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ===================== SLICE ===================== */

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("authToken"),
    user: JSON.parse(localStorage.getItem("userData")),
    role: localStorage.getItem("role"),
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* ---------- LOGIN ---------- */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
  const { data, selectedRole } = action.payload;

  state.loading = false;
  state.token = data.token;

  // 🔥 FORCE role consistency
  state.user = {
    ...data.user,
    role: selectedRole,
  };

  state.role = selectedRole;

  localStorage.setItem("authToken", data.token);
  localStorage.setItem(
    "userData",
    JSON.stringify({
      ...data.user,
      role: selectedRole,
    })
  );
  localStorage.setItem("role", selectedRole);
})



      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- LOGOUT ---------- */
      .addCase(Logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.role = null;
      })
      .addCase(Logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;

