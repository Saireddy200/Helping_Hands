import React, { useEffect, useState } from 'react';

const TypingHeading = ({ texts = ['Make a Real Impact', 'Change a Life Today'], className = '' , speed = 90 }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index < texts.length) {
        if (!reverse) {
          if (subIndex < texts[index].length) {
            setSubIndex(subIndex + 1);
          } else {
            setReverse(true);
            setTimeout(() => {}, 700);
          }
        } else {
          if (subIndex > 0) {
            setSubIndex(subIndex - 1);
          } else {
            setReverse(false);
            setIndex((index + 1) % texts.length);
          }
        }
      }
    }, reverse ? 35 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, speed, texts]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white ${className}`}>
      {texts[index].substring(0, subIndex)}
      <span className="ml-1 inline-block" style={{ width: '1ch' }}>{blink ? '|' : ' '}</span>
    </h1>
  );
};

export default TypingHeading;
