import { useEffect } from 'react';

const useThemeFavicon = () => {
  useEffect(() => {
    const updateFavicon = (e) => {
      const favicon = document.querySelector('link[rel="icon"]');
      if (!favicon) return;

      if (e.matches) {
        // Dark mode: change favicon to dark mode version
        favicon.href = '/tecora-dark.svg';
      } else {
        // Light mode: change favicon to light mode version
        favicon.href = '/tecora-light.svg';
      }
    };

    // Detect the initial theme and update the favicon
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(mediaQuery);  // Set initial favicon based on current theme

    // Listen for changes in the system theme
    mediaQuery.addEventListener('change', updateFavicon);

    // Cleanup listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change', updateFavicon);
    };
  }, []);
};

export default useThemeFavicon;
