import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './loading-spinner';
import ErrorMessage from './error-message';
import QuoteContainer from './quote-container';

const App = () => {
  const [quotes, setQuotes] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  function fetchQuotes() {
    axios.get('https://autumnchris-quotes.herokuapp.com/api/quotes').then(response => {
      setQuotes(response.data);
      setLoadingStatus(false);
    }).catch(() => {
      setLoadingStatus(false);
    });
  }

  return (
    <React.Fragment>
      <header>
        <h1>Inspiring Quotes</h1>
      </header>
      <main>
        {loadingStatus ? <LoadingSpinner /> : quotes.length !== 0 ? <QuoteContainer quotes={quotes} /> : <ErrorMessage />}
      </main>
      <footer>Created by <a href="https://github.com/doh-halle" target="_blank">Doh Halle</a> &copy; {new Date().getFullYear()}</footer>
    </React.Fragment>
  );
}

export default App;
