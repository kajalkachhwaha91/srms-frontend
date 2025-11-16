// menus.js
import { GraduationCap, Users, FileText, ClipboardList, Download, Calendar, Bell, BookOpen, Home } from "lucide-react";

export const studentMenu = [
  { name: "Dashboard", path: "/student", icon: GraduationCap },
  { name: "Assignments", path: "/student/assignments", icon: ClipboardList },
  { name: "Marks", path: "/student/internal-marks", icon: FileText },
  { name: "Results", path: "/student/semester-grades", icon: FileText },
  { name: "Notes", path: "/student/notes", icon: Download },
  { name: "Timetable", path: "/student/timetable", icon: Users },
];

export const staffMenu = [
  { name: "Dashboard", path: "/staff", icon: Home },
  { name: "Manage Students", path: "/staff/students", icon: Users },
  { name: "Assignments", path: "/staff/assignments", icon: ClipboardList },
  { name: "Results", path: "/staff/results", icon: FileText },
];

export const adminMenu = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "Students", path: "/admin/students", icon: Users },
  { name: "Teachers", path: "/admin/staff", icon: BookOpen },
  { name: "Assignments", path: "/admin/assignments", icon: ClipboardList },
  { name: "Results", path: "/admin/results", icon: FileText },
//   { name: "Notes", path: "/admin/notes", icon: Download },
  { name: "TimeTable", path: "/admin/timetable", icon: Calendar },
//   { name: "Notifications", path: "/admin/notifications", icon: Bell },
];
