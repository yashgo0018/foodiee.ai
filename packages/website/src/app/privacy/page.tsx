"use client";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 ml-4">
              <li>Account information (email, name)</li>
              <li>Dietary preferences</li>
              <li>Order history</li>
              <li>Usage data from our extension</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600">
              We use the collected information to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 ml-4">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Process your orders</li>
              <li>Communicate with you about our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Data Security
            </h2>
            <p className="text-gray-600">
              We implement appropriate security measures to protect your
              personal information. However, no method of transmission over the
              Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Data Sharing
            </h2>
            <p className="text-gray-600">
              We do not sell your personal information. We may share your
              information with:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-600 ml-4">
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Third parties with your consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600">You have the right to:</p>
            <ul className="list-disc list-inside mt-2 text-gray-600 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy, please
              contact us at privacy@foodiee.ai
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Updates to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the effective date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
