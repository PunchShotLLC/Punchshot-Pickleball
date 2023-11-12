import React, { useState } from 'react';

const AddressInput = () => {
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = (input) => {
    const requestOptions = {
      method: 'GET',
    };

    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=14cea0e3ba0c4d108d7ac029bd20ab00`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSuggestions(result.features); // Assuming the API response has a 'features' array
      })
      .catch(error => console.log('error', error));
  };

  const handleAddressChange = (event) => {
    const input = event.target.value;
    setAddress(input);
    if (input.length > 2) { // Start fetching suggestions when input length is greater than 2
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setAddress(suggestion.properties.formatted); // Assuming the suggestion has a 'properties.formatted' field
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={handleAddressChange}
        placeholder="Enter your address"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressInput;