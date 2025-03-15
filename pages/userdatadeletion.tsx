"use client";

import React from 'react';

export default function UserDataDeletion() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">User Data Deletion Policy</h1>
      <p>
        At Epic Escape Tours, we respect your right to privacy and provide you with the ability to delete your personal
        data upon request. This policy outlines the steps required to request data deletion.
      </p>
      <h2 className="text-xl font-semibold mt-6">1. How to Request Data Deletion</h2>
      <p>
        To request the deletion of your personal data, please send an email to{' '}
        <a
          href="mailto:support@epicescapetours.com"
          className="text-primary-600 hover:underline"
        >
          support@epicescapetours.com
        </a>{' '}
        with the subject line &apos;Data Deletion Request.&apos; Include your full name, email address, and any relevant booking
        details to help us process your request efficiently.
      </p>
      <h2 className="text-xl font-semibold mt-6">2. Processing Time</h2>
      <p>
        We aim to respond to all data deletion requests within 14 business days. Please note that certain legal
        obligations may require us to retain some data for a defined period.
      </p>
      <h2 className="text-xl font-semibold mt-6">3. Contact Us</h2>
      <p>
        If you have any questions about our data deletion policy, feel free to contact us at the email provided above.
      </p>
    </div>
  );
}
