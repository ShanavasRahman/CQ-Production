import React from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import VoIPRatesTable from "../components/RatesTable";
import CustomizedQuotesForm from "../components/DIDQuotation";

const VoIPRates = () => {
  return (
    <>
      <Header />
      <div style={{ overflow: 'hidden' }}>
        <VoIPRatesTable />
        <CustomizedQuotesForm />
      </div>
      <Footer />
    </>
  );
};

export default VoIPRates;