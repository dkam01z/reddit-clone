import React, { useState, useEffect } from 'react';

const ProgressBar = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minDuration = 2000; 

    const timer = setTimeout(() => {
      if (document.readyState === 'complete') {
        setVisible(false);
      }
    }, minDuration);

    const handleStateChange = () => {
      if (document.readyState === 'complete') {
        setVisible(false);
      }
    };

    document.onreadystatechange = handleStateChange;

    return () => {
      clearTimeout(timer);
      document.onreadystatechange = null;
    };
  }, []);

  return (
    visible && (
      <div className="progress" id="PreLoaderBar">
        <div className="indeterminate" />
      </div>
    )
  );
};

export default ProgressBar;
