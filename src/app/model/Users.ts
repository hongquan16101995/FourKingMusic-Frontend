import {Role} from './Role';
import {Playlist} from './Playlist';

export interface Users {
  id?: number;
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  gender?: string;
  hobbies?: string;
  avatarUrl?: string;
  role?: Role;
}
