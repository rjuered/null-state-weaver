
import React, { useState } from "react";
import { useUser } from "@/context";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  UserRound, 
  Settings as SettingsIcon, 
  Palette, 
  Bell, 
  Languages, 
  CreditCard,
  CircleArrowRight,
  Moon,
  Sun
} from "lucide-react";

const Settings = () => {
  const { user, subscription = "free", language = "en", switchLanguage = () => {} } = useUser();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [theme, setTheme] = useState("light");
  
  const [profileForm, setProfileForm] = useState({
    name: (user as any)?.name || "",
    email: user?.email || "",
    company: (user as any)?.company || ""
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    qrCreationAlerts: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully"
    });
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: value
    });
    
    toast({
      title: "Settings updated",
      description: "Your notification settings have been updated"
    });
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    
    toast({
      title: "Theme updated",
      description: `Application theme set to ${newTheme === 'dark' ? 'dark' : 'light'} mode`
    });
  };

  // Get subscription badge color
  const getSubscriptionBadgeColor = () => {
    switch(subscription) {
      case 'pro': return "bg-gradient-to-r from-indigo-500 to-purple-600 text-white";
      case 'business': return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white";
      default: return "bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white">
                <UserRound size={24} />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900 dark:text-white">{profileForm.name || "User"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[180px]">{profileForm.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === "profile" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <UserRound size={18} className="mr-3" />
                <span>Profile</span>
                {activeTab === "profile" && <CircleArrowRight size={16} className="ml-auto" />}
              </button>
              
              <button 
                onClick={() => setActiveTab("subscription")}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === "subscription" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                <span>Subscription</span>
                {activeTab === "subscription" && <CircleArrowRight size={16} className="ml-auto" />}
              </button>
              
              <button 
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === "notifications" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Bell size={18} className="mr-3" />
                <span>Notifications</span>
                {activeTab === "notifications" && <CircleArrowRight size={16} className="ml-auto" />}
              </button>
              
              <button 
                onClick={() => setActiveTab("appearance")}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === "appearance" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Palette size={18} className="mr-3" />
                <span>Appearance</span>
                {activeTab === "appearance" && <CircleArrowRight size={16} className="ml-auto" />}
              </button>
              
              <button 
                onClick={() => setActiveTab("language")}
                className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
                  activeTab === "language" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white" 
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Languages size={18} className="mr-3" />
                <span>Language</span>
                {activeTab === "language" && <CircleArrowRight size={16} className="ml-auto" />}
              </button>
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</span>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleThemeChange("light")}
                    className={`p-2 rounded-l-md ${theme === "light" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                  >
                    <Sun size={16} />
                  </button>
                  <button 
                    onClick={() => handleThemeChange("dark")}
                    className={`p-2 rounded-r-md ${theme === "dark" ? "bg-purple-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}
                  >
                    <Moon size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Profile Settings</h2>
                <p className="text-purple-100">Manage your account information</p>
              </div>
              
              <div className="p-6">
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="Your name"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="your.email@example.com"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">Company</Label>
                    <Input 
                      id="company" 
                      placeholder="Your company name (optional)"
                      value={profileForm.company}
                      onChange={(e) => setProfileForm({...profileForm, company: e.target.value})}
                      className="mt-1 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
                    >
                      Save Profile Changes
                    </Button>
                  </div>
                </form>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Password</h3>
                  <Button 
                    variant="outline" 
                    className="border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900"
                  >
                    Change Password
                  </Button>
                </div>
                
                <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <Button 
                    variant="outline" 
                    className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Subscription Tab */}
          {activeTab === "subscription" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Subscription</h2>
                <p className="text-purple-100">Manage your subscription plan</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-300">Current Plan</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{subscription}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getSubscriptionBadgeColor()}`}>
                    {subscription === "free" ? "Free" : subscription === "pro" ? "Pro" : "Business"}
                  </span>
                </div>
                
                {subscription === "free" ? (
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Upgrade Your Plan</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Unlock premium features with our Pro or Business plans. Get unlimited QR codes, advanced customization options, and detailed analytics.
                    </p>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                      View Plans &amp; Pricing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Plan Details</h3>
                      
                      <div className="mt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Billing period</span>
                          <span className="font-medium text-gray-900 dark:text-white">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Next payment</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Payment method</span>
                          <span className="font-medium text-gray-900 dark:text-white">•••• 4242</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900"
                      >
                        Change Plan
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        Update Payment Method
                      </Button>
                    </div>
                    
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button 
                        variant="outline" 
                        className="border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                      >
                        Cancel Subscription
                      </Button>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Your subscription will remain active until the end of the billing period.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <p className="text-purple-100">Manage your notification preferences</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">QR Creation Alerts</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when your QR codes are created</p>
                    </div>
                    <Switch
                      checked={notificationSettings.qrCreationAlerts}
                      onCheckedChange={(checked) => handleNotificationChange("qrCreationAlerts", checked)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new features and offers</p>
                    </div>
                    <Switch
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Weekly Digest</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Weekly summary of your QR code analytics</p>
                    </div>
                    <Switch
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationChange("weeklyDigest", checked)}
                      className="data-[state=checked]:bg-purple-600"
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                    Save Notification Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Appearance Tab */}
          {activeTab === "appearance" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Appearance</h2>
                <p className="text-purple-100">Customize your display preferences</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="theme-select" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Theme Mode
                    </Label>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        onClick={() => handleThemeChange("light")}
                        className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                          theme === "light" 
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-500" 
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800"
                        }`}
                      >
                        <Sun className="h-8 w-8 mx-auto mb-2 text-gray-900 dark:text-white" />
                        <p className="font-medium text-gray-900 dark:text-white">Light</p>
                      </div>
                      
                      <div 
                        onClick={() => handleThemeChange("dark")}
                        className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                          theme === "dark" 
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-500" 
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800"
                        }`}
                      >
                        <Moon className="h-8 w-8 mx-auto mb-2 text-gray-900 dark:text-white" />
                        <p className="font-medium text-gray-900 dark:text-white">Dark</p>
                      </div>
                      
                      <div 
                        onClick={() => handleThemeChange("system")}
                        className={`cursor-pointer rounded-lg border p-4 text-center transition-all ${
                          theme === "system" 
                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-500" 
                            : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-800"
                        }`}
                      >
                        <SettingsIcon className="h-8 w-8 mx-auto mb-2 text-gray-900 dark:text-white" />
                        <p className="font-medium text-gray-900 dark:text-white">System</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="color-scheme" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Color Scheme
                    </Label>
                    <Select defaultValue="purple">
                      <SelectTrigger id="color-scheme" className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select color scheme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purple">Purple (Default)</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="green">Green</SelectItem>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="orange">Orange</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="layout-density" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Layout Density
                    </Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger id="layout-density" className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select layout density" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">Compact</SelectItem>
                        <SelectItem value="comfortable">Comfortable</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Enable Animations</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toggle UI animations throughout the application
                      </p>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-purple-600" />
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                    Save Appearance Settings
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Language Tab */}
          {activeTab === "language" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
                <h2 className="text-xl font-bold text-white">Language</h2>
                <p className="text-purple-100">Set your language preferences</p>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="app-language" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Application Language
                    </Label>
                    <Select 
                      value={language} 
                      onValueChange={switchLanguage}
                    >
                      <SelectTrigger id="app-language" className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="ar">العربية (Arabic)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      This will change the language throughout the entire application
                    </p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">
                      Date &amp; Time Format
                    </Label>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="date-international" 
                          name="dateFormat" 
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500" 
                          defaultChecked 
                        />
                        <Label htmlFor="date-international" className="ml-2 text-gray-700 dark:text-gray-300">
                          International (DD/MM/YYYY)
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="date-us" 
                          name="dateFormat" 
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500" 
                        />
                        <Label htmlFor="date-us" className="ml-2 text-gray-700 dark:text-gray-300">
                          US (MM/DD/YYYY)
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="date-iso" 
                          name="dateFormat" 
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500" 
                        />
                        <Label htmlFor="date-iso" className="ml-2 text-gray-700 dark:text-gray-300">
                          ISO (YYYY-MM-DD)
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white">
                    Save Language Settings
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
