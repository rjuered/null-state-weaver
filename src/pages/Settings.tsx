
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Settings from "@/components/Settings";

const SettingsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Settings />
      </div>
      <Footer />
    </div>
  );
};

export default SettingsPage;
