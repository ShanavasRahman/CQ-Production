import React from "react";
import styles from "./TickerImages.module.css";

const TickerImages = ({ images }) => {
  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.ticker}>
        {/* First set of images */}
        {images.map((image, index) => (
          <div key={index} className={styles.imageContainer}>
            &nbsp; &nbsp;
            <img
              src={image}
              alt={`Image ${index + 1}`} // Fixed string interpolation for alt
              className={styles.image}
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
            />
          </div>
        ))}

        {/* Second set of images (duplicate) */}
        {images.map((image, index) => (
          <div key={`duplicate-${index}`} className={styles.imageContainer}>
            &nbsp; &nbsp;
            <img
              src={image}
              alt={`Image ${index + 1}`} // Fixed string interpolation for alt
              className={styles.image}
              width={200} // Adjust width as needed
              height={200} // Adjust height as needed
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerImages;
