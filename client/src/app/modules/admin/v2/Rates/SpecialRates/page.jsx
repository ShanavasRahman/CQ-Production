import React, { useContext, useState } from 'react';
import Layout from '../../layout/page';
import { FaStar } from 'react-icons/fa';  // Importing an icon for Special Rates
import adminContext from '../../../../../../context/page';

const SpecialRatePage = () => {
    const {adminDetails} = useContext(adminContext)
    // Dummy data
    const dummySpecialRates = [
        { countryCode: '+77', country: 'USA', qualityDescription: 'USA modified Display', rate: 0.10, status: 'Active', profile: 'IVR' },
        { countryCode: '+99', country: 'Canada', qualityDescription: 'Canand Correct Display', rate: 0.12, status: 'Active', profile: 'Outbound' },
        { countryCode: '89', country: 'UK', qualityDescription: 'Uk Landline ', rate: 0.08, status: 'Inactive', profile: 'IVR' }
    ];

    const [specialRates, setSpecialRates] = useState(dummySpecialRates);

    const deleteSpecialRate = (rate) => {
        setSpecialRates(specialRates.filter(r => r !== rate));
    };

    const addSpecialRate = () => {
        const newRate = {
            countryCode: 'IN',
            country: 'India',
            qualityDescription: 'High',
            rate: 0.09,
            status: 'Active',
            profile: 'Outbound'
        };
        setSpecialRates([...specialRates, newRate]);
    };

    return (
        <Layout>
            <div className="p-6 text-gray-900">
                <h2 className="text-xl font-bold flex items-center">
                    {/* <FaStar className="text-yellow-500 mr-2" /> */}
                    SPECIAL RATES
                </h2>

                {/* Add Rate Button */}
               
                {/* Special Rates Table */}
                <div className="mt-6 overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead className="bg-[#005F73] text-white text-left">
                            <tr>
                                <th className="p-2">Country Code</th>
                                <th className="p-2">Country</th>
                                <th className="p-2 ">Quality Description</th>
                                <th className="p-2">Rate</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Profile</th>
                                {['superAdmin', "account"].includes(adminDetails.role) && (
                                <th className="p-2">Action</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {specialRates.map((rate, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}  // Alternating colors
                                >
                                    <td className="p-2">{rate.countryCode}</td>
                                    <td className="p-2">{rate.country}</td>
                                    <td className="p-2">{rate.qualityDescription}</td>
                                    <td className="p-2">${rate.rate}</td>
                                    <td className="p-2">
                                        <span className={`text-${rate.status === 'Active' ? 'green' : 'red'}-600`}>
                                            {rate.status}
                                        </span>
                                    </td>
                                    <td className="p-2">{rate.profile}</td>
                                    {['superAdmin', "account"].includes(adminDetails.role) && (
                                    <td className="p-2 flex space-x-2">
                                        <button
                                            onClick={() => deleteSpecialRate(rate)}
                                            className="px-4 py-2 bg-red-500 text-white rounded"
                                        >
                                         Remove
                                        </button>
                                    </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default SpecialRatePage;