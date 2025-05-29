
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { User, CreditCard, Bell, Palette, Globe } from "lucide-react";

const Settings = () => {
  const { user, language, switchLanguage } = useUser();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  
  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  const handleSaveChanges = () => {
    toast({
      title: t("Settings Updated", "تم تحديث الإعدادات"),
      description: t("Your settings have been saved successfully.", "تم حفظ إعداداتك بنجاح."),
    });
  };

  const handleLanguageToggle = () => {
    const newLang = language === "en" ? "ar" : "en";
    switchLanguage(newLang);
    toast({
      title: language === "en" ? "Language Changed" : "تم تغيير اللغة",
      description: language === "en" ? "Language switched to Arabic" : "Language switched to English",
    });
  };

  const sidebarItems = [
    { id: "profile", label: t("Profile", "الملف الشخصي"), icon: User },
    { id: "notifications", label: t("Notifications", "الإشعارات"), icon: Bell },
    { id: "appearance", label: t("Appearance", "المظهر"), icon: Palette },
    { id: "language", label: t("Language", "اللغة"), icon: Globe },
  ];

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">{t("Profile Settings", "إعدادات الملف الشخصي")}</h2>
        <p className="text-purple-100">{t("Manage your account information", "إدارة معلومات حسابك")}</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="fullname" className="text-sm font-medium">{t("Full Name", "الاسم الكامل")}</Label>
          <Input
            id="fullname"
            type="text"
            placeholder={t("شركتي للحلول التجارية", "My Business Solutions")}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium">{t("Email Address", "البريد الإلكتروني")}</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || "garipe3558@nutrv.com"}
            disabled
            className="mt-1 bg-gray-50 dark:bg-gray-800"
          />
        </div>

        <div>
          <Label htmlFor="company" className="text-sm font-medium">{t("Company", "الشركة")}</Label>
          <Input
            id="company"
            type="text"
            placeholder={t("Features That Make a Difference", "الميزات التي تحدث فرقاً")}
            className="mt-1"
          />
        </div>

        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
          {t("Save Profile Changes", "حفظ تغييرات الملف الشخصي")}
        </Button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">{t("Password", "كلمة المرور")}</h3>
        <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
          {t("Change Password", "تغيير كلمة المرور")}
        </Button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4 text-red-600">{t("Danger Zone", "منطقة الخطر")}</h3>
        <Button variant="destructive">
          {t("Delete Account", "حذف الحساب")}
        </Button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">{t("Notifications", "الإشعارات")}</h2>
        <p className="text-purple-100">{t("Manage your notification preferences", "إدارة تفضيلات الإشعارات")}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="push-notifications">{t("Push Notifications", "الإشعارات الفورية")}</Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("Receive notifications about your QR codes", "تلقي إشعارات حول رموز QR الخاصة بك")}
            </p>
          </div>
          <Switch
            id="push-notifications"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="email-updates">{t("Email Updates", "تحديثات البريد الإلكتروني")}</Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("Receive product updates and news via email", "تلقي تحديثات المنتج والأخبار عبر البريد الإلكتروني")}
            </p>
          </div>
          <Switch
            id="email-updates"
            checked={emailUpdates}
            onCheckedChange={setEmailUpdates}
          />
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">{t("Appearance", "المظهر")}</h2>
        <p className="text-purple-100">{t("Customize your app experience", "تخصيص تجربة التطبيق")}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="dark-mode">{t("Dark Mode", "الوضع المظلم")}</Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("Switch to dark theme for better night viewing", "التبديل إلى المظهر المظلم لرؤية أفضل ليلاً")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">☀️</span>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
            <span className="text-sm">🌙</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">{t("Language", "اللغة")}</h2>
        <p className="text-purple-100">{t("Choose your preferred language", "اختر لغتك المفضلة")}</p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="language-switch">{t("Language", "اللغة")}</Label>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("Switch between English and Arabic", "التبديل بين الإنجليزية والعربية")}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm">EN</span>
            <Switch
              id="language-switch"
              checked={language === "ar"}
              onCheckedChange={handleLanguageToggle}
            />
            <span className="text-sm">AR</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "appearance":
        return renderAppearanceSection();
      case "language":
        return renderLanguageSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="flex h-full" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        {/* User Profile Header */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.email?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {t("شركتي للحلول التجارية", "My Business Solutions")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user?.email || "garipe3558@nutrv.com"}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-purple-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {activeSection === item.id && (
                  <span className="ml-auto">→</span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default Settings;
