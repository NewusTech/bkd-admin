import React from "react";

export default function BackgroundImage() {
  return (
    <>
      <div
        className="absolute top-0 right-0 bg-right-top w-full h-1/6 md:h-3/6 bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('/assets/images/bg-top.png')`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-1/6 md:h-3/6 bg-no-repeat bg-contain"
        style={{
          backgroundImage: `url('/assets/images/bg-bottom.png')`,
        }}
      />
    </>
  );
}
