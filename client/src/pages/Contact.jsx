import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Contact Us</h2>
      <p className="text-green-700 mb-8 max-w-xl text-center">
        We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
      </p>

      <form className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          rows="5"
          placeholder="Your Message"
          className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-center text-green-700">
        <p>Email: greencart@example.com</p>
        <p>Phone: +91 9876543210</p>
        <p>Address: Pune, Maharashtra, India</p>
      </div>
    </div>
  );
};

export default Contact;
