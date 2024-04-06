import React, {useState} from "react";
import {TextSummary} from "../modules/data-types";

const TextSummary: React.FC<TextSummary> = ({summary, length}) => {
  const [showMore, setShowMore] = useState(false);
  if (!length) length = 100; // Default length of summary
  
  const largeSummary = summary.length > length; // Determines if summary is longer than 100 characters
  
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  
  return (
    <div>
      {/* Shows either the full summary or a truncated version based on `showMore` */}
      {largeSummary ? (
        showMore ? summary : `${summary.substring(0, length)}...`
      ) : (
        summary
      )}
      
      {/* Conditionally render the Show More/Less button */}
      {largeSummary && (
        <a onClick={toggleShowMore} style={{marginLeft: '10px', cursor: 'pointer'}}>
          {showMore ? 'Less' : 'More'}
        </a>
      )}
    </div>
  );
};

export default TextSummary;