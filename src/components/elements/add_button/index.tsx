import React, { useState } from 'react';

const AddIcon = () => {
    const [isSpinning, setIsSpinning] = useState(false);

    const handleClick = () => {
        setIsSpinning(!isSpinning); // Toggle spinning state
    };

    return (
        <svg
            onClick={handleClick}
            className={`${isSpinning ? 'animate-spin' : ''} transition-all cursor-pointer hover:animate-spin`}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 0C9.28643 0 9.56114 0.113785 9.76367 0.316325C9.96621 0.518864 10.08 0.793566 10.08 1.08V7.92H16.92C17.2064 7.92 17.4811 8.03379 17.6837 8.23633C17.8862 8.43886 18 8.71357 18 9C18 9.28643 17.8862 9.56114 17.6837 9.76367C17.4811 9.96621 17.2064 10.08 16.92 10.08H10.08V16.92C10.08 17.2064 9.96621 17.4811 9.76367 17.6837C9.56114 17.8862 9.28643 18 9 18C8.71357 18 8.43886 17.8862 8.23633 17.6837C8.03379 17.4811 7.92 17.2064 7.92 16.92V10.08H1.08C0.793566 10.08 0.518864 9.96621 0.316325 9.76367C0.113785 9.56114 0 9.28643 0 9C0 8.71357 0.113785 8.43886 0.316325 8.23633C0.518864 8.03379 0.793566 7.92 1.08 7.92H7.92V1.08C7.92 0.793566 8.03379 0.518864 8.23633 0.316325C8.43886 0.113785 8.71357 0 9 0Z"
                fill="white"
            />
        </svg>
    );
};

export default AddIcon;
