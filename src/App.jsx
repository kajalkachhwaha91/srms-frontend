import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/auth/LandingPage";
import Login from "./pages/auth/LoginPage";
import { studentMenu, staffMenu, adminMenu } from "./components/menuItems";
import Signup from "./pages/auth/Signup";
import { lazy, Suspense, useState } from "react";
import Loader from "./components/ui/Loader";
import ChatBot from "./components/chatbot/ChatBot";

// Student pages
const Students = lazy(() =>
  import("./pages/modules/dashboard/student/Student")
);
const AssignmentsPage = lazy(() =>
  import("./pages/modules/dashboard/student/Assignment")
);
const InternalMarks = lazy(() =>
  import("./pages/modules/dashboard/student/Marks")
);
const SemesterGrades = lazy(() =>
  import("./pages/modules/dashboard/student/Result")
);
const NotesTable = lazy(() =>
  import("./pages/modules/dashboard/student/Notes")
);
const StudentProfile = lazy(() =>
  import("./pages/modules/profile/StudentProfile")
);


// Staff pages
const StaffPage = lazy(() => import("./pages/modules/dashboard/staff/Staff"));
const Assignments = lazy(() =>
  import("./pages/modules/dashboard/staff/Assigments")
);
const Marks = lazy(() => import("./pages/modules/dashboard/staff/Marks"));
const StaffProfile = lazy(() => import("./pages/modules/profile/StaffProfile"));
const Student = lazy(() => import("./pages/modules/dashboard/staff/Students"));
const BonafideSection = lazy(() => import("./pages/modules/dashboard/staff/Notes"));

// Admin pages
const AdminPage = lazy(() => import("./pages/modules/dashboard/admin/Admin"));
const StudentPage = lazy(() =>
  import("./pages/modules/dashboard/admin/Students")
);
const AdminStaffPage = lazy(() =>
  import("./pages/modules/dashboard/admin/Staff")
);
const AdminAssignments = lazy(() =>
  import("./pages/modules/dashboard/admin/Assigments")
);
const AdminSemesterResults = lazy(() =>
  import("./pages/modules/dashboard/admin/Results")
);
const AdminProfile = lazy(() => import("./pages/modules/profile/AdminProfile"));


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
    
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      }
    >
       <ChatBot />
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
          <Route path="/staff/notes" element={<BonafideSection />} />

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
    </Suspense>
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
