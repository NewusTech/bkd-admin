// components/ui/TypingEffect.tsx
import React, { useEffect, useState } from 'react';
import { StringValidation } from 'zod';

interface TypingEffectProps {
    text: string[];
    speed?: number;
    deleteSpeed?: number;
    className?: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 120, deleteSpeed = 50, className }) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [textIndex, setTextIndex] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isDeleting) {
                setDisplayText(prev => prev.slice(0, -1));
                if (displayText.length === 0) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % text.length);
                }
            } else {
                const currentText = text[textIndex];
                setDisplayText(currentText.slice(0, displayText.length + 1));
                if (displayText.length === currentText.length) {
                    setIsDeleting(true);
                }
            }
        }, isDeleting ? deleteSpeed : speed);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, text, textIndex, speed, deleteSpeed, className]);

    return (
        <div className="h-5">
            <div className="text-sm md:text-xl text-primary">{displayText}</div>
        </div>
    );
};

export default TypingEffect;
