"use client"
import { useState } from 'react';

const ReadMore = ({ text = "", maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <span>{displayText}</span>
      {text.length > maxLength && (
        <span
          className="text-blue-500 cursor-pointer ml-1"
          onClick={toggleReadMore}
        >
          {isExpanded ? 'Tutup' : 'Selengkapnya'}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
