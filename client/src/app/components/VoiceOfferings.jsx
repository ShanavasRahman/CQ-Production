import React from "react";
import styles from "./VoiceOfferings.module.css";

const VoiceOfferings = () => {
  const offerings = [
    {
      icon: "/services/QuickSettings.png",
      subtitle: "Quick Setup",
    },
    {
      icon: "/services/QuickLive.png",
      subtitle: "Quick Live in 10 minutes",
    },
    {
      icon: "/services/Payments.png",
      subtitle: "Multiple Payment Option",
    },
    {
      icon: "/services/Freecredit.png",
      subtitle: "Free $2 Credit",
    },
    {
      icon: "/services/No Balance Limit.png",
      subtitle: "No Balance Limit",
    },
    {
      icon: "/services/Helpdesk.png",
      subtitle: "24/7 Helpdesk",
    },
  ];

  return (
    <div className={styles.voiceOfferingsContainer}>
      <section className={styles.voiceOfferings}>
        <div className={styles.offeringsGrid}>
          {offerings.map((offering, index) => (
            <div key={index} className={styles.offeringItem}>
              {offering.icon && (
                <img
                  src={offering.icon}
                  alt={`Offering ${index + 1} - ${offering.subtitle}`} // Fixed alt text interpolation
                  className={styles.offeringIcon}
                  width={122} // Adjust width as needed
                  height={122} // Adjust height as needed
                />
              )}
              {offering.subtitle && (
                <p className={styles.offeringSubtitle}>{offering.subtitle}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VoiceOfferings;
