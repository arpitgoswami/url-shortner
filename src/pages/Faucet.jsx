import React, { useState } from "react";

const Faucet = () => {
  const [ticketClaimed, setTicketClaimed] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleClaimTicket = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setTicketClaimed(true);
    setMessage(`Ticket claimed! Funds will be sent to ${email} tomorrow.`);
    setEmail("");
    setEmailError("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-gray-800 rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
          Welcome to the Crypto Faucet
        </h1>
        <form onSubmit={handleClaimTicket} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Enter your FaucetPay Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-gray-200 focus:ring-2 focus:ring-blue-500"
              placeholder="Your FaucetPay email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className={`px-6 py-3 rounded-xl text-lg font-semibold text-white transition-all duration-300 ${
                ticketClaimed
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={ticketClaimed}
            >
              {ticketClaimed ? "Ticket Claimed" : "Claim Your Ticket"}
            </button>
          </div>
        </form>

        {message && (
          <p className="text-center text-green-400 mt-6">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Faucet;
