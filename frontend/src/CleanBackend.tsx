import { useEffect } from 'react';

const CleanBackend = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            navigator.sendBeacon('https://localhost:5001/network/cleanup', JSON.stringify({}));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return null; // You can choose to return some JSX or nothing
};

export default CleanBackend;
