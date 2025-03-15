import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { savePhrase, getRecentPhrases } from "../utils/Idb";

const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentPhrases, setRecentPhrases] = useState([]);

  // Load recent phrases on mount
  useEffect(() => {
    getRecentPhrases(5)
      .then((phrases) => setRecentPhrases(phrases || []))
      .catch(() => setRecentPhrases([]));
  }, []);

  // Fetch translation from  Dictionary API
  const fetchTranslation = async (searchWord = word) => {
    if (!searchWord) return;
    setLoading(true);
    setError("");
  
    try {
      console.log(`Fetching: ${searchWord}`);
  
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`
      );
  
      console.log("API Response:", response.data);
  
      if (response.data.length > 0) {
        setResult(response.data);

        const firstDefinition =
        response.data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found";
  
        response.data[0]?.meanings?.[0]?.definitions?.[0]?.definition || "No definition found";
  
        //  Save only the word and the first definition
 
      await savePhrase(searchWord, firstDefinition);
  
        //  Refresh recent searches
        const updatedPhrases = await getRecentPhrases(5);
        setRecentPhrases(updatedPhrases);
      } else {
        setError("No translation found.");
      }
    } catch (err) {
      console.error("Error fetching translation:", err);
      setError("Failed to fetch translation. Try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <DictionaryContext.Provider
      value={{
        word,
        setWord,
        result,
        fetchTranslation,
        loading,
        error,
        recentPhrases,
      }}
    >
      {children}
    </DictionaryContext.Provider>
  );
};

export const useDictionary = () => useContext(DictionaryContext);
