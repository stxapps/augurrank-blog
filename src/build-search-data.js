import fs from 'fs';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import { SKIP, visit } from 'unist-util-visit';
import { filter } from 'unist-util-filter';
import { slugifyWithCounter } from '@sindresorhus/slugify';
import { toString } from 'mdast-util-to-string';

import { navIndexInfo, navMenuInfos } from './infos.js';
import { isString } from './utils/index.js';

function isObjectExpression(node) {
  return (
    node.type === 'mdxTextExpression' &&
    node.data?.estree?.body?.[0]?.expression?.type === 'ObjectExpression'
  );
}

function excludeObjectExpressions(tree) {
  return filter(tree, (node) => !isObjectExpression(node));
}

function extractSections() {
  return (tree, vfile) => {
    const slugify = slugifyWithCounter();
    visit(tree, (node) => {
      if (node.type === 'mdxjsEsm') {
        const res = node.value.match(/export\s+const\s+title\s*=/);
        if (Array.isArray(res) && isString(res[0])) {
          let value = node.value.replace(res[0], '');
          value = value.replace(/^[\s'";]+/, '').replace(/[\s'";]+$/, '');
          vfile.res.title = value;
        }
        return SKIP;
      }
      if (node.type === 'heading' || node.type === 'paragraph') {
        const value = toString(excludeObjectExpressions(node));
        if (node.type === 'heading' && node.depth <= 2) {
          const hash = node.depth === 1 ? null : slugify(value);
          vfile.res.sections.push([value, hash, []]);
        } else {
          if (vfile.res.sections.length === 0) {
            vfile.res.sections.push(['', '', [value]]);
          } else {
            vfile.res.sections.at(-1)?.[2].push(value);
          }
        }
        return SKIP;
      }
    });
  };
}

function buildSearchData() {
  const processor = remark().use(remarkMdx).use(extractSections);

  const data = [];
  for (const info of [navIndexInfo, ...navMenuInfos]) {
    const fpath = './src/mdx-files/' + info.slug + '.mdx';
    const content = fs.readFileSync(fpath, 'utf8');

    const res = { title: '', sections: [] };
    const vfile = { value: content, res };
    processor.runSync(processor.parse(vfile), vfile);

    data.push({ path: info.path, title: res.title, sections: res.sections });
  }

  const wFPath = './src/searchData.js';
  const wContent = `export const searchData = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(wFPath, wContent, 'utf8');
}
buildSearchData();
