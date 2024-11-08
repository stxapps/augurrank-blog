export const isObject = val => {
  return typeof val === 'object' && val !== null;
};

export const isString = val => {
  return typeof val === 'string' || val instanceof String;
};

export const importMdxFile = async (slug) => {
  const impted = await import('@/mdx-files/' + slug + '.mdx');
  return impted;
};

export const comparePaths = (a, b) => {
  if (!isString(a) || !isString(b)) return false;

  [a, b] = [a.split('#')[0], b.split('#')[0]];
  [a, b] = [a.split('?')[0], b.split('?')[0]];
  if (a.endsWith('/')) a = a.slice(0, -1);
  if (b.endsWith('/')) b = b.slice(0, -1);
  return a === b;
};

export const deriveMetaTitle = (title) => {
  return `${title} - AugurRank`;
};
