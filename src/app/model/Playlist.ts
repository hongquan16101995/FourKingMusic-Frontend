import {Song} from './Song';
import {Users} from './Users';

export interface Playlist {
  id?: number;
  name?: string;
  song?: Song[];
  user?: Users;
}
