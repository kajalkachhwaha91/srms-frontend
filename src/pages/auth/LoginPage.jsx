import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// --- API Endpoints ---
const BASE_URL = "https://student-result-management-system-vikh.onrender.com";
const ROLES_URL = `${BASE_URL}/roles`;
const LOGIN_URL = `${BASE_URL}/auth/login`;

const Login = () => {
    // State Management
    const [email, setEmail] = useState("Kachhwahakajal91@gmail.com");
    const [password, setPassword] = useState("Kajal@91");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const [availableRoles, setAvailableRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    // --- 1. Fetch Available Roles on Component Mount ---
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await fetch(ROLES_URL);
                if (!response.ok) {
                    throw new Error("Failed to fetch roles from server.");
                }
                const data = await response.json();
                setAvailableRoles(data.roles || []);
            } catch (error) {
                console.error("Error fetching roles:", error);
                setMessage("Error loading roles. Please check the network.");
            }
        };
        fetchRoles();
    }, []);

    // --- 2. Handle Login (API Call) ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');

        if (isLoading) return;

        if (!role) {
            setMessage("Please select a role before logging in!");
            return;
        }

        setIsLoading(true);
        
        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "Invalid credentials or login failed.");
            }

            // --- Success: Store Auth Data ---
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data.user));

            // --- Extract and Normalize Roles ---
            // Handle different possible API response structures
            let serverRole = '';
            
            if (data.user && data.user.role) {
                if (typeof data.user.role === 'string') {
                    serverRole = data.user.role.toLowerCase();
                } else if (data.user.role.name) {
                    serverRole = data.user.role.name.toLowerCase();
                }
            }

            const selectedRole = role.toLowerCase();
            
            // Map "teacher" to "staff" for consistency
            const mappedServerRole = serverRole === "teacher" ? "staff" : serverRole;
            
            // --- Detailed Logging for Debugging ---
            console.log("=== LOGIN DEBUG INFO ===");
            console.log("Full API Response:", data);
            console.log("User Object:", data.user);
            console.log("Selected Role:", selectedRole);
            console.log("Server Role (raw):", serverRole);
            console.log("Mapped Server Role:", mappedServerRole);
            console.log("========================");
            
            // --- Role-Based Navigation Logic ---
            // Priority: Use the SELECTED role if it matches, otherwise use SERVER role
            
            let navigationPath = '';
            let roleToUse = '';
            
            // Check if roles match
            if (selectedRole === mappedServerRole) {
                roleToUse = selectedRole;
                console.log("✓ Roles match! Using selected role:", roleToUse);
            } else {
                roleToUse = mappedServerRole;
                console.log("⚠ Role mismatch! Selected:", selectedRole, "| Server:", mappedServerRole);
                setMessage(`Role mismatch detected! Your account is: ${mappedServerRole.toUpperCase()}`);
            }
            
            // Determine navigation path based on role
            switch(roleToUse) {
                case "admin":
                    navigationPath = "/admin";
                    console.log("→ Navigating to ADMIN dashboard");
                    break;
                case "student":
                    navigationPath = "/student";
                    console.log("→ Navigating to STUDENT dashboard");
                    break;
                case "staff":
                    navigationPath = "/staff";
                    console.log("→ Navigating to STAFF dashboard");
                    break;
                default:
                    setMessage(`Unknown role: ${roleToUse}. Please contact support.`);
                    setIsLoading(false);
                    return;
            }
            
            // Navigate to the determined path
            if (navigationPath) {
                console.log("Final Navigation Path:", navigationPath);
                
                // Small delay to ensure state is saved
                setTimeout(() => {
                    navigate(navigationPath, { replace: true });
                }, 100);
            }

        } catch (error) {
            console.error("Login API Error:", error.message);
            setMessage(error.message || "An unknown network error occurred. Try again.");
        } finally {
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
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-red-500 text-white rounded-lg shadow-xl max-w-sm w-full text-center">
                    <p className="font-medium">{message}</p>
                    <button 
                        onClick={() => setMessage('')} 
                        className="mt-2 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity underline"
                    >
                        Dismiss
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
                            <option value="" disabled>
                                {availableRoles.length === 0 ? "Loading Roles..." : "Select Role"}
                            </option>
                            {availableRoles.map((r) => {
                                const displayName = r.name === 'Teacher' ? 'Staff' : r.name;
                                const roleValue = r.name.toLowerCase() === 'teacher' ? 'staff' : r.name.toLowerCase();
                                return (
                                    <option key={r.id} value={roleValue}>
                                        {displayName}
                                    </option>
                                );
                            })}
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

                        {/* Forget Password Link */}
                        <p className="text-sm text-center mt-4 text-[#00b8f1] font-medium cursor-pointer hover:underline">
                            Forget Password?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;