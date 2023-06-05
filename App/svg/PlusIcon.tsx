import React, {FC} from 'react';
import Svg, {G, Path} from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const PlusIcon: FC<Props> = ({size = 30, color = '#fff'}) => {
  return (
    <Svg viewBox="0 0 24 24" height={size} width={size} fill={color}>
      <G data-name="Layer 2">
        <Path
          d="M19 11h-6V5a1 1 0 0 0-2 0v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2z"
          data-name="plus"
        />
      </G>
    </Svg>
  );
};

export default PlusIcon;
