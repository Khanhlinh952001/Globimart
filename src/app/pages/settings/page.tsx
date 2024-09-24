"use client"
import { useState } from 'react'
import { Bell, Globe, Lock, Mail, Moon, Sun, User } from 'lucide-react'

import MainLayout from "@/layouts/main"

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [language, setLanguage] = useState('english')
  const [currency, setCurrency] = useState('vnd')

  const handleSaveChanges = () => {
    
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <main className="container mx-auto pt-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <User className="mr-2 h-6 w-6 text-[#007BFF]" />
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block font-medium">Email</label>
                    <input id="email" type="email" defaultValue="johndoe@example.com" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block font-medium">Password</label>
                    <input id="password" type="password" defaultValue="********" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                  </div>
                  <button className="bg-[#007BFF] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Change Password</button>
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Bell className="mr-2 h-6 w-6 text-[#007BFF]" />
                  Notification Preferences
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email-notifications" className="font-medium">Email Notifications</label>
                    <input id="email-notifications" type="checkbox" checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                  </div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="push-notifications" className="font-medium">Push Notifications</label>
                    <input id="push-notifications" type="checkbox" checked={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
                  </div>
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Globe className="mr-2 h-6 w-6 text-[#007BFF]" />
                  Language and Region
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="language" className="block font-medium">Language</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                      <option value="english">English</option>
                      <option value="vietnamese">Vietnamese</option>
                      <option value="french">French</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="currency" className="block font-medium">Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
                      <option value="vnd">Vietnamese Dong (VND)</option>
                      <option value="usd">US Dollar (USD)</option>
                      <option value="eur">Euro (EUR)</option>
                    </select>
                  </div>
                </div>
              </section>
            </div>

            <div className="md:col-span-1">
              <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Sun className="mr-2 h-6 w-6 text-[#007BFF]" />
                  Appearance
                </h2>
                <div className="flex items-center justify-between">
                  <label htmlFor="dark-mode" className="font-medium">Dark Mode</label>
                  <input id="dark-mode" type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </div>
              </section>

              <section className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Lock className="mr-2 h-6 w-6 text-[#007BFF]" />
                  Privacy
                </h2>
                <div>
                  <label className="font-medium">Data Sharing</label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="radio" value="minimal" id="minimal" name="data-sharing" />
                      <label htmlFor="minimal" className="ml-2">Minimal</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" value="balanced" id="balanced" name="data-sharing" />
                      <label htmlFor="balanced" className="ml-2">Balanced</label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" value="full" id="full" name="data-sharing" />
                      <label htmlFor="full" className="ml-2">Full</label>
                    </div>
                  </div>
                </div>
              </section>

              <button 
                className="w-full bg-[#28A745] hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </MainLayout>
  )
}
