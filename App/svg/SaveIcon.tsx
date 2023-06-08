import React, {FC} from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {colors} from '../src/colors';

interface Props {
  size?: number;
  color?: string;
}

const SaveIcon: FC<Props> = ({size = 25, color = colors.gray}) => {
  return (
    <Svg viewBox="0 0 24 24" height={size} width={size} fill={color}>
      <G data-name="Layer 2">
        <Path
          d="m20.12 8.71-4.83-4.83A3 3 0 0 0 13.17 3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7.17a3 3 0 0 0-.88-2.12zM10 19v-2h4v2zm9-1a1 1 0 0 1-1 1h-2v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h2v5a1 1 0 0 0 1 1h4a1 1 0 0 0 0-2h-3V5h3.17a1.05 1.05 0 0 1 .71.29l4.83 4.83a1 1 0 0 1 .29.71z"
          data-name="save"
        />
      </G>
    </Svg>
  );
};

export default SaveIcon;
