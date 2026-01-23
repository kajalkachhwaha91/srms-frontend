// menus.js
import { GraduationCap, Users, FileText, ClipboardList, Download, Calendar, Bell, BookOpen, Home } from "lucide-react";

export const studentMenu = [
  { name: "Dashboard", path: "/student", icon: GraduationCap },
  { name: "Assignments", path: "/student/assignments", icon: ClipboardList },
  { name: "Results", path: "/student/internal-marks", icon: FileText },
  { name: "Downloads", path: "/student/notes", icon: Download },
 
  
];

export const staffMenu = [
  { name: "Dashboard", path: "/staff", icon: Home },
  { name: " Students", path: "/staff/students", icon: Users },
  { name: "Assignments", path: "/staff/assignments", icon: ClipboardList },
  { name: "Marks", path: "/staff/marks", icon: FileText },
  { name: "Bonafiled Request", path: "/staff/notes", icon: Calendar },
];

export const adminMenu = [
  { name: "Dashboard", path: "/admin", icon: Home },
  { name: "Students", path: "/admin/students", icon: Users },
  { name: "Teachers", path: "/admin/staff", icon: BookOpen },
  { name: "Results", path: "/admin/results", icon: FileText },

];
