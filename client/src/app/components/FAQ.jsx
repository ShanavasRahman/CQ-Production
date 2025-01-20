import React, { useState } from "react";
import styles from "./FAQ.module.css";
import faqContent from "../../Strings/en_strings.json";

const FAQ_QA = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredFAQs = faqContent.FAQ_ITEMS.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div>
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>{faqContent.FAQ_TITLE}</h1>
      <input
        type="text"
        placeholder={faqContent.FAQ_SEARCH_PLACEHOLDER}
        className={styles.faqSearchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="bg-white shadow-md rounded-lg">
        {filteredFAQs.length === 0 ? (
          <p className="text-center p-4">No results found.</p>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <h2
                className={styles.faqQuestion}
                onClick={() => handleToggle(index)}
              >
                {faq.question}
              </h2>
              {expandedIndex === index && (
                <p className={styles.faqAnswer}>{faq.answer}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  </div>
  );
};

const FAQ = () => {
  return (
    <div className="flex  md:flex-row bg-gray-200">
      {/* Left Column */}
      <div className="md:w-1/2 flex flex-col justify-between px-8 sm:px-16">
        <div className="flex flex-1 items-center">
          <img
            src={faqContent.FAQ_IMAGE_SRC}
            alt={faqContent.FAQ_IMAGE_ALT}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2 mt-10">
        <FAQ_QA />
      </div>
    </div>
  );
};

export default FAQ;
