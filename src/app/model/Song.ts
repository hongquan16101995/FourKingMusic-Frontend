import {Users} from './Users';
import {Singer} from './Singer';
import {Playlist} from './Playlist';

export interface Song {
  id?: number;
  name?: string;
  description?: string;
  tags?: string;
  avatarUrl?: string;
  fileUrl?: string;
  dateCreated?: string;
  user?: Users;
  singer?: Singer[];
  playlist?: Playlist[];
}
