import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDictionary } from "../../contexts/DictionaryContext";
import { Link } from "react-router"; 

function Home() {
  const validationSchema = Yup.object().shape({
    word: Yup.string().required("Word is required"),
  });

  const { fetchTranslation, result, loading, error, recentPhrases } = useDictionary();

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold">Dictionary App</h2>

      <Formik
        initialValues={{ word: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => fetchTranslation(values.word)}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <Field
              type="text"
              name="word"
              placeholder="Enter word..."
              className="w-full p-2 border rounded"
            />
            {errors.word && touched.word && (
              <p className="text-red-500 text-sm">{errors.word}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </Form>
        )}
      </Formik>

      {error && <p className="text-red-500">{error}</p>}

      {result && Array.isArray(result) && result.length > 0 && (
  <div className="p-4 bg-gray-100 rounded">
    <h3 className="font-bold">{result[0].word}</h3>

    {/* Phonetics */}
    {result[0].phonetics?.length > 0 && (
      <p className="text-gray-500">{result[0].phonetics[0].text}</p>
    )}

    {/* Meanings */}
    {result[0].meanings.map((meaning, index) => (
      <div key={index} className="mt-2">
        <p className="font-semibold">{meaning.partOfSpeech}:</p>
        <ul className="list-disc pl-5">
          {meaning.definitions.map((def, i) => (
            <li key={i}>{def.definition}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)}


      <div className="p-6">
        <h2 className="text-xl font-bold">Recent Searches</h2>

        {recentPhrases?.length === 0 ? (
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

        <Link to="/recent">
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
