import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- API Endpoints ---
const BASE_URL = "https://student-result-management-system-vikh.onrender.com";
const ROLES_URL = `${BASE_URL}/roles`;
const LOGIN_URL = `${BASE_URL}/auth/login`;

const Login = () => {
    // Existing State
    const [email, setEmail] = useState("kajal@example.com");
    const [password, setPassword] = useState("Kajal1234");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    // New State for API Integration
    const [availableRoles, setAvailableRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(''); // Custom message box content

    // --- 1. Fetch Available Roles on Component Mount ---
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(ROLES_URL);
                if (!response.ok) {
                    throw new Error("Failed to fetch roles from server.");
                }
                const data = await response.json();
                // The API returns roles in the format: { roles: [{id: 1, name: "Admin"}, ...] }
                setAvailableRoles(data.roles || []);
            } catch (error) {
                console.error("Error fetching roles:", error);
                setMessage("Error loading roles. Please check the network.");
            }
        };
        fetchRoles();
    }, []); // Empty dependency array ensures this runs once on mount


    // --- 2. Handle Login (API Call) ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages

        if (isLoading) return;

        if (!role) {
            setMessage("Please select a role before logging in!");
            return;
        }

        // Set loading state and prepare payload
        setIsLoading(true);
        
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                // If response status is 4xx or 5xx
                throw new Error(data.message || "Invalid credentials or login failed.");
            }

            // --- Success Handling ---
            
            // Store the token and user data (Important for subsequent requests)
            // Note: In a real app, you would use a global state manager or context for this.
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            const serverRole = data.user.role.toLowerCase();
            const selectedRole = role.toLowerCase();
            
            // Log for debugging and confirmation
            console.log("Login successful. Server role:", serverRole);
            
            // --- Redirection Logic (using selected role for now, mapped from server role) ---

            // The API uses "Teacher" but the UI uses "Staff". We map here for clean redirection.
            const redirectRole = serverRole === "teacher" ? "staff" : serverRole;

            // Check if the selected role matches the server role (best practice)
            // or simply redirect based on the selected role (as per original logic)
            if (selectedRole === redirectRole) {
                 if (selectedRole === "student") {
                     navigate("/student");
                 } else if (selectedRole === "staff") {
                     navigate("/staff");
                 } else if (selectedRole === "admin") {
                     navigate("/admin");
                 }
            } else {
                // Handle role mismatch gracefully
                setMessage(`Login successful, but role mismatch! Selected: ${selectedRole}, Server: ${redirectRole}. Please re-select or continue.`);
                
                // For demonstration, redirecting based on the *server's* validated role.
                if (redirectRole === "student") navigate("/student");
                else if (redirectRole === "staff") navigate("/staff");
                else if (redirectRole === "admin") navigate("/admin");
            }


        } catch (error) {
            // Display error message to the user
            console.error("Login API Error:", error.message);
            setMessage(error.message || "An unknown network error occurred. Try again.");
        } finally {
            // Always stop loading regardless of success or failure
            setIsLoading(false);
        }
    };


    return (
        <div className="flex h-screen bg-gray-100 relative overflow-hidden font-inter">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#00b8f1] rounded-br-[200px] opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00b8f1] opacity-10 rounded-tl-[200px]"></div>

            {/* Message Box / Alert UI */}
            {message && (
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-red-500 text-white rounded-lg shadow-xl max-w-sm w-full text-center animate-pulse">
                    <p className="font-medium">{message}</p>
                    <button 
                        onClick={() => setMessage('')} 
                        className="ml-3 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity"
                    >
                        [Dismiss]
                    </button>
                </div>
            )}
            
            {/* Main Container */}
            <div className="relative z-10 flex w-full max-w-4xl mx-auto my-auto bg-white rounded-3xl shadow-2xl overflow-hidden h-auto sm:h-[500px]">
                
                {/* Left Panel - Logo Section (Desktop) */}
                <div className="hidden md:flex w-1/2 bg-gray-50 items-center justify-center p-12">
                    <div className="flex flex-col items-center text-center">
                        <div className="bg-gray-900 w-20 h-20 mb-4 flex items-center justify-center rounded-xl flex-shrink-0 shadow-lg">
                            <span className="text-white text-4xl font-extrabold">K</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 leading-tight">KDKCE MCA DEPARTMENT</h1>
                        <h2 className="text-base text-gray-500 mt-2">STUDENT RESULT MANAGEMENT SYSTEM</h2>
                    </div>
                </div>

                {/* Right Panel - Login Form */}
                <div className="flex w-full md:w-1/2 justify-center items-center p-8 md:p-12">
                    <div className="w-full max-w-sm">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Welcome Back!</h2>

                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 placeholder-gray-400 transition duration-150"
                            required
                        />

                        {/* Password Input */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 placeholder-gray-400 transition duration-150"
                            required
                        />

                        {/* Role Dropdown */}
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border-2 border-[#00b8f1] rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-[#00b8f1] focus:border-transparent text-gray-700 bg-white cursor-pointer appearance-none transition duration-150"
                        >
                            <option value="" disabled={role !== ""}>
                                {availableRoles.length === 0 ? "Loading Roles..." : "Select Role"}
                            </option>
                            {availableRoles.map((r) => (
                                <option 
                                    key={r.id} 
                                    // Use the role name as the value (e.g., "Admin", "Teacher", "Student")
                                    // then convert to lowercase for the internal logic ("admin", "staff", "student")
                                    value={r.name.toLowerCase() === 'teacher' ? 'staff' : r.name.toLowerCase()}
                                >
                                    {r.name === 'Teacher' ? 'Staff' : r.name}
                                </option>
                            ))}
                        </select>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={isLoading || availableRoles.length === 0}
                            className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-md ${
                                isLoading || availableRoles.length === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-[#00b8f1] text-white hover:bg-[#009ed1] hover:shadow-lg'
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Logging In...
                                </span>
                            ) : (
                                'Login'
                            )}
                        </button>

                        {/* sign up  Link */}
                        <p 
    className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline"
    onClick={() => navigate("/signup")}
>
    Don't have an account? Create Account
</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;