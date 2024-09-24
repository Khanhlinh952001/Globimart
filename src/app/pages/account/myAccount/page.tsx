"use client"

import { useState } from 'react'
import { User, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react'
import MainLayout from '@/layouts/main'
export default function MyAccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+84 123 456 789',
    address: '123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam'
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
   
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <MainLayout>

    <div className="min-h-screen bg-background pt-10 text-foreground">
     

      <main className="container mx-auto rounded-xl p-10 bg-white px-4">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Account Information</h2>
            {isEditing ? (
              <button onClick={handleSave} className="bg-[#28A745] hover:bg-green-600 text-white flex px-4 py-2 rounded">
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </button>
            ) : (
              <button onClick={handleEdit} className="bg-[#007BFF] hover:bg-blue-600 text-white flex px-4 py-2 rounded">
                <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-[#007BFF] mr-2" />
              <label htmlFor="name" className="w-24">Name:</label>
              {isEditing ? (
                <input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="flex-grow border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{user.name}</span>
              )}
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-[#007BFF] mr-2" />
              <label htmlFor="email" className="w-24">Email:</label>
              {isEditing ? (
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  className="flex-grow border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{user.email}</span>
              )}
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-[#007BFF] mr-2" />
              <label htmlFor="phone" className="w-24">Phone:</label>
              {isEditing ? (
                <input
                  id="phone"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="flex-grow border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{user.phone}</span>
              )}
            </div>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-[#007BFF] mr-2 mt-1" />
              <label htmlFor="address" className="w-24 mt-1">Address:</label>
              {isEditing ? (
                <input
                  id="address"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="flex-grow border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                <span>{user.address}</span>
              )}
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Account Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-[#FFC107] text-black hover:bg-yellow-500 px-4 py-2 rounded">
              Change Password
            </button>
            <button className="w-full bg-[#007BFF] hover:bg-blue-600 text-white px-4 py-2 rounded">
              View Order History
            </button>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Delete Account
            </button>
          </div>
        </div>
      </main>

   
    </div>
    </MainLayout>

  )
}
