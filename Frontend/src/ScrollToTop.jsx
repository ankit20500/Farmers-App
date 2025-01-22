import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to the top only for new pages
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        // Enable scroll restoration to retain scroll position on the previous page
        window.history.scrollRestoration = 'manual';
        return () => {
            window.history.scrollRestoration = 'auto';
        };
    }, []);

    return null;
}

export default ScrollToTop;
