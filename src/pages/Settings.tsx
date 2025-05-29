
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Settings from "@/components/Settings";

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Account Settings
            </h1>
          </div>
          <Settings />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
