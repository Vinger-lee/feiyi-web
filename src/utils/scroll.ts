export const smoothScrollTo = (elementId: string, offset = 0) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });
};

export const smoothScrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
