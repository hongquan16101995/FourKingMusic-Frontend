import {Song} from './Song';
import {Users} from './Users';

export interface Playlist {
  id?: number;
  name?: string;
  avatarUrl?: string;
  dateCreated?: string;
  countLike?: number;
  songs?: Song[];
  user?: Users;
}
