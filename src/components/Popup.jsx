import React, { useState, useEffect } from 'react';


<<<<<<< Updated upstream
export function Popup({ message, showPopup, isWarning }) {
=======
export function Popup({ message, showPopup }) {
>>>>>>> Stashed changes
  const [isVisible, setIsVisible] = useState(showPopup);

  useEffect(() => {
    if (showPopup) {
      setIsVisible(showPopup); 
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Popup will disappear after 3 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [showPopup]);

  return (
    <>
      {showPopup && (
<<<<<<< Updated upstream
        <div className={`fixed top-5 z-50 right-5 p-4 ${isWarning? 'bg-red-600' : 'bg-green-500'} text-white rounded-lg shadow-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
=======
        <div className={`fixed top-5 z-50 right-5 p-4 bg-black text-white rounded-lg shadow-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
>>>>>>> Stashed changes
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

