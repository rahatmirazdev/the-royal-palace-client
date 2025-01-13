import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../assets/animation/loading.json';

const LottieLoader = ({ smallHeight }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div
      className={` ${smallHeight ? 'h-[250px]' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}
    >
      <Lottie options={defaultOptions} height={smallHeight ? 250 : 400} width={smallHeight ? 250 : 400} />
    </div>
  );
};

export default LottieLoader;