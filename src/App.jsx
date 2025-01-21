import React, { useState, useEffect } from "react";

const App = () => {
  const [ticketClaimed, setTicketClaimed] = useState(false);
  const [message, setMessage] = useState("");

  // Check if the user has already claimed the ticket today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastClaimed = localStorage.getItem("lastClaimed");

    if (lastClaimed !== today) {
      setTicketClaimed(false);
    } else {
      setTicketClaimed(true);
    }
  }, []);

  // Handle claim ticket
  const handleClaimTicket = () => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("lastClaimed", today);
    setTicketClaimed(true);
    setMessage("Ticket claimed! Come back tomorrow for your chance to win!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Welcome to the Crypto Faucet
        </h1>
        <p className="text-lg text-center mb-4">
          Claim your free daily crypto lottery ticket and stand a chance to win!
        </p>

        <div className="text-center mb-6">
          <button
            onClick={handleClaimTicket}
            className={`px-4 py-2 rounded-lg text-lg font-bold ${
              ticketClaimed
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={ticketClaimed}
          >
            {ticketClaimed ? "Ticket Claimed" : "Claim Your Ticket"}
          </button>
        </div>

        {message && <p className="text-center text-green-400">{message}</p>}

        <footer className="text-center mt-6 text-sm text-gray-400">
          <p>
            By using this faucet, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;
