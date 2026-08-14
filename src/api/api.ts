import { Post, User, Comment, CreatePostInput, CreatedPostResponse } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com';

export class FetchError extends Error {
  status?: number;
  isAborted: boolean;

  constructor(message: string, status?: number, isAborted = false) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.isAborted = isAborted;
  }
}

/**
 * Generic fetch wrapper with standardized error handling and AbortController support.
 */
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new FetchError(
        `API error: ${response.status} ${response.statusText}${errorText ? ` - ${errorText}` : ''}`,
        response.status
      );
    }

    return (await response.json()) as T;
  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new FetchError('Request was intentionally cancelled', undefined, true);
    }
    if (error instanceof FetchError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new FetchError(error.message);
    }
    throw new FetchError('An unexpected network error occurred');
  }
}

/**
 * Fetch all posts from JSONPlaceholder
 */
export async function getPosts(signal?: AbortSignal): Promise<Post[]> {
  return request<Post[]>('/posts', { signal });
}

/**
 * Fetch a single post by ID
 */
export async function getPost(id: number | string, signal?: AbortSignal): Promise<Post> {
  return request<Post>(`/posts/${id}`, { signal });
}

/**
 * Fetch all users
 */
export async function getUsers(signal?: AbortSignal): Promise<User[]> {
  return request<User[]>('/users', { signal });
}

/**
 * Fetch a single user by ID
 */
export async function getUser(id: number | string, signal?: AbortSignal): Promise<User> {
  return request<User>(`/users/${id}`, { signal });
}

/**
 * Fetch all posts by a specific user
 */
export async function getUserPosts(userId: number | string, signal?: AbortSignal): Promise<Post[]> {
  return request<Post[]>(`/posts?userId=${userId}`, { signal });
}

/**
 * Fetch comments for a specific post
 */
export async function getPostComments(postId: number | string, signal?: AbortSignal): Promise<Comment[]> {
  return request<Comment[]>(`/posts/${postId}/comments`, { signal });
}

/**
 * Create a new post (POST request to JSONPlaceholder)
 */
export async function createPost(data: CreatePostInput, signal?: AbortSignal): Promise<CreatedPostResponse> {
  const result = await request<CreatedPostResponse>('/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    signal,
  });

  return {
    ...result,
    createdAt: new Date().toISOString(),
  };
}
