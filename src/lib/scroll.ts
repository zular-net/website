import type { MouseEvent } from 'react';

/** Scrolls without changing the address, so section links can't clash with page routes. */
export function scrollToSection(event: MouseEvent, id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  event.preventDefault();
  element.scrollIntoView();
}
