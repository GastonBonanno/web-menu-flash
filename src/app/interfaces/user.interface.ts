export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  id: string;
  email: string;
  company_id: string;
  active: boolean;
  created_at: string;
  modificated_at: string;
  deleted_at: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  repeatedPassword: string;
}

export interface CreateUserResponse {
  id: string;
  email: string;
  company_id: string;
  active: boolean;
  created_at: string;
  modificated_at: string;
  deleted_at: string;
}
