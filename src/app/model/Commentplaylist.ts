import {Users} from './Users';
import {Playlist} from './Playlist';

export interface Commentplaylist {
  id?: number;
  content?: string;
  user?: Users;
  playlist?: Playlist;
}
