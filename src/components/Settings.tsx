
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUser } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Palette, Globe, Sun, Moon, Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  const { user, language, switchLanguage } = useUser();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  
  // Profile states
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState(user?.email || "watekon627@nutrv.com");
  const [company, setCompany] = useState("");
  
  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [qrCreationAlerts, setQrCreationAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  
  // Appearance states
  const [themeMode, setThemeMode] = useState("light");
  const [colorScheme, setColorScheme] = useState("purple");
  const [layoutDensity, setLayoutDensity] = useState("comfortable");
  const [enableAnimations, setEnableAnimations] = useState(true);
  
  // Language states
  const [dateFormat, setDateFormat] = useState("international");

  // Translation function
  const t = (en: string, ar: string) => {
    return language === "ar" ? ar : en;
  };

  // Apply theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeMode]);

  const handleSaveProfile = () => {
    toast({
      title: t("Profile Updated", "تم تحديث الملف الشخصي"),
      description: t("Your profile information has been saved successfully.", "تم حفظ معلومات ملفك الشخصي بنجاح."),
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: t("Notification Settings Updated", "تم تحديث إعدادات الإشعارات"),
      description: t("Your notification preferences have been saved.", "تم حفظ تفضيلات الإشعارات الخاصة بك."),
    });
  };

  const handleSaveAppearance = () => {
    toast({
      title: t("Appearance Settings Updated", "تم تحديث إعدادات المظهر"),
      description: t("Your appearance preferences have been saved.", "تم حفظ تفضيلات المظهر الخاصة بك."),
    });
  };

  const handleSaveLanguage = () => {
    toast({
      title: t("Language Settings Updated", "تم تحديث إعدادات اللغة"),
      description: t("Your language preferences have been saved.", "تم حفظ تفضيلات اللغة الخاصة بك."),
    });
  };

  const sidebarItems = [
    { id: "profile", label: t("Profile Settings", "إعدادات الملف الشخصي"), icon: User, description: t("Manage your account information", "إدارة معلومات حسابك") },
    { id: "notifications", label: t("Notifications", "الإشعارات"), icon: Bell, description: t("Manage your notification preferences", "إدارة تفضيلات الإشعارات") },
    { id: "appearance", label: t("Appearance", "المظهر"), icon: Palette, description: t("Customize your display preferences", "تخصيص تفضيلات العرض") },
    { id: "language", label: t("Language", "اللغة"), icon: Globe, description: t("Set your language preferences", "تعيين تفضيلات اللغة") },
  ];

  const renderProfileSection = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t("Profile Settings", "إعدادات الملف الشخصي")}</h2>
          <p className="text-purple-100 text-lg">{t("Manage your account information", "إدارة معلومات حسابك")}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-2xl"></div>
      </div>

      {/* Profile Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullname" className="text-gray-700 dark:text-gray-300 font-medium">
              {t("Full Name", "الاسم الكامل")}
            </Label>
            <Input
              id="fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t("Your name", "اسمك")}
              className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
              {t("Email Address", "البريد الإلكتروني")}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-gray-700 dark:text-gray-300 font-medium">
              {t("Company", "الشركة")}
            </Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={t("Your company name (optional)", "اسم شركتك (اختياري)")}
              className="transition-all duration-300 focus:scale-[1.02] focus:shadow-lg border-2 focus:border-purple-500"
            />
          </div>

          <Button 
            onClick={handleSaveProfile} 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t("Save Profile Changes", "حفظ تغييرات الملف الشخصي")}
          </Button>
        </div>
      </div>

      {/* Password Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          {t("Password", "كلمة المرور")}
        </h3>
        <Button 
          variant="outline" 
          className="w-full border-2 border-purple-200 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900 transition-all duration-300 hover:scale-105"
        >
          {t("Change Password", "تغيير كلمة المرور")}
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800 hover:shadow-xl transition-all duration-500">
        <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
          {t("Danger Zone", "منطقة الخطر")}
        </h3>
        <Button 
          variant="destructive" 
          className="hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {t("Delete Account", "حذف الحساب")}
        </Button>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t("Notifications", "الإشعارات")}</h2>
          <p className="text-purple-100 text-lg">{t("Manage your notification preferences", "إدارة تفضيلات الإشعارات")}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
        <div className="space-y-8">
          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{t("Email Notifications", "إشعارات البريد الإلكتروني")}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("Receive notifications via email", "تلقي الإشعارات عبر البريد الإلكتروني")}</p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{t("QR Creation Alerts", "تنبيهات إنشاء رمز QR")}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("Get notified when your QR codes are created", "تلقي إشعارات عند إنشاء رموز QR الخاصة بك")}</p>
            </div>
            <Switch
              checked={qrCreationAlerts}
              onCheckedChange={setQrCreationAlerts}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounde-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{t("Marketing Emails", "رسائل تسويقية")}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("Receive promotional content and offers", "تلقي المحتوى الترويجي والعروض")}</p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{t("Weekly Digest", "الملخص الأسبوعي")}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t("Weekly summary of your QR code analytics", "ملخص أسبوعي لتحليلات رمز QR الخاص بك")}</p>
            </div>
            <Switch
              checked={weeklyDigest}
              onCheckedChange={setWeeklyDigest}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </div>

        <div className="mt-8">
          <Button 
            onClick={handleSaveNotifications} 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t("Save Notification Preferences", "حفظ تفضيلات الإشعارات")}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t("Appearance", "المظهر")}</h2>
          <p className="text-purple-100 text-lg">{t("Customize your display preferences", "تخصيص تفضيلات العرض")}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Theme Mode", "وضع السمة")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div 
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                  ${themeMode === "light" 
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg scale-105" 
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow hover:scale-105"
                  }`}
                onClick={() => setThemeMode("light")}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-md mb-3">
                  <Sun className="w-6 h-6 text-yellow-500" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {t("Light", "فاتح")}
                </span>
              </div>

              <div 
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                  ${themeMode === "dark" 
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg scale-105" 
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow hover:scale-105"
                  }`}
                onClick={() => setThemeMode("dark")}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-full shadow-md mb-3">
                  <Moon className="w-6 h-6 text-gray-100" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {t("Dark", "داكن")}
                </span>
              </div>

              <div 
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
                  ${themeMode === "system" 
                    ? "border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg scale-105" 
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-300 hover:shadow hover:scale-105"
                  }`}
                onClick={() => setThemeMode("system")}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-white to-gray-900 rounded-full shadow-md mb-3">
                  <SettingsIcon className="w-6 h-6 text-gray-600" />
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {t("System", "النظام")}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Color Scheme", "نظام الألوان")}
            </h3>
            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger className="w-full border-2 focus:border-purple-500 transition-all duration-300">
                <SelectValue placeholder={t("Select color scheme", "اختر نظام الألوان")} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-2 dark:border-gray-700 shadow-xl">
                <SelectItem value="purple" className="hover:bg-purple-50 dark:hover:bg-purple-900/20">{t("Purple (Default)", "بنفسجي (افتراضي)")}</SelectItem>
                <SelectItem value="blue" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">{t("Blue", "أزرق")}</SelectItem>
                <SelectItem value="green" className="hover:bg-green-50 dark:hover:bg-green-900/20">{t("Green", "أخضر")}</SelectItem>
                <SelectItem value="orange" className="hover:bg-orange-50 dark:hover:bg-orange-900/20">{t("Orange", "برتقالي")}</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 grid grid-cols-4 gap-2">
              <div className={`h-3 rounded-full bg-purple-500 ${colorScheme === 'purple' ? 'scale-y-125 opacity-100' : 'opacity-50'} transition-all duration-500`}></div>
              <div className={`h-3 rounded-full bg-blue-500 ${colorScheme === 'blue' ? 'scale-y-125 opacity-100' : 'opacity-50'} transition-all duration-500`}></div>
              <div className={`h-3 rounded-full bg-green-500 ${colorScheme === 'green' ? 'scale-y-125 opacity-100' : 'opacity-50'} transition-all duration-500`}></div>
              <div className={`h-3 rounded-full bg-orange-500 ${colorScheme === 'orange' ? 'scale-y-125 opacity-100' : 'opacity-50'} transition-all duration-500`}></div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Layout Density", "كثافة التخطيط")}
            </h3>
            <Select value={layoutDensity} onValueChange={setLayoutDensity}>
              <SelectTrigger className="w-full border-2 focus:border-purple-500 transition-all duration-300">
                <SelectValue placeholder={t("Select layout density", "اختر كثافة التخطيط")} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-2 dark:border-gray-700 shadow-xl">
                <SelectItem value="compact" className="hover:bg-purple-50 dark:hover:bg-gray-700">{t("Compact", "مضغوط")}</SelectItem>
                <SelectItem value="comfortable" className="hover:bg-purple-50 dark:hover:bg-gray-700">{t("Comfortable", "مريح")}</SelectItem>
                <SelectItem value="spacious" className="hover:bg-purple-50 dark:hover:bg-gray-700">{t("Spacious", "واسع")}</SelectItem>
              </SelectContent>
            </Select>

            <div className="mt-4 flex items-center space-x-3">
              <div className={`h-1 flex-grow rounded-full bg-gray-300 dark:bg-gray-600 ${layoutDensity === 'compact' ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}></div>
              <div className={`h-2 flex-grow rounded-full bg-gray-400 dark:bg-gray-500 ${layoutDensity === 'comfortable' ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}></div>
              <div className={`h-3 flex-grow rounded-full bg-gray-500 dark:bg-gray-400 ${layoutDensity === 'spacious' ? 'opacity-100' : 'opacity-30'} transition-opacity duration-300`}></div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{t("Enable Animations", "تفعيل الرسوم المتحركة")}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{t("Toggle UI animations throughout the application", "تبديل الرسوم المتحركة في واجهة المستخدم في جميع أنحاء التطبيق")}</p>
              </div>
              <Switch
                checked={enableAnimations}
                onCheckedChange={setEnableAnimations}
                className="data-[state=checked]:bg-purple-600"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button 
            onClick={handleSaveAppearance} 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t("Save Appearance Settings", "حفظ إعدادات المظهر")}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">{t("Language", "اللغة")}</h2>
          <p className="text-purple-100 text-lg">{t("Set your language preferences", "تعيين تفضيلات اللغة")}</p>
        </div>
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white bg-opacity-10 rounded-full blur-xl"></div>
      </div>

      {/* Language Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Application Language", "لغة التطبيق")}
            </h3>
            <Select value={language} onValueChange={switchLanguage}>
              <SelectTrigger className="w-full border-2 focus:border-purple-500 transition-all duration-300">
                <SelectValue placeholder={t("Select language", "اختر اللغة")} />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-800 border-2 dark:border-gray-700 shadow-xl">
                <SelectItem value="en" className="hover:bg-purple-50 dark:hover:bg-gray-700">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🇬🇧</span> English
                  </div>
                </SelectItem>
                <SelectItem value="ar" className="hover:bg-purple-50 dark:hover:bg-gray-700">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">🇸🇦</span> العربية
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              {t("This will change the language throughout the entire application", "سيؤدي هذا إلى تغيير اللغة في جميع أنحاء التطبيق")}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t("Date & Time Format", "تنسيق التاريخ والوقت")}
            </h3>
            
            <RadioGroup value={dateFormat} onValueChange={setDateFormat} className="space-y-3">
              <div className={`flex items-center space-x-2 rounded-lg p-3 ${dateFormat === 'international' ? 'bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'} transition-all duration-300`}>
                <RadioGroupItem value="international" id="international" />
                <Label htmlFor="international" className="cursor-pointer flex-1">
                  {t("International (DD/MM/YYYY)", "دولي (DD/MM/YYYY)")}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t("Example", "مثال")}: 31/12/2023
                  </div>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 rounded-lg p-3 ${dateFormat === 'us' ? 'bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'} transition-all duration-300`}>
                <RadioGroupItem value="us" id="us" />
                <Label htmlFor="us" className="cursor-pointer flex-1">
                  {t("US (MM/DD/YYYY)", "أمريكي (MM/DD/YYYY)")}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t("Example", "مثال")}: 12/31/2023
                  </div>
                </Label>
              </div>
              
              <div className={`flex items-center space-x-2 rounded-lg p-3 ${dateFormat === 'iso' ? 'bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'} transition-all duration-300`}>
                <RadioGroupItem value="iso" id="iso" />
                <Label htmlFor="iso" className="cursor-pointer flex-1">
                  {t("ISO (YYYY-MM-DD)", "أيزو (YYYY-MM-DD)")}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t("Example", "مثال")}: 2023-12-31
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="mt-8">
          <Button 
            onClick={handleSaveLanguage} 
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {t("Save Language Settings", "حفظ إعدادات اللغة")}
          </Button>
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 dark:bg-gray-900" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <div className="lg:w-64 xl:w-80 bg-white dark:bg-gray-800 shadow-2xl z-10 relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent pointer-events-none"></div>
        
        <div className="p-6 relative">
          {/* User Profile Header */}
          <div className="flex items-center space-x-3 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:scale-110">
                {fullName.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {fullName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 ml-2">
              {t("Settings", "الإعدادات")}
            </h4>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg transform scale-105"
                      : "text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  {/* Animated particles effect for active item */}
                  {activeSection === item.id && (
                    <>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-white/20 rounded-full blur-sm animate-pulse"></span>
                      <span className="absolute bottom-2 left-2 w-2 h-2 bg-white/10 rounded-full blur-sm animate-ping"></span>
                      <span className="absolute top-1/2 left-1/4 w-1 h-1 bg-white/30 rounded-full animate-pulse"></span>
                    </>
                  )}
                  
                  <Icon className={`w-5 h-5 transition-colors ${
                    activeSection === item.id ? "text-white" : "text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                  }`} />
                  <div className="flex-1">
                    <span className="font-medium">{item.label}</span>
                    <p className={`text-xs mt-0.5 ${
                      activeSection === item.id ? "text-purple-100" : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  {activeSection === item.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </nav>
          
          {/* Settings footer */}
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{t("App Version", "إصدار التطبيق")}</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
