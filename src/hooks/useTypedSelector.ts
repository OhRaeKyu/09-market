import {
  useSelector as __useSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { RootState } from '@/modules';

export const useSelector: TypedUseSelectorHook<RootState> = __useSelector;
