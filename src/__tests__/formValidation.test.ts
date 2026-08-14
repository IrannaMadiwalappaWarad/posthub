import { describe, it, expect } from 'vitest';

interface FormInput {
  title: string;
  body: string;
  userId: string;
}

function validatePostForm(input: FormInput) {
  const errors: Record<string, string> = {};

  if (!input.title.trim()) {
    errors.title = 'Post title is required.';
  } else if (input.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters.';
  } else if (input.title.length > 100) {
    errors.title = 'Title must not exceed 100 characters.';
  }

  if (!input.body.trim()) {
    errors.body = 'Post body content is required.';
  } else if (input.body.trim().length < 20) {
    errors.body = 'Body must be at least 20 characters.';
  } else if (input.body.length > 1000) {
    errors.body = 'Body must not exceed 1000 characters.';
  }

  if (!input.userId) {
    errors.userId = 'Please select an author for the post.';
  }

  return errors;
}

describe('Post Creation Form Validation', () => {
  it('should fail when all fields are empty', () => {
    const errors = validatePostForm({ title: '', body: '', userId: '' });
    expect(errors.title).toBe('Post title is required.');
    expect(errors.body).toBe('Post body content is required.');
    expect(errors.userId).toBe('Please select an author for the post.');
  });

  it('should enforce minimum length constraints (title >= 5, body >= 20)', () => {
    const errors = validatePostForm({
      title: 'Hey',
      body: 'Short text',
      userId: '1',
    });
    expect(errors.title).toBe('Title must be at least 5 characters.');
    expect(errors.body).toBe('Body must be at least 20 characters.');
    expect(errors.userId).toBeUndefined();
  });

  it('should enforce maximum length constraints (title <= 100, body <= 1000)', () => {
    const longTitle = 'a'.repeat(101);
    const longBody = 'b'.repeat(1001);

    const errors = validatePostForm({
      title: longTitle,
      body: longBody,
      userId: '1',
    });
    expect(errors.title).toBe('Title must not exceed 100 characters.');
    expect(errors.body).toBe('Body must not exceed 1000 characters.');
  });

  it('should pass with valid title, body, and userId', () => {
    const errors = validatePostForm({
      title: 'Valid Article Title About React Architecture',
      body: 'This is a comprehensive article body with more than twenty characters describing engineering excellence.',
      userId: '3',
    });
    expect(Object.keys(errors).length).toBe(0);
  });
});
