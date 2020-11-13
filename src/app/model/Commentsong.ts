import {Users} from './Users';
import {Song} from './Song';

export interface Commentsong {
  id?: number;
  content?: string;
  user?: Users;
  song?: Song;
}
