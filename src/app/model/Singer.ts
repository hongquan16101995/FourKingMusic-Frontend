import {Song} from './Song';

export interface Singer {
  id?: number;
  name?: string;
  description?: string;
  avatarUrl?: string;
  song?: Song[];
}
