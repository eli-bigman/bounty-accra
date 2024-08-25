import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-4 text-center" style={{ position: 'fixed', left: 0, bottom: 0, width: '100%' }}>
            <p>&copy; {new Date().getFullYear()} CoinApp. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
