import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-8">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold mb-2">MNC Food Delight</h2>
                        <p>Your go-to place for delicious and quick food delivery!</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Explore</h3>
                        <ul>
                            <li className="mb-2"><a href="/">Home</a></li>
                            <li className="mb-2"><a href="/menu">Menu</a></li>
                            <li className="mb-2"><a href="/order">Order Now</a></li>
                            <li className="mb-2"><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
                        <p>Follow us on social media for updates and promotions!</p>
                        <div className="flex mt-2">
                            <a href="#" className="mr-4">Facebook</a>
                            <a href="#">Twitter</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-600 pt-4 text-center">
                <p>&copy; 2023 Food Delight. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
