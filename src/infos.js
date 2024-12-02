import { DOMAIN_NAME } from '@/types/const';

const mpi = (slug, grp, path = '') => {
  return { slug, grp, path };
};
const _mdxInfos = [
  mpi('first-contract', 1),
  mpi('a-look-at-prediction-games', 1),
  mpi('intro', 1),
];
for (const info of _mdxInfos) {
  if (info.path.length === 0) info.path = '/' + info.slug;
}
export const mdxInfos = _mdxInfos;

export const twInfo = {
  site: '@augurrank',
  images: [DOMAIN_NAME + '/twitter-card-image-pattern1.png'],
  card: 'summary_large_image',
};

export const ogInfo = {
  siteName: 'Blog - AugurRank',
  url: DOMAIN_NAME,
  type: 'article',
  images: [DOMAIN_NAME + '/twitter-card-image-pattern1.png'],
};
