import React, { useState, useEffect, useRef } from "react";
import { ArrowUpIcon, ArrowDownIcon, Globe } from "lucide-react";
import axios from "axios";

const CurrencyTicker = () => {
    const [tickerData, setTickerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const containerRef = useRef(null);
    const [cloneCount, setCloneCount] = useState(2);
    // console.log(tickerData);

    useEffect(() => {
        if (tickerData?.length > 0) {
            setCloneCount(tickerData.length * 2); // Example: Adjust clone count based on data length
        }
    }, [tickerData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Start loading

                // Fetch CCRatesTicker data
                const cctResponse = await axios.get("https://backend.cloudqlobe.com/v3/api/cct");
                if (cctResponse.status !== 200) throw new Error("Failed to fetch rate IDs");

                const cctData = cctResponse.data;

                // Extract unique rate IDs
                const uniqueRateIds = [...new Set(cctData.map((item) => item.rateids))];

                // Fetch rates for all unique IDs
                const rateResponses = await Promise.all(
                    uniqueRateIds.map((id) =>
                        axios.get(`https://backend.cloudqlobe.com/v3/api/rates/${id}`).then((res) => res.data)
                    )
                );
                console.log(rateResponses);

                // Normalize data format
                const normalizedRates = rateResponses.map((response) =>
                    response.rate ? response.rate : response
                );

                // Group data by countryCode
                const groupedData = normalizedRates.reduce((acc, item) => {
                    const { countryCode, country, status, currency = 'USD', profile, rate } = item;

                    if (!acc[countryCode]) {
                        acc[countryCode] = {
                            country,
                            countryCode,
                            status,
                            currency,
                            profile: {
                                Outbound: null,
                                IVR: null,
                            },
                        };
                    }

                    // Add profile data (Outbound or IVR)
                    if (profile === 'Outbound') {
                        acc[countryCode].profile.Outbound = rate;
                    } else if (profile === 'IVR') {
                        acc[countryCode].profile.IVR = rate;
                    }

                    return acc;
                }, {});

                // Convert grouped data to an array and set it to state
                setTickerData(Object.values(groupedData));
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchData();
    }, []);
    console.log(tickerData);



    useEffect(() => {
        if (!loading && tickerData.length > 0) {
            const calculateCloneCount = () => {
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const cardWidth = 280;
                const visibleCards = Math.ceil(containerWidth / cardWidth);
                return Math.max(2, Math.ceil(visibleCards / tickerData.length) + 1);
            };

            const updateCloneCount = () => {
                setCloneCount(calculateCloneCount());
            };

            updateCloneCount();
            window.addEventListener('resize', updateCloneCount);
            return () => window.removeEventListener('resize', updateCloneCount);
        }
    }, [loading, tickerData]);

    const RateCard = ({ data }) => (
        <div className="rate-card flex-shrink-0 bg-white rounded-lg shadow-md p-4 mx-2 min-w-[200px] border border-orange-100">
            <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-base font-bold text-gray-800">{data.country}</h2>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium 
    ${data.status?.toLowerCase() === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'}`}
                    >
                        {data?.status?.charAt(0)?.toUpperCase() + data.status?.slice(1)}
                    </span>

                </div>
                <div className="space-y-1.5">
                    <div className="flex justify-between items-center bg-orange-50/50 rounded-md p-1.5">
                        <span className="text-sm text-gray-600">Outbound</span>
                        <span className="font-medium flex items-center text-sm">
                            {data.profile?.Outbound ? data.profile?.Outbound : 'N/A'} {data.currency || 'USD'}
                            {data.status?.toLowerCase() === 'active' && data.profile.Outbound ? (
                                <ArrowUpIcon className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-3 w-3 text-orange-500 ml-1" />
                            )}
                        </span>
                    </div>

                    <div className="flex justify-between items-center bg-orange-50/50 rounded-md p-1.5">
                        <span className="text-sm text-gray-600">IVR</span>
                        <span className="font-medium flex items-center text-sm">
                            {data.profile?.IVR ? data.profile?.IVR : 'N/A'} {data.currency || 'USD'}
                            {data.status?.toLowerCase() === 'active' && data.profile.IVR ? (
                                <ArrowUpIcon className="h-3 w-3 text-green-500 ml-1" />
                            ) : (
                                <ArrowDownIcon className="h-3 w-3 text-orange-500 ml-1" />
                            )}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );

    if (loading) return (
        <div className="flex items-center justify-center p-6 space-x-3">
            <Globe className="animate-spin h-6 w-6 text-orange-500" />
            <span className="text-gray-600 font-medium">Loading rates...</span>
        </div>
    );

    if (error) return (
        <div className="p-4 bg-red-50 text-red-500 rounded-lg border border-red-100">
            Error: {error}
        </div>
    );

    const cardWidth = 216; // 200px + 16px margin
    const totalWidth = tickerData.length * cardWidth;

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-white" ref={containerRef}>
            <style>
                {`
          @keyframes smoothScroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${totalWidth}px); }
          }

          .ticker-content {
            animation: smoothScroll ${tickerData.length * 5}s linear infinite;
            will-change: transform;
            display: flex;
          }

          .ticker-container:hover .ticker-content {
            animation-play-state: paused;
          }

          .rate-card {
            transition: all 0.2s ease;
          }

          .rate-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px -4px rgba(255, 153, 0, 0.1);
            border-color: rgba(255, 153, 0, 0.3);
          }
        `}
            </style>

            <div className="ticker-container py-6">
                <div className="ticker-content">
                    {Array.from({ length: cloneCount }).map((_, cloneIndex) => (
                        <div key={`clone-${cloneIndex}`} className="flex">
                            {tickerData.map((data, index) => (
                                <RateCard
                                    key={`${cloneIndex}-${data._id || index}`}
                                    data={data}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CurrencyTicker;
