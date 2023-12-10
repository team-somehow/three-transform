import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";

const MeraLottie = ({ path }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        loop: false,
        autoplay: true,
        path: path,
      });
    }
  }, [path]);

  return <div ref={animationRef} />;
};

export default MeraLottie;
