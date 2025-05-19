import React, { useEffect } from 'react';

const ScrollToTopOnLoad = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return null;
};

export default ScrollToTopOnLoad;
