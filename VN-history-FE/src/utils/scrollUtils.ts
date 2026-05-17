/**
 * Scroll to top of page smoothly or instantly
 */
export const scrollToTop = (behavior: "smooth" | "auto" = "smooth"): void => {
  window.scrollTo({
    top: 0,
    behavior,
  });
};

/**
 * Scroll to a specific element
 */
export const scrollToElement = (
  element: HTMLElement | null,
  behavior: "smooth" | "auto" = "smooth",
): void => {
  if (!element) return;

  element.scrollIntoView({
    behavior,
    block: "start",
  });
};

/**
 * Scroll to element by ID
 */
export const scrollToId = (
  id: string,
  behavior: "smooth" | "auto" = "smooth",
): void => {
  const element = document.getElementById(id);
  scrollToElement(element, behavior);
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Scroll to make element visible
 */
export const scrollToVisible = (
  element: HTMLElement | null,
  behavior: "smooth" | "auto" = "smooth",
): void => {
  if (!element || isElementInViewport(element)) return;
  scrollToElement(element, behavior);
};
