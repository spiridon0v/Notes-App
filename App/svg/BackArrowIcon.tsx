/* eslint-disable react/react-in-jsx-scope */
import Svg, {G, Path} from 'react-native-svg';
import {colors} from '../src/colors';

interface Props {
  size?: number;
  color?: string;
}

const BackArrowIcon = ({size = 20, color = colors.gray}: Props) => (
  <Svg viewBox="0 0 24 24" height={size} width={size} fill={color}>
    <G data-name="Layer 2">
      <Path
        d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
        data-name="arrow-ios-back"
      />
    </G>
  </Svg>
);
export default BackArrowIcon;
