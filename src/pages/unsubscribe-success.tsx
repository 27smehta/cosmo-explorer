import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

const UnsubscribeSuccess: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Successfully Unsubscribed
          </h1>
          <p className="text-gray-300 mb-6">
            You have been successfully unsubscribed from our newsletter. We're sorry to see you go!
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default UnsubscribeSuccess; 