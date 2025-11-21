import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Key, Edit2, Save, X } from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      
      // Get token from localStorage (CORRECTED!)
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }
      
      const response = await fetch('https://student-result-management-system-vikh.onrender.com/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setProfile(data.user);
      setEditedProfile(data.user);
      setError(null);
    } catch (err) {
      setError(err.message);
      
      // Try to get user data from localStorage as fallback
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          setProfile(parsedData);
          setEditedProfile(parsedData);
        } catch (parseError) {
          // If parsing fails, use mock data
          const mockData = {
            id: "6910b792a7c90018ae565ab6",
            name: "kajal",
            email: "kajal@example.com",
            role: "Teacher"
          };
          setProfile(mockData);
          setEditedProfile(mockData);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setError('No authentication token found');
        return;
      }

      // Add your update API call here
      const response = await fetch('https://student-result-management-system-vikh.onrender.com/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile)
      });

      if (response.ok) {
        setProfile(editedProfile);
        setIsEditing(false);
        // Update localStorage with new data
        localStorage.setItem('userData', JSON.stringify(editedProfile));
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error updating profile:', err);
    }
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex text-sm text-gray-500">
            <a href="#" className="hover:text-gray-700">Dashboard</a>
            <span className="mx-2">›</span>
            <span className="text-cyan-500 font-medium">Profile</span>
          </nav>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
              <p className="text-sm text-gray-500 mt-1">View and manage your account details</p>
            </div>
            <div className="flex space-x-2">
              
                 
            
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  Note: {error}
                </p>
              </div>
            )}

            <div className="flex items-start space-x-8">
              {/* Avatar Section */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-5xl">
                    {profile?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-6">
                {/* User ID */}
                

                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2 text-gray-400" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile?.name || ''}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-900 capitalize">{profile?.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedProfile?.email || ''}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-900">{profile?.email}</p>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Shield className="w-4 h-4 mr-2 text-gray-400" />
                    Role
                  </label>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-900 capitalize">{profile?.role}</p>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800">
                        {profile?.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Account Status</p>
                  <p className="text-sm font-medium text-green-600">Active</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">Last Login</p>
                  <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}