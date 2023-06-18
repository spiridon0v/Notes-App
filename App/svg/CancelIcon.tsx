import React, {FC} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {colors} from '../src/colors';

interface Props {
  size?: number;
  color?: string;
}

const CancelIcon: FC<Props> = ({size = 35, color = colors.fourth}) => {
  return (
    <Svg viewBox="0 0 24 24" height={size} width={size} fill={color}>
      <G data-name="Layer 2">
        <Path
          d="m13.41 12 4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"
          data-name="close"
        />
      </G>
    </Svg>
  );
};

export default CancelIcon;
