import React from 'react';

interface Props {
  text: string;
  keyword: string;
}

const HighlightText: React.FC<Props> = ({ text, keyword }) => {
  if (!keyword) return <>{text}</>;

  const regex = new RegExp(`(${keyword})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} style={{ backgroundColor: '#65df01' }}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
};

export default HighlightText;
