import React, { useState } from 'react';
import SearchBar from './QandA/SearchBar.jsx';
import QuestionsList from './QandA/QuestionsList.jsx';

const QandA = ({ product_id, product_name }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div id='QandA'>
      <h3 id='QA-section-title'>Questions & Answers</h3>
      <SearchBar setSearchText={setSearchText}/>
      <QuestionsList
        product_id={40349}
        product_name={product_name}
        searchText={searchText}
      />
    </div>
  );
};

export default QandA;