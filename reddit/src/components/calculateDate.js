
import React, { useState, useEffect } from 'react';

const CalculateDate = ({ time }) => {
  const [relativeTime, setRelativeTime] = useState('');

  useEffect(() => {
    const updateRelativeTime = () => {
      const date = new Date(time);
      const secondsPast = (new Date() - date) / 1000;

      if (secondsPast < 60) {
        setRelativeTime('just now');
      } else if (secondsPast < 3600) {
        setRelativeTime(`${Math.floor(secondsPast / 60)} minutes ago`);
      } else if (secondsPast < 86400) {
        setRelativeTime(`${Math.floor(secondsPast / 3600)} hours ago`);
      } else if (secondsPast < 2592000) {
        setRelativeTime(`${Math.floor(secondsPast / 86400)} days ago`);
      } else {
        setRelativeTime(`${Math.floor(secondsPast / 2592000)} Months ago`);
      }
    };

    updateRelativeTime();
    const intervalId = setInterval(updateRelativeTime, 60000);

    return () => clearInterval(intervalId);
  }, [time]);

  return <span>{relativeTime}</span>;
};

export default CalculateDate;
