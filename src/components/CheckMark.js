import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CheckMark = () => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.54998 18L3.84998 12.3L5.27498 10.875L9.54998 15.15L18.725 5.97501L20.15 7.40001L9.54998 18Z"
        fill="#1D1B20"
      />
    </Svg>
  );
};

export default CheckMark;
