import React, { useState } from 'react';
import './App.css';

const articles = [
  {
    id: 1,
    title: "Lorem Ipsum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    title: "Dolor Sit Amet",
    content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
  },

];

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="search-title">Search</h1>
      <input
        type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange}  className="search-input"
      />
       <p className="results-info">
        <span className="bold">{filteredArticles.length} post{filteredArticles.length !== 1 ? 's' : ''}</span> were found
      </p>
      {filteredArticles.map(article => (
        <Article key={article.id} article={article} searchTerm={searchTerm} />
      ))}
    </div>
  );
}

function Article({ article, searchTerm }) {
  const { title, content } = article;

  const highlightText = (text) => {
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, (match) => `<mark style="background-color: yellow">${match}</mark>`);
  };

  return (
    <div className="article">
      <h2 dangerouslySetInnerHTML={{ __html: highlightText(title) }} />
      <p dangerouslySetInnerHTML={{ __html: highlightText(content) }} />
    </div>
  );
}



export default App;
