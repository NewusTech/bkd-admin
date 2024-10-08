import Image from "next/image";
import React from "react";
import TypingEffect from "../ui/TypingEffect";

const NotFoundSearch = () => {
  return (
    <div>
      <div className="wrap flex items-center flex-col gap-3">
        <Image
          src="/assets/images/NotFound.png"
          alt="logo"
          width={170}
          height={170}
          unoptimized
          priority
          className="object-contain animate-pulse hover:animate-spin hover:transition-all transition-all"
        />
        <div className="min-h-[40px] flex items-center">
          <TypingEffect
            className="custom-class text-[14px] md:text-[16px]"
            text={["Maaf tidak ada data..."]}
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundSearch;
