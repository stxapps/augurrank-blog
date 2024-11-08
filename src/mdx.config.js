import createMDX from '@next/mdx';
import { mdxAnnotations } from 'mdx-annotations';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { toString } from 'mdast-util-to-string';
import * as acorn from 'acorn';

import { isObject } from './utils/index.js'; // Used in next.config.js, need raw paths.

function rehypeSlugify() {
  return (tree) => {
    const slugify = slugifyWithCounter();
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h2' && !node.properties.id) {
        node.properties.id = slugify(toString(node));
      }
    });
  };
}

function getSections(node) {
  const sections = [];
  if (isObject(node) && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child.type === 'element' && child.tagName === 'h2') {
        sections.push({
          title: toString(child),
          id: child.properties.id,
          ...child.properties.annotation,
        });
      } else {
        sections.push(...getSections(child));
      }
    }
  }
  return sections;
}

function rehypeAddExportedSections() {
  return (tree) => {
    for (const node of tree.children) {
      if (
        node.type === 'mdxjsEsm' &&
        new RegExp(`export\\s+const\\s+sections\\s*=`).test(node.value)
      ) {
        return;
      }
    }

    const sections = getSections(tree);
    const exportStr = `export const sections = ${JSON.stringify(sections)}`;
    tree.children.push({
      type: 'mdxjsEsm',
      value: exportStr,
      data: {
        estree: acorn.parse(exportStr, {
          sourceType: 'module',
          ecmaVersion: 'latest',
        }),
      },
    });
  };
}

export const withMDX = createMDX({
  options: {
    remarkPlugins: [mdxAnnotations.remark, remarkGfm],
    rehypePlugins: [mdxAnnotations.rehype, rehypeSlugify, rehypeAddExportedSections],
    recmaPlugins: [mdxAnnotations.recma],
  },
});
