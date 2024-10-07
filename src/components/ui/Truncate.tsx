import React from 'react';

interface TruncateProps {
    text: string;
    length: number;
}

const Truncate: React.FC<TruncateProps> = ({ text, length }) => {
    if (!text) return null; // Jika tidak ada teks, kembalikan null

    const truncatedText = text.length > length ? text.substring(0, length) + '...' : text;

    return <span>{truncatedText}</span>;
};

export default Truncate;
