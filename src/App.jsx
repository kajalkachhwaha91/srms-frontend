import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/auth/LandingPage";
import Login from "./pages/auth/LoginPage";
import { studentMenu, staffMenu, adminMenu } from "./components/menuItems";
import Signup from "./pages/auth/Signup";

// Student pages
import Students from "./pages/modules/dashboard/student/Student";
import AssignmentsPage from "./pages/modules/dashboard/student/Assignment";
import InternalMarks from "./pages/modules/dashboard/student/Marks";
import SemesterGrades from "./pages/modules/dashboard/student/Result";
import NotesTable from "./pages/modules/dashboard/student/Notes";
import StudentProfile from "./pages/modules/profile/StudentProfile";

// Staff pages
import StaffPage from "./pages/modules/dashboard/staff/Staff";
import Assignments from "./pages/modules/dashboard/staff/Assigments";
import Marks from "./pages/modules/dashboard/staff/Marks";
import StaffProfile from "./pages/modules/profile/StaffProfile";
import Student from "./pages/modules/dashboard/staff/Students"


// Admin pages
import AdminPage from "./pages/modules/dashboard/admin/Admin";
import StudentPage from "./pages/modules/dashboard/admin/Students";
import AdminStaffPage from "./pages/modules/dashboard/admin/Staff";
import AdminAssignments from "./pages/modules/dashboard/admin/Assigments";
import AdminSemesterResults from "./pages/modules/dashboard/admin/Results";
import AdminProfile from "./pages/modules/profile/AdminProfile";

function AppRoutes() {
  const location = useLocation();

  // Choose menu based on current path prefix
  let menuItems = [];
  let userRole = "";
  if (location.pathname.startsWith("/student")) {
    menuItems = studentMenu;
    userRole = "Student";
  } else if (location.pathname.startsWith("/staff")) {
    menuItems = staffMenu;
    userRole = "Staff";
  } else if (location.pathname.startsWith("/admin")) {
    menuItems = adminMenu;
    userRole = "Admin";
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      {/* Protected layout routes */}
      <Route
        element={
          <Layout
            menuItems={menuItems}
            userName={userRole}
            userRole={userRole}
            profileImage="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          />
        }
      >
        {/* Student Routes */}
        <Route path="/student" element={<Students />} />
        <Route path="/student/assignments" element={<AssignmentsPage />} />
        <Route path="/student/internal-marks" element={<InternalMarks />} />
        <Route path="/student/semester-grades" element={<SemesterGrades />} />
        <Route path="/student/notes" element={<NotesTable />} />
        <Route path="/student/profile" element={<StudentProfile />} />

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffPage />} />
        <Route path="/staff/assignments" element={<Assignments />} />
        <Route path="/staff/marks" element={<Marks />} />
        <Route path="/staff/profile" element={<StaffProfile />} />
        <Route path="/staff/students" element={<Student />} />
        
        {/* Add more staff routes here */}

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/students" element={<StudentPage />} />
        <Route path="/admin/staff" element={<AdminStaffPage />} />
        <Route path="/admin/assignments" element={<AdminAssignments />} />
        <Route path="/admin/results" element={<AdminSemesterResults />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;