import {Song} from './Song';

export interface Singers {
  id?: number;
  name?: string;
  description?: string;
  avatarUrl?: string;
  song?: Song[];
}
