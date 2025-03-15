import React, { useEffect, useState } from "react";
import { getRecentPhrases } from "../../utils/Idb";
import { Link } from "react-router";

function Recents() {
  const [recentPhrases, setRecentPhrases] = useState([]);

  useEffect(() => {
    getRecentPhrases(50).then(setRecentPhrases);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Recent Searches</h2>

      {recentPhrases.length === 0 ? (
        <p className="text-gray-500">No recent searches.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {recentPhrases.map((phrase, index) => (
            <li key={index} className="p-2 border rounded">
              <p className="font-bold">{phrase.word}</p>
              <p className="text-gray-700">{phrase.translation}</p>
            </li>
          ))}
        </ul>
      )}

      <Link to="/">
        <button className="mt-4 p-2 bg-blue-500 text-white rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default Recents;
