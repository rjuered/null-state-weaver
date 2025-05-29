
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/context";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, language, switchLanguage } = useUser();
  const { toast } = useToast();
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

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Profile Settings", "إعدادات الملف الشخصي")}</CardTitle>
          <CardDescription>
            {t("Manage your account information and preferences.", "إدارة معلومات حسابك وتفضيلاتك.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">{t("Email", "البريد الإلكتروني")}</Label>
              <Input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="name">{t("Full Name", "الاسم الكامل")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t("Enter your full name", "أدخل اسمك الكامل")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="company">{t("Company (Optional)", "الشركة (اختياري)")}</Label>
            <Input
              id="company"
              type="text"
              placeholder={t("Enter your company name", "أدخل اسم شركتك")}
            />
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>{t("App Preferences", "تفضيلات التطبيق")}</CardTitle>
          <CardDescription>
            {t("Customize your app experience.", "تخصيص تجربة التطبيق الخاصة بك.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="language">{t("Language", "اللغة")}</Label>
              <p className="text-sm text-gray-600">
                {t("Switch between English and Arabic", "التبديل بين الإنجليزية والعربية")}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">EN</span>
              <Switch
                id="language"
                checked={language === "ar"}
                onCheckedChange={handleLanguageToggle}
              />
              <span className="text-sm">AR</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode">{t("Dark Mode", "الوضع المظلم")}</Label>
              <p className="text-sm text-gray-600">
                {t("Switch to dark theme for better night viewing", "التبديل إلى المظهر المظلم لرؤية أفضل ليلاً")}
              </p>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications">{t("Push Notifications", "الإشعارات")}</Label>
              <p className="text-sm text-gray-600">
                {t("Receive notifications about your QR codes", "تلقي إشعارات حول رموز QR الخاصة بك")}
              </p>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-updates">{t("Email Updates", "تحديثات البريد الإلكتروني")}</Label>
              <p className="text-sm text-gray-600">
                {t("Receive product updates and news via email", "تلقي تحديثات المنتج والأخبار عبر البريد الإلكتروني")}
              </p>
            </div>
            <Switch
              id="email-updates"
              checked={emailUpdates}
              onCheckedChange={setEmailUpdates}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card>
        <CardHeader>
          <CardTitle>{t("Privacy & Security", "الخصوصية والأمان")}</CardTitle>
          <CardDescription>
            {t("Manage your privacy and security settings.", "إدارة إعدادات الخصوصية والأمان الخاصة بك.")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            {t("Change Password", "تغيير كلمة المرور")}
          </Button>
          <Button variant="outline" className="w-full">
            {t("Download My Data", "تنزيل بياناتي")}
          </Button>
          <Button variant="destructive" className="w-full">
            {t("Delete Account", "حذف الحساب")}
          </Button>
        </CardContent>
      </Card>

      {/* Save Changes Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveChanges} className="bg-qrito-purple hover:bg-qrito-purple-dark">
          {t("Save Changes", "حفظ التغييرات")}
        </Button>
      </div>
    </div>
  );
};

export default Settings;
