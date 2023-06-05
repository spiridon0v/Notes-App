import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Screens} from './screens.type';

export type Props<T extends keyof Screens> = NativeStackScreenProps<Screens, T>;
