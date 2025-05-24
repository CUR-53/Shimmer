import image from './image';

export default interface User {
  accoount_owner: boolean;
  bio: string;
  email: string;
  first_name: string;
  homepage: string;
  image: image;
  last_name: string;
  name: string;
}
