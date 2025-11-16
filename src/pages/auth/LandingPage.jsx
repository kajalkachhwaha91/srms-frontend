import React from "react";
import { GraduationCap, FileText, TrendingUp, Award, Users, BarChart3, Shield, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";


const LandingPage = () => {
    const navigate = useNavigate(); 
    

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gray-900 w-10 h-10 flex items-center justify-center rounded-lg">
                <span className="text-white text-xl font-bold">K</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-800">MCA DEPARTMENT</h1>
                <p className="text-xs text-gray-600">KDK College of Engineering</p>
              </div>
            </div>
            <button
          onClick={() => navigate("/login")}
          className="bg-[#00b8f1] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#009ed1] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Login
        </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#00b8f1] to-[#0090c4] text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Result Management System
              </h1>
              <p className="text-lg md:text-xl mb-8 text-blue-50">
                Streamline your academic results with our comprehensive digital platform. Fast, secure, and accessible anytime, anywhere.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-[#00b8f1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Get Started
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#00b8f1] transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white bg-opacity-10 rounded-3xl backdrop-blur-sm p-8 shadow-2xl">
                  <GraduationCap className="w-full h-full text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive solution designed to make result management effortless for students, faculty, and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-12 h-12" />,
                title: "Easy Access",
                description: "View and download results instantly from anywhere with internet access."
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Secure & Private",
                description: "Bank-level encryption ensures your academic data remains confidential."
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Performance Analytics",
                description: "Track your academic progress with detailed analytics and insights."
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Multi-User Support",
                description: "Separate portals for students, faculty, and administrators."
              },
              {
                icon: <BarChart3 className="w-12 h-12" />,
                title: "Grade Reports",
                description: "Generate comprehensive reports with customizable formats."
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: "Achievement Tracking",
                description: "Monitor academic achievements and milestones effortlessly."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#00b8f1]"
              >
                <div className="text-[#00b8f1] mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#00b8f1] to-[#0090c4] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5000+", label: "Students" },
              { number: "200+", label: "Faculty Members" },
              { number: "50+", label: "Departments" },
              { number: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">Simple steps to access your results</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Login",
                description: "Access the portal using your credentials"
              },
              {
                step: "2",
                title: "Select Semester",
                description: "Choose the semester and examination"
              },
              {
                step: "3",
                title: "View Results",
                description: "Access and download your detailed results"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00b8f1] text-white text-2xl font-bold rounded-full mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-[#00b8f1] to-[#0090c4] rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-50 mb-8">
              Join thousands of students already using our platform
            </p>
            <button className="bg-white text-[#00b8f1] px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Access Portal Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-[#00b8f1] w-10 h-10 flex items-center justify-center rounded-lg">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">MCA DEPARTMENT</h3>
                  <p className="text-xs">KDK College</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">Results</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-[#00b8f1] transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <p className="text-sm">Email: info@kdkcollege.edu</p>
              <p className="text-sm">Phone: +91 1234567890</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 KDK College of Engineering. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;