import PropTypes from 'prop-types';
import LottieLoader from './LottieLoader';

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <LottieLoader smallHeight={smallHeight} />
  );
};

LoadingSpinner.propTypes = {
  smallHeight: PropTypes.bool,
};

export default LoadingSpinner;