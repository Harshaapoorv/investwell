import React from 'react';
import Svg, {Path} from 'react-native-svg';

const DropDownIcon = ({showContent}) => {
  return showContent ? (
    <Svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M7 14.5146L12 9.36896L17 14.5146H7Z" fill="#1D1B20" />
    </Svg>
  ) : (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M12 15L7 10H17L12 15Z" fill="#1D1B20" />
    </Svg>
  );
};

export default DropDownIcon;
