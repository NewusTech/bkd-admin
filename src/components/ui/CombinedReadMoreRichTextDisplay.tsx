"use client";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";

const CombinedReadMoreRichTextDisplay = ({ content = "", maxLength = 100, keys = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [sanitizedContent, setSanitizedContent] = useState("");

    useEffect(() => {
        setSanitizedContent(DOMPurify.sanitize(content));
    }, [content]);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText = isExpanded ? sanitizedContent : sanitizedContent.slice(0, maxLength);

    return (
        <>
            <div
                className={`${keys === true
                    ? "prose-mpp"
                    : keys === false
                        ? "prose-maklumat"
                        : "prose"
                    }`}
                dangerouslySetInnerHTML={{ __html: displayText }}
            />
            {sanitizedContent.length > maxLength && (
                <span
                    className="text-blue-500 cursor-pointer ml-1"
                    onClick={toggleReadMore}
                >
                    {isExpanded ? 'Tutup' : 'Selengkapnya'}
                </span>
            )}
        </>
    );
};

export default CombinedReadMoreRichTextDisplay;
