import React from 'react';

const Contact = () => {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-gray-700 mb-4 text-center">
        We'd love to hear from you! Please fill out the form below and we'll get in touch with you as soon as possible.
      </p>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            rows="5"
            placeholder="Your message"
          ></textarea>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Send Message
          </button>
        </div>
      </form>
      <div className="mt-8 text-center">
        <p className="text-gray-700">
          Or reach us at: <br />
          <strong>Email:</strong> support@shop-in.com <br />
          <strong>Phone:</strong> +1 (555) 123-4567
        </p>
      </div>
    </div>
  );
};

export default Contact;
