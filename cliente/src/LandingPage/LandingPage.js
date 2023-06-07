import React from "react";
import "./LandingPage.css";
import HeroSection from "./HeroSection";
import TwoColumnSection from "./TwoColumnSection";
import TwoColumnSectionMap from "./TwoColumnSectionMap";
import Footer from "./Footer";
import HeaderLandingPage from "./Header/HeaderLandingPage";

const LandingPage = () => {
  return (
    <div>
      <div className="landing-page">
        <HeaderLandingPage />
        <HeroSection />
        <TwoColumnSection />
        <TwoColumnSectionMap />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
