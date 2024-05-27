import React from 'react';
import Logo from '../../assets/logo_shaw.png';
import './style.css';

type CardProps<T extends string | number | boolean> = {
    data: Record<string | number | symbol, T>;
  };
  
  const Card = <T extends string | number | boolean>({ data }: CardProps<T>) => {
    return (
      <div className="card">
        <div className="card-content">
          <img src={Logo} className="logo" alt="Logo" />
          {Object.entries(data).map(([key, value]) => (
            <div key={key.toString()} className="card-item">
              <strong>{key.toString()}:</strong> {value}
            </div>
          ))}
        </div>
      </div>
    );
  };  


export default Card;