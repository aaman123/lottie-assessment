import React, { useRef } from "react";

/*
  Description: Lottie Player to load various lottie json animations.
*/

const LottiePlayer = ({color, lottieData}) => {
    const ref = useRef(null);
    React.useEffect(() => {
      import("@lottiefiles/lottie-player");
    });
    console.log(lottieData);
    return(
        <>
        <lottie-player
          id="firstLottie"
          ref={ref}
          autoplay
          controls
          loop
          mode="normal"
          src={JSON.stringify(lottieData)}
          background={color}
          style={{ width: "300px", height: "300px" }}
        ></lottie-player>
        </>
    )
};

export default LottiePlayer;