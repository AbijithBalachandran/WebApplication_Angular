

export interface Student {
  name: string;
  slug: string;
  email: string;
  mobile: number;
  password?: string; 
  profileImg?: string;
  is_admin: boolean;
  createdAt?: Date;
  is_block?: boolean;
}
