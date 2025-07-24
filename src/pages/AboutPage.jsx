import React from 'react'
import { useEffect,useState } from 'react';
import { Typography } from '@mui/material';

function AboutPage() {
  const [isFiveSecondsPass, setIsFiveSecondsPass] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsFiveSecondsPass(true);
    }, 5000);
  }, []);
  return (
    <div>
      AboutPage
      {isFiveSecondsPass ? <Typography>Hello!!!!</Typography> : null}
    </div>
  );
}

export default AboutPage