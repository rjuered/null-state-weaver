
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/context";
import { useToast } from "@/hooks/use-toast";
import { User, Bell, Palette, Globe, Sun, Moon, Settings as SettingsIcon, Shield, Eye, Mail, Phone } from "lucide-react";

const Settings = () => {
  const { user, language, switchLanguage } = useUser();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("profile");
  
  // Profile states
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState(user?.email || "watekon627@nutrv.com");
  const [company, setCompany] = useState("My Company");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  
  // Notification states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [qrCreationAlerts, setQrCreationAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  
  // Appearance states
  const [themeMode, setThemeMode] = useState("light");
  const [colorScheme, setColorScheme] = useState("purple");
  const [layoutDensity, setLayoutDensity] = useState("comfortable");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  const handleLanguageToggle = () => {
    const newLang = language === "en" ? "ar" : "en";
    switchLanguage(newLang);
    toast({
      title: language === "en" ? "Language Changed" : "تم تغيير اللغة",
      description: language === "en" ? "Language switched to Arabic" : "Language switched to English",
    });
  };

  const sidebarItems = [
    { id: "profile", label: t("Profile", "الملف الشخصي"), icon: User, description: t("Personal information", "المعلومات الشخصية") },
    { id: "notifications", label: t("Notifications", "الإشعارات"), icon: Bell, description: t("Alert preferences", "تفضيلات التنبيهات") },
    { id: "appearance", label: t("Appearance", "المظهر"), icon: Palette, description: t("Theme & layout", "المظهر والتخطيط") },
  ];

  const renderProfileSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("Profile Settings", "إعدادات الملف الشخصي")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("Manage your personal information and account details", "إدارة معلوماتك الشخصية وتفاصيل حسابك")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {t("Personal Information", "المعلومات الشخصية")}
          </CardTitle>
          <CardDescription>
            {t("Update your personal details and contact information", "تحديث بياناتك الشخصية ومعلومات الاتصال")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullname">{t("Full Name", "الاسم الكامل")}</Label>
              <Input
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("Enter your full name", "أدخل اسمك الكامل")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{t("Company", "الشركة")}</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder={t("Enter company name", "أدخل اسم الشركة")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t("Email Address", "البريد الإلكتروني")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{t("Phone Number", "رقم الهاتف")}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("Enter phone number", "أدخل رقم الهاتف")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">{t("Bio", "نبذة شخصية")}</Label>
            <Input
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={t("Tell us about yourself", "أخبرنا عن نفسك")}
            />
          </div>

          <Button onClick={handleSaveProfile} className="w-full bg-purple-600 hover:bg-purple-700">
            {t("Save Changes", "حفظ التغييرات")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t("Security", "الأمان")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            {t("Change Password", "تغيير كلمة المرور")}
          </Button>
          <Button variant="outline" className="w-full">
            {t("Enable Two-Factor Authentication", "تفعيل المصادقة الثنائية")}
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">
            {t("Danger Zone", "منطقة الخطر")}
          </CardTitle>
          <CardDescription>
            {t("Irreversible and destructive actions", "إجراءات لا يمكن التراجع عنها ومدمرة")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="w-full">
            {t("Delete Account", "حذف الحساب")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("Notification Settings", "إعدادات الإشعارات")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("Manage how and when you receive notifications", "إدارة كيفية ووقت تلقي الإشعارات")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t("Push Notifications", "الإشعارات الفورية")}
          </CardTitle>
          <CardDescription>
            {t("Receive real-time notifications on your device", "تلقي إشعارات فورية على جهازك")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Enable Push Notifications", "تفعيل الإشعارات الفورية")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Get notified about important updates", "تلقي إشعارات حول التحديثات المهمة")}
              </p>
            </div>
            <Switch
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("QR Code Creation Alerts", "تنبيهات إنشاء رمز QR")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Get notified when QR codes are created", "تلقي إشعارات عند إنشاء رموز QR")}
              </p>
            </div>
            <Switch
              checked={qrCreationAlerts}
              onCheckedChange={setQrCreationAlerts}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Security Alerts", "تنبيهات الأمان")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Important security notifications", "إشعارات الأمان المهمة")}
              </p>
            </div>
            <Switch
              checked={securityAlerts}
              onCheckedChange={setSecurityAlerts}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t("Email Notifications", "إشعارات البريد الإلكتروني")}
          </CardTitle>
          <CardDescription>
            {t("Control what emails you receive from us", "تحكم في رسائل البريد الإلكتروني التي تتلقاها منا")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Email Notifications", "إشعارات البريد الإلكتروني")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Receive notifications via email", "تلقي الإشعارات عبر البريد الإلكتروني")}
              </p>
            </div>
            <Switch
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Marketing Emails", "رسائل تسويقية")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Receive promotional content and offers", "تلقي المحتوى الترويجي والعروض")}
              </p>
            </div>
            <Switch
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Weekly Digest", "الملخص الأسبوعي")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Weekly summary of your activity", "ملخص أسبوعي لنشاطك")}
              </p>
            </div>
            <Switch
              checked={weeklyDigest}
              onCheckedChange={setWeeklyDigest}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveNotifications} className="bg-purple-600 hover:bg-purple-700">
          {t("Save Notification Settings", "حفظ إعدادات الإشعارات")}
        </Button>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {t("Appearance Settings", "إعدادات المظهر")}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("Customize the look and feel of your interface", "تخصيص مظهر وإحساس واجهتك")}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            {t("Theme", "المظهر")}
          </CardTitle>
          <CardDescription>
            {t("Choose your preferred color scheme", "اختر نظام الألوان المفضل لديك")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>{t("Theme Mode", "وضع المظهر")}</Label>
            <RadioGroup value={themeMode} onValueChange={setThemeMode}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  {t("Light", "فاتح")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  {t("Dark", "مظلم")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  {t("System", "النظام")}
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>{t("Color Scheme", "نظام الألوان")}</Label>
            <Select value={colorScheme} onValueChange={setColorScheme}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purple">{t("Purple", "بنفسجي")}</SelectItem>
                <SelectItem value="blue">{t("Blue", "أزرق")}</SelectItem>
                <SelectItem value="green">{t("Green", "أخضر")}</SelectItem>
                <SelectItem value="orange">{t("Orange", "برتقالي")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="space-y-3">
            <Label>{t("Layout Density", "كثافة التخطيط")}</Label>
            <Select value={layoutDensity} onValueChange={setLayoutDensity}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="compact">{t("Compact", "مضغوط")}</SelectItem>
                <SelectItem value="comfortable">{t("Comfortable", "مريح")}</SelectItem>
                <SelectItem value="spacious">{t("Spacious", "واسع")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t("Language & Region", "اللغة والمنطقة")}
          </CardTitle>
          <CardDescription>
            {t("Set your language and regional preferences", "تعيين تفضيلات اللغة والمنطقة")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>{t("Language", "اللغة")}</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t("Switch between English and Arabic", "التبديل بين الإنجليزية والعربية")}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">EN</span>
              <Switch
                checked={language === "ar"}
                onCheckedChange={handleLanguageToggle}
              />
              <span className="text-sm font-medium">AR</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveAppearance} className="bg-purple-600 hover:bg-purple-700">
          {t("Save Appearance Settings", "حفظ إعدادات المظهر")}
        </Button>
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
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6">
        {/* User Profile Header */}
        <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {fullName.charAt(0).toUpperCase()}
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
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            {t("Settings", "الإعدادات")}
          </h4>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
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
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
