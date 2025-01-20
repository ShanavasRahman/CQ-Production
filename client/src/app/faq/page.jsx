import React from "react";
import FAQ from "../components/FAQ";
import CustomizedQuotesForm from "../components/DIDQuotation";
import Header from "../components/Header";
import Footer from "../components/Footer";

const image1 = "/Banner/FAQ.png"; // Static image path

const FAQPage = () => {
  return (
    <>
      <Header />
      <div>
        {/* Banner Image */}
        <div className="w-full mt-16">
          <img
            src={image1}
            alt="FAQ Banner"
            className="w-full h-auto object-contain"
            width={1200} // Adjust width as needed
            height={400} // Adjust height as needed
          />
        </div>

        {/* FAQ Component */}
        <FAQ />
        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
