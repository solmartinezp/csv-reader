import React, { useState, useEffect } from 'react';
import CSVReader from './components/CSVReader';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { searchUsers } from './services/usersService';
import Card from './components/Card';
import './style.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [cardContent, setCardContent] = useState<any>({});
  const [disable, setDisable] = useState<boolean>(false);
  const [noMatch, setNoMatch] = useState<boolean>(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    if (cardContent.data) {
      setDisable(false); 
    } else {
      setDisable(true);
    }
  }, []);

  useEffect(() => {
    if (cardContent.data) {
      setDisable(false); 
    } else {
      setDisable(true);
    }
  }, [cardContent]);

  const toggleShowCard = (): void => {
    if (showCard) {
      setShowCard(false);
    } else {
      setShowCard(true);
    }
  }

  const handleSearch = (searchValue: string) => {
    setNoMatch(false);
    setIsLoading(true);

    // If the search value is empty, set the cardContent directly without making a request
    if (!searchValue.trim()) {
        setShowCard(true); 
        setIsLoading(false);
        return;
    }

    // Call the searchUsers function from the userService
    searchUsers(searchValue)
      .then(data => {
        if (data && data.data && data.data.length > 0) {
          setCardContent(data);
          setShowCard(true);
        } else {
          setShowCard(false);
          setNoMatch(true);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setNoMatch(false);
        // Handle error (e.g., show error message)
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false after the request completes
      });
  };

  return (
    <div className='main'>
      <div className={isVisible ? 'container' : 'hidden'}>
        <h1>CSV Reader App</h1>
        <CSVReader toggleShowCard={toggleShowCard} setCardContent={setCardContent} />
        <SearchBar setSearchTerm={setSearchTerm} onSearch={handleSearch} disable={disable} />
      </div>

      {isLoading ? <LoadingSpinner/> : (
        <div className="mainCard">
          {showCard && cardContent.data.map((data: any, index: any) => (
            <Card key={index} data={data} />
          ))}
        </div>
      )}

      {noMatch && <h4 className="noMatch">No matches found.</h4>}

    </div>
  );
};

export default App;