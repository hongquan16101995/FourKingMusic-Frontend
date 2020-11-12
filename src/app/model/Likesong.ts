import {Users} from './Users';
import {Song} from './Song';

export interface Likesong {
  id?: number;
  status?: boolean;
  user?: Users;
  song?: Song;
}
