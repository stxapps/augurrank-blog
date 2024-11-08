import FlexSearch from 'flexsearch';

import { searchData } from '@/searchData';
import { isObject } from '@/utils';

const sectionIndex = new FlexSearch.Document({
  tokenize: 'full',
  document: {
    id: 'path',
    index: ['heading', 'contents'],
    store: ['heading'],
  },
  context: { resolution: 1, depth: 1, bidirectional: true },
});

for (const { path, title, sections } of searchData) {
  for (let i = 0; i < sections.length; i++) {
    const [heading, hash, contents] = sections[i];

    if (i === 0 && title.length > 0) {
      if (heading.length > 0) {
        sectionIndex.add({ path, heading: title, contents: [] });
        sectionIndex.add({ path: path + '#' + hash, heading, contents });
      } else {
        sectionIndex.add({ path: path, heading: title, contents });
      }
      continue;
    }

    sectionIndex.add({ path: path + '#' + hash, heading, contents });
  }
}

export function search(query, options = {}) {
  const result = sectionIndex.search(query, { ...options, enrich: true });

  let items = [];
  if (Array.isArray(result) && isObject(result[0]) && Array.isArray(result[0].result)) {
    items = result[0].result;
  }

  return items.map((item) => {
    return { path: item.id, heading: item.doc.heading };
  });
}
