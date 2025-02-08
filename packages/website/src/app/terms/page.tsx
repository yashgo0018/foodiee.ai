"use client";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using Foodiee.ai, you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do
              not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-600">
              Foodiee.ai is a browser extension that helps users order food from
              various delivery platforms by providing translation and dietary
              preference services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. User Accounts
            </h2>
            <p className="text-gray-600">
              To use certain features of our service, you may need to create an
              account. You are responsible for maintaining the confidentiality
              of your account information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Use of Service
            </h2>
            <p className="text-gray-600">
              You agree to use the service only for lawful purposes and in
              accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 ml-4">
              <li>Use the service for any illegal purpose</li>
              <li>
                Attempt to gain unauthorized access to any part of the service
              </li>
              <li>Interfere with or disrupt the service</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes via email or through the
              service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms, please contact us at
              support@foodiee.ai
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
