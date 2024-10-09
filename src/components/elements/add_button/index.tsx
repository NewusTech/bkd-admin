import { Plus } from "@phosphor-icons/react";
import React, { useState } from "react";

const AddIcon = ({ className }: { className?: string }) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(!isSpinning);
  };

  return (
    <Plus
      onClick={handleClick}
      className={`${className} ${isSpinning ? "animate-spin" : ""} group-hover:animate-spin w-5 h-5 text-line-10 transition-all`}
    />
  );
};

export default AddIcon;
