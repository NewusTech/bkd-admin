import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface TruncateRichTextProps {
    content: string;
    length: number;
    keys?: boolean | undefined;
}

const TruncateRichText: React.FC<TruncateRichTextProps> = ({ content, length, keys }) => {
    const [sanitizedContent, setSanitizedContent] = useState<string>('');
    const [truncatedContent, setTruncatedContent] = useState<string>('');

    useEffect(() => {
        // Sanitize the HTML content
        const sanitized = DOMPurify.sanitize(content);
        setSanitizedContent(sanitized);

        // Convert HTML content to plain text to perform truncation
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = sanitized;
        const plainText = tempDiv.textContent || tempDiv.innerText || '';

        // Perform truncation on plain text
        const truncated = plainText.length > length ? plainText.substring(0, length) + '...' : plainText;
        setTruncatedContent(truncated);
    }, [content, length]);

    return (
        <>
            <span className={`${keys === true
                ? 'prose-mpp'
                : keys === false
                    ? 'prose-maklumat'
                    : 'prose'
                }`}
                dangerouslySetInnerHTML={{ __html: truncatedContent }}></span>
        </>
    );
};

export default TruncateRichText;
