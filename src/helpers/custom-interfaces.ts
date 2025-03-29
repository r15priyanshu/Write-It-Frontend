export interface UserType {
  userId: number;
  name: string;
  username: string;
  password: string;
  about?: string;
  profilePic?: string;
  imageData?: string;
  roles: RoleType[];
}

export interface RoleType {
  roleId: number;
  roleName: string;
}

export interface LoginRequestType {
  username: string;
  password: string;
}
