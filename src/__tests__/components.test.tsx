import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { PostCard } from '../components/PostCard';
import { Pagination } from '../components/Pagination';
import { Post, User } from '../types';

describe('UI Components Unit Tests', () => {
  it('renders EmptyState with custom title and calls action', () => {
    const onAction = vi.fn();
    render(
      <EmptyState
        title="No items found"
        description="Try searching again."
        actionText="Reset filters"
        onActionClick={onAction}
      />
    );

    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('Try searching again.')).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /reset filters/i });
    fireEvent.click(button);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders ErrorState with retry button and triggers callback', () => {
    const onRetry = vi.fn();
    render(
      <ErrorState
        title="Network Error"
        message="Please check your connection."
        onRetry={onRetry}
      />
    );

    expect(screen.getByText('Network Error')).toBeInTheDocument();
    const retryBtn = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryBtn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders PostCard with title, excerpt, and author name', () => {
    const mockPost: Post = {
      id: 42,
      userId: 1,
      title: 'Architecting React Applications',
      body: 'Comprehensive guide to building resilient frontend systems with TypeScript.',
    };

    const mockAuthor: User = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: { lat: '-37.3159', lng: '81.1496' },
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets',
      },
    };

    render(
      <BrowserRouter>
        <PostCard post={mockPost} author={mockAuthor} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Architecting React Applications/i)).toBeInTheDocument();
    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText(/Post #42/i)).toBeInTheDocument();
  });

  it('renders Pagination controls and triggers page change', () => {
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        totalItems={50}
        itemsPerPage={10}
        onPageChange={onPageChange}
      />
    );

    expect(
      screen.getByText((_content, element) => {
        return element?.textContent === 'Showing 11 to 20 of 50 posts';
      })
    ).toBeInTheDocument();

    const nextPageBtn = screen.getByRole('button', { name: /next page/i });
    fireEvent.click(nextPageBtn);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
