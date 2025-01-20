import React, { useState } from 'react';
import Layout from '../../layout/page';

const TargetedRatePage = () => {
    const [showCLI, setShowCLI] = useState(true);  // Toggle state between CLI and CC Rates

    // Dummy data for CLI Rates with Country Code
    const dummyCLIRates = [
        { countryCode: 'US', country: 'USA', qualityDescription: 'USA Modified Display', rtp: 95, asr: 90, acd: 3, rate: 0.10, lcr: 0.05, hcr: 0.12 },
        { countryCode: 'CA', country: 'Canada', qualityDescription: 'Canada Correct Display', rtp: 92, asr: 85, acd: 5, rate: 0.12, lcr: 0.06, hcr: 0.14 },
    ];

    // Updated Dummy data for CC Rates with Country Code, LCR, and HCR rates
    const dummyCCRates = [
        { countryCode: 'US', country: 'USA', qualityDescription: 'USA Modified Display', rate: 0.10, status: 'Active', profile: 'IVR', lcr: 0.05, hcr: 0.12 },
        { countryCode: 'CA', country: 'Canada', qualityDescription: 'USA Modified Display', rate: 0.12, status: 'Inactive', profile: 'OUTBOND', lcr: 0.06, hcr: 0.14 },
    ];

    return (
        <Layout>
            <div className="p-6 text-gray-900">
                <h2 className="text-xl font-bold flex items-center">
                    TARGETED RATES
                </h2>

                {/* Tab Buttons */}
                <div className="mt-4 flex space-x-4">
                    <button
                        onClick={() => setShowCLI(true)}
                        className={`px-4 py-2 ${showCLI ? 'bg-orange-500 text-white' : 'bg-orange-500'}`}
                    >
                        CLI Rates
                    </button>
                    <button
                        onClick={() => setShowCLI(false)}
                        className={`px-4 py-2 ${!showCLI ? 'bg-green-500 text-white' : 'bg-green-500'}`}
                    >
                        CC Rates
                    </button>
                </div>

                {/* Display CLI Rates Table */}
                {showCLI && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-[#005F73] text-white">
                                <tr>
                                    <th className="p-2 text-center">Country Code</th>
                                    <th className="p-2 text-center">Country</th>
                                    <th className="p-2 text-center">Quality Description</th>
                                    <th className="p-2 text-center">RTP</th>
                                    <th className="p-2 text-center">ASR</th>
                                    <th className="p-2 text-center">ACD</th>
                                    <th className="p-2 text-center">Rate ($)</th>
                                    <th className="p-2 text-center">Target LCR</th>
                                    <th className="p-2 text-center">Target HCR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyCLIRates.map((rate, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="p-2 text-center">{rate.countryCode}</td>
                                        <td className="p-2 text-center">{rate.country}</td>
                                        <td className="p-2 text-center">{rate.qualityDescription}</td>
                                        <td className="p-2 text-center">{rate.rtp}</td>
                                        <td className="p-2 text-center">{rate.asr}</td>
                                        <td className="p-2 text-center">{rate.acd}</td>
                                        <td className="p-2 text-center">${rate.rate}</td>
                                        <td className="p-2 text-center">{rate.lcr}</td>
                                        <td className="p-2 text-center">{rate.hcr}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Display CC Rates Table */}
                {!showCLI && (
                    <div className="mt-6 overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-[#005F73] text-white">
                                <tr>
                                    <th className="p-2 text-center">Country Code</th>
                                    <th className="p-2 text-center">Country</th>
                                    <th className="p-2 text-center">Quality Description</th>
                                    <th className="p-2 text-center">Rate</th>
                                    <th className="p-2 text-center">Status</th>
                                    <th className="p-2 text-center">Profile</th>
                                    <th className="p-2 text-center">Target LCR</th>
                                    <th className="p-2 text-center">Target HCR</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyCCRates.map((rate, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                        <td className="p-2 text-center">{rate.countryCode}</td>
                                        <td className="p-2 text-center">{rate.country}</td>
                                        <td className="p-2 text-center">{rate.qualityDescription}</td>
                                        <td className="p-2 text-center">${rate.rate}</td>
                                        <td className="p-2 text-center">{rate.status}</td>
                                        <td className="p-2 text-center">{rate.profile}</td>
                                        <td className="p-2 text-center">{rate.lcr}</td>
                                        <td className="p-2 text-center">{rate.hcr}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default TargetedRatePage;