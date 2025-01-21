import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AvailableSoon = () => {
  const navigate = useNavigate();

  // Set a fixed target date (e.g., 7 days from a specific starting point)
  const targetDate = new Date("2025-01-28T00:00:00");

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      navigate("/faucet");
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 bg-neutral flex flex-col justify-center items-center p-6">
      <div className="card text-neutral-content">
        <figure className=" animate-bounce">
          <img src="./trx.png" alt="TRX Faucet" className="w-32" />
        </figure>
        <div className="card-body items-center text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">
            Faucet Not Yet Live
          </h1>
          <p className="text-sm text-gray-300">
            The faucet will be available soon. Stay tuned!
          </p>

          <div className="flex space-x-6 text-xl font-bold my-6">
            <div className="text-center">
              <span className="countdown font-mono text-5xl text-blue-400">
                {timeLeft.days}
              </span>
              <div>Days</div>
            </div>
            <div className="text-center">
              <span className="countdown font-mono text-5xl text-green-400">
                {timeLeft.hours}
              </span>
              <div>Hours</div>
            </div>
            <div className="text-center">
              <span className="countdown font-mono text-5xl text-yellow-400">
                {timeLeft.minutes}
              </span>
              <div>Minutes</div>
            </div>
            <div className="text-center">
              <span className="countdown font-mono text-5xl text-purple-400">
                {timeLeft.seconds}
              </span>
              <div>Seconds</div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Stay patient and come back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailableSoon;
