import { useState, useEffect, useCallback, useMemo } from 'react';
import { getPosts, getUsers, FetchError } from '../api/api';
import { Post, User, SortOption } from '../types';

interface UsePostsOptions {
  itemsPerPage?: number;
  initialSort?: SortOption;
}

export function usePosts({
  itemsPerPage = 9,
  initialSort = 'latest',
}: UsePostsOptions = {}) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);

  // Filters and pagination state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch posts & users with abort controller
  const fetchPostsData = useCallback(async (signal?: AbortSignal, isRetry = false) => {
    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Parallel requests for posts and users
      const [fetchedPosts, fetchedUsers] = await Promise.all([
        getPosts(signal),
        getUsers(signal),
      ]);

      setPosts(fetchedPosts);
      setUsers(fetchedUsers);
    } catch (err: unknown) {
      if (err instanceof FetchError && err.isAborted) {
        // Request cancelled intentionally — do not set error state
        return;
      }
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to load posts. Please check your network connection.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPostsData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchPostsData]);

  // Retry handler
  const retry = useCallback(() => {
    const controller = new AbortController();
    fetchPostsData(controller.signal, true);
  }, [fetchPostsData]);

  // Users mapping by ID
  const usersMap = useMemo(() => {
    const map = new Map<number, User>();
    users.forEach((user) => map.set(user.id, user));
    return map;
  }, [users]);

  // Filtered and sorted posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by Author/User ID
    if (selectedUserId !== 'all') {
      const uId = Number(selectedUserId);
      result = result.filter((post) => post.userId === uId);
    }

    // Filter by Search Query (title or body)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.body.toLowerCase().includes(q)
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return b.id - a.id;
        case 'oldest':
          return a.id - b.id;
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return result;
  }, [posts, searchQuery, selectedUserId, sortBy]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedUserId, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage) || 1;
  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(start, start + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedUserId('all');
    setSortBy('latest');
    setCurrentPage(1);
  }, []);

  return {
    posts: paginatedPosts,
    allFilteredPosts: filteredPosts,
    totalCount: filteredPosts.length,
    users,
    usersMap,
    isLoading,
    error,
    isRetrying,
    retry,
    searchQuery,
    setSearchQuery,
    selectedUserId,
    setSelectedUserId,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    clearFilters,
  };
}
