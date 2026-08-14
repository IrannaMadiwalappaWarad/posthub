export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostWithAuthor extends Post {
  author?: User;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CreatePostInput {
  title: string;
  body: string;
  userId: number;
}

export interface CreatedPostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt?: string;
}

export interface ApiError {
  message: string;
  status?: number;
  isAborted?: boolean;
}

export type SortOption = 'latest' | 'oldest' | 'title-asc' | 'title-desc';

export interface FormErrors {
  title?: string;
  body?: string;
  userId?: string;
}
