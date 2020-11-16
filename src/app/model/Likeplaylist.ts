import {Users} from './Users';
import {Playlist} from './Playlist';

export interface Likeplaylist {
  id?: number;
  status?: boolean;
  user?: Users;
  playlist?: Playlist;
}
