import { useEffect } from 'react';

/**
 * Updates document.title consistently for each route.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | PostHub`;

    return () => {
      document.title = prevTitle;
    };
  }, [title]);
}
