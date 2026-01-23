import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import conf from "../../config";

/* ================= DASHBOARD ANALYTICS ================= */

export const fetchMarksAnalytics = createAsyncThunk(
  "admin/fetchMarksAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}/marks/analytics`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch marks");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchAssignmentsAnalytics = createAsyncThunk(
  "admin/fetchAssignmentsAnalytics",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        `${conf.apiBaseUrl}/assignments/analytics`
      );
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch assignments");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

/* ================= FETCH STUDENTS ================= */
export const fetchStudents = createAsyncThunk(
  "admin/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${conf.apiBaseUrl}/users/students`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch students");

      // transform API response
      return data.students.map((student) => ({
        id: student._id,
        name: student.name,
        rollNo: student.rollNumber || "N/A",
        class: student.class || "N/A",
        section: student.section || "N/A",
        phone: student.phone || "N/A",
        email: student.email,
        year: student.year || "2024",
        status: student.status ?? true,
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ================= SLICE ================= */
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    marksData: null,
    assignmentsData: null,
    students: [],        // ✅ added
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- MARKS ---------- */
      .addCase(fetchMarksAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarksAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.marksData = action.payload;
      })
      .addCase(fetchMarksAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- ASSIGNMENTS ---------- */
      .addCase(fetchAssignmentsAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.assignmentsData = action.payload;
      })
      .addCase(fetchAssignmentsAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- STUDENTS ---------- */
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;