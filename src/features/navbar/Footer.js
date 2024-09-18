import React from "react";

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="flex justify-center items-center border-y border-white py-3">
          <a href="#" className="text-xl hover:text-gray-300">Back to Top</a>
        </div>
  
        <div className="text-white px-2 py-4 sm:px-4 flex flex-col sm:flex-row  justify-center">
          <div className="flex text-wrap text-xs sm:text-md justify-around gap-2 sm:gap-20 sm:flex-row sm:space-x-8">
            <nav>
              <h3 className="sm:text-lg font-bold mb-2">Get to Know Us</h3>
              <ul className="list-none sm:space-y-2">
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">About Shop-in</a></li>
                <li><a href="#">Investor</a></li>
                <li><a href="#">Shop-in Devices</a></li>
                <li><a href="#">Shop-in Science</a></li>
              </ul>
            </nav>
            <nav>
              <h3 className="sm:text-lg font-bold mb-2">Make Money with Us</h3>
              <ul className="list-none sm:space-y-2">
                <li><a href="#">Sell on Shop-in</a></li>
                <li><a href="#">Sell under Shop-in Accelerator</a></li>
                <li><a href="#">Protect and Build Your Brand</a></li>
                <li><a href="#">Shop-in Global Selling</a></li>
                <li><a href="#">Become an Affiliate</a></li>
                <li><a href="#">Fulfilment by Shop-in</a></li>
                <li><a href="#">Advertise Your Products</a></li>
                <li><a href="#">Shop-in Pay on Merchants</a></li>
              </ul>
            </nav>
            <nav>
              <h3 className="sm:text-lg font-bold mb-2">Let Us Help You</h3>
              <ul className="list-none sm:space-y-2">
                <li><a href="#">COVID-19 and Shop-in</a></li>
                <li><a href="#">Your Account</a></li>
                <li><a href="#">Returns Centre</a></li>
                <li><a href="#">100% Purchase Protection</a></li>
                <li><a href="#">Shop-in App Download</a></li>
                <li><a href="#">Help</a></li>
              </ul>
            </nav>
          </div>
        </div>
            
        <nav className=''>
              <h3 className="sm:text-lg font-bold mb-2 text-center mt-4">Connect with Us</h3>
              <ul className="list-none flex justify-center items-center gap-5 mb-2">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
        </nav>
          <div className="text-sm py-4 bg-black w-full flex justify-center items-center">
          <img src="/Shop-in-logo.png" alt="Shop-in" className="h-20 w-20 rounded-lg mr-2" />
            <p className="text-gray-400">&copy; 1996—2023, Shop-in, Inc. or its affiliates</p>
        </div>
      </footer>
    );
  };