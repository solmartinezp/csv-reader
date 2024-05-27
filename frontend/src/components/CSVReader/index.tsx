import React from 'react';
import '../../style.css';
import './style.css';
import uploadCSV from '../../services/csvService';

interface CSVReaderProps {
  toggleShowCard: () => void;
  setCardContent: (newCardContent: any[]) => void;
}

const CSVReader: React.FC <CSVReaderProps> = ({ toggleShowCard, setCardContent})  => {
  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const input = event.target;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      uploadCSV(file)
      .then(data => {
        setCardContent(data);
        toggleShowCard();
      })
      .catch(error => {
        console.error('Error:', error);
      });

    } else {
      console.log('error');
    }
  };

  return (
    <div className="csv-reader">
      <input type="file" accept=".csv" onChange={handleFileInputChange} />
    </div>
  );
};

export default CSVReader;