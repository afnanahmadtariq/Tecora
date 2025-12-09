import React, { useState, useEffect } from 'react';

export function Popup({ message, showPopup, isWarning }) {
  const [isVisible, setIsVisible] = useState(showPopup);

  useEffect(() => {
    if (showPopup) {
      setIsVisible(showPopup); 
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // Popup will disappear after 1 seconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [showPopup]);

  return (
    <>
      {showPopup && (
        <div className={`fixed top-15 z-[200] right-5 p-4 ${isWarning? 'bg-red-600' : 'bg-green-500'} text-white rounded-lg shadow-lg transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

