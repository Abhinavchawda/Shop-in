import React from 'react';
import { Navigate } from 'react-router-dom';

const About = () => {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-gray-700 mb-4">
        Welcome to <strong>Shop-in</strong>, your number one source for all shoppings. We're dedicated to giving you the very best user experience, with a focus on quality, customer service, and uniqueness.
      </p>
      <p className="text-gray-700 mb-4">
        Founded in 2023 by Abhinav Chawda, Shop-in has come a long way from its beginnings in 2023. When Abhinav Chawda first started out, his passion for software development drove them to make this platform, and gave them the impetus to turn hard work and inspiration into a booming online store. We now serve customers all over the Globe, and are thrilled to be a part of the e-commerce industry.
      </p>
      <p className="text-gray-700 mb-4">
        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
      </p>
      <p className="text-gray-700 mb-4">
        Sincerely,<br />
        Shop-in Team
      </p>
      <div className="mt-8 text-center">
        {/* <Navigate to="/contact" className="text-blue-500 hover:underline">Contact Us</Navigate> */}
      </div>
    </div>
  );
};

export default About;
