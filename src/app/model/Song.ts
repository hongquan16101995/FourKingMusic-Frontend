import {Users} from './Users';
import {Singers} from './Singers';

export interface Song {
  id?: number;
  name?: string;
  description?: string;
  tags?: string;
  avatarUrl?: string;
  fileUrl?: string;
  dateCreated?: string;
  user?: Users;
  singers?: Singers[];
}
