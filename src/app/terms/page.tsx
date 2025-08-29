export const metadata = {
  title: 'Terms of Use | Frogmates',
  description: 'Terms of Use for Frogmates Telegram Web App',
};

export default function Terms() {
  return (
    <div className="bg-black min-h-screen text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">Terms of Use</h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-2">
              By accessing or using the Frogmates Telegram Web App ("the App"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-gray-300 mb-2">
              Frogmates is a Telegram Web App that allows users to connect with other users, participate in a referral program, and connect cryptocurrency wallets through TON Connect.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">3. Registration and Account</h2>
            <p className="text-gray-300 mb-2">
              To use certain features of the App, you must authenticate through Telegram. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">4. Referral Program</h2>
            <p className="text-gray-300 mb-2">
              The App offers a referral program where users can invite friends and earn rewards. The following rules apply:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Each user receives a unique referral link that can be shared with others</li>
              <li>When a new user joins through your referral link, you receive rewards in the form of stars</li>
              <li>Abuse of the referral system, including but not limited to creating multiple accounts, is prohibited</li>
              <li>The App may detect and flag accounts suspected of abuse</li>
              <li>Referral rewards may be modified or revoked at the discretion of the administrators</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">5. Prohibited Activities</h2>
            <p className="text-gray-300 mb-2">
              Users are prohibited from:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Creating multiple accounts to abuse the referral system</li>
              <li>Using automated systems, bots, or scripts to interact with the App</li>
              <li>Attempting to bypass security measures or access unauthorized areas</li>
              <li>Engaging in any activity that disrupts or interferes with the App's functionality</li>
              <li>Sharing misleading or false information through the App</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-300 mb-2">
              All content, features, and functionality of the App, including but not limited to text, graphics, logos, icons, and software, are the exclusive property of Frogmates and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">7. Termination</h2>
            <p className="text-gray-300 mb-2">
              We reserve the right to terminate or suspend your account and access to the App at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-gray-300 mb-2">
              The App is provided "as is" and "as available" without any warranties of any kind, either express or implied. We do not warrant that the App will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-300 mb-2">
              In no event shall Frogmates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <p className="text-gray-300 mb-2">
              We reserve the right to modify or replace these Terms of Use at any time. Your continued use of the App after any such changes constitutes your acceptance of the new Terms of Use.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4">11. Contact Information</h2>
            <p className="text-gray-300 mb-2">
              If you have any questions about these Terms of Use, please contact us through our Telegram channel at <a href="https://t.me/frogmatesteam" className="text-blue-400 hover:underline">https://t.me/frogmatesteam</a>.
            </p>
          </section>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-gray-400 text-sm">
            Last updated: August 29, 2025
          </p>
        </div>
      </div>
    </div>
  );
}