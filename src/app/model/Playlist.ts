import {Song} from './Song';
import {Users} from './Users';

export interface Playlist {
  id?: number;
  name?: string;
  avatarUrl?: string;
  songs?: Song[];
  user?: Users;
}
