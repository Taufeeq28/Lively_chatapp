import PropTypes from 'prop-types';
import Lottie from "lottie-react";

const AnimationLottie = ({ animationPath, width }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationPath,
    style: {
      width: width ? `${width}%` : '95%', // Use width prop if provided, else default to 95%
    }
  };

  return (
    <Lottie {...defaultOptions} />
  );
};

AnimationLottie.propTypes = {
  animationPath: PropTypes.object.isRequired, // Assuming animationPath is an object for Lottie animation data
  width: PropTypes.number, // Optional number prop for width
};

AnimationLottie.defaultProps = {
  width: 95, // Default width percentage if not provided
};

export default AnimationLottie;
