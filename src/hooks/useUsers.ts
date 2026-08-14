import { useState, useEffect, useCallback, useMemo } from 'react';
import { getUsers, getPosts, FetchError } from '../api/api';
import { User } from '../types';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [userPostCounts, setUserPostCounts] = useState<Record<number, number>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchUsersData = useCallback(async (signal?: AbortSignal, isRetry = false) => {
    if (isRetry) {
      setIsRetrying(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const [fetchedUsers, fetchedPosts] = await Promise.all([
        getUsers(signal),
        getPosts(signal).catch(() => []), // Soft fallback if posts fail
      ]);

      // Calculate post counts per user
      const counts: Record<number, number> = {};
      fetchedPosts.forEach((post) => {
        counts[post.userId] = (counts[post.userId] || 0) + 1;
      });

      setUsers(fetchedUsers);
      setUserPostCounts(counts);
    } catch (err: unknown) {
      if (err instanceof FetchError && err.isAborted) {
        return;
      }
      const message =
        err instanceof Error
          ? err.message
          : 'Failed to load users directory. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsersData(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchUsersData]);

  const retry = useCallback(() => {
    const controller = new AbortController();
    fetchUsersData(controller.signal, true);
  }, [fetchUsersData]);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase().trim();

    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.company.name.toLowerCase().includes(q) ||
        user.address.city.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  return {
    users: filteredUsers,
    allUsers: users,
    totalCount: filteredUsers.length,
    userPostCounts,
    isLoading,
    error,
    isRetrying,
    retry,
    searchQuery,
    setSearchQuery,
  };
}
