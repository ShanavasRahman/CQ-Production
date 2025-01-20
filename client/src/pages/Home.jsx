import React from "react";
import { Helmet } from "react-helmet";
import Carousel from "../app/components/Carousel";
import Services from "../app/components/Services";
import VoiceOfferings from "../app/components/VoiceOfferings";
// import Ticker from "../app/components/Ticker";
import TickerImages from "../app/components/TickerImages";
import CliVoiceTerminationSpecialComponent from "../app/components/CLISpecialComponent";
import BusinessServices from "../app/components/BusinessServices";
import BuisinessAnalitics from "../app/components/BuisinessAnalitics";
import FAQ from "../app/components/FAQ";
import FloatingButton from "../app/components/SpecialRatesPopup";
import SocialMediaTabs from "../app/components/SocialMedaPopup";
import Chatbot from "../app/chatbot/page"; 
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";
import CurrencyTicker from "../app/components/TickerCC";

const imageUrls = [
  "/flags/Austrelia.png",
  "/flags/Canada.png",
  "/flags/China.png",
  "/flags/Cuba.png",
  "/flags/France.png",
  "/flags/Germany.png",
  "/flags/Hongkong.png",
  "/flags/Italy.png",
  "/flags/Malesiya.png",
  "/flags/New Zealand.png",
  "/flags/Singapur.png",
  "/flags/Spain.png",
];

export default function HomePage() {
  return (
    <>
      <Helmet>
        <meta property="og:title" content="Cloudqlobe" />
        <meta
          property="og:description"
          content="Cloud Qlobe enables our wholesale VoIP service providers and carriers to operate from anywhere in the world."
        />
        <meta
          property="og:image"
          content="https://www.cloudqlobe.com/_next/image?url=%2Fimages%2Flogo.png&w=32&q=75"
        />
        <meta property="og:url" content="https://www.cloudqlobe.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Cloud Qlobe" />
      </Helmet>
      <div style={{ background: "white" }}>
        <Header />
        <Carousel />
        <CurrencyTicker />
        <VoiceOfferings />
        <Services />
        <BuisinessAnalitics />
        <CliVoiceTerminationSpecialComponent />
        <BusinessServices />
        <TickerImages images={imageUrls} />
        <FAQ />
        <FloatingButton />
        <SocialMediaTabs />
        <Chatbot />
        <Footer />
      </div>
    </>
  );
}
