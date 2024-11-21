import React from 'react';
import {Svg, Rect, Defs, Pattern, Use, Image} from 'react-native-svg';

const MySVG = () => (
  <Svg
    width={150}
    height={150}
    viewBox="0 0 225 225"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Defs>
      <Pattern
        id="pattern0_1_10"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1">
        <Use xlinkHref="#image0_1_10" transform="scale(0.00444444)" />
      </Pattern>
      <Image
        id="image0_1_10"
        width="225"
        height="225"
        xlinkHref="data:image/png;base64,
        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"
      />
    </Defs>
    <Rect width="225" height="225" rx="8" fill="url(#pattern0_1_10)" />
  </Svg>
);

export default MySVG;
