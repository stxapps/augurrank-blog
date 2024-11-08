import { mdxInfos, twInfo, ogInfo } from '@/infos';
import { DOMAIN_NAME } from '@/types/const';
import { importMdxFile, isObject, isString, deriveMetaTitle } from '@/utils';
import { BlogEntry } from '@/components/BlogEntry';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const { metadata } = await importMdxFile(slug);

  const url = DOMAIN_NAME + '/' + slug;
  const res = /** @type any */({ twitter: { ...twInfo }, openGraph: { ...ogInfo, url } });
  if (isObject(metadata)) {
    if (isString(metadata.title)) {
      const title = deriveMetaTitle(metadata.title);
      res.title = title;
      res.twitter.title = title;
      res.openGraph.title = title;
    }
    if (isString(metadata.description)) {
      res.description = metadata.description;
      res.twitter.description = metadata.description;
      res.openGraph.description = metadata.description;
    }
  }
  return res;
}

export default async function Page({ params }) {
  const { slug } = params;

  const { default: Mdx, title, sections } = await importMdxFile(slug);
  return (
    <BlogEntry title={title} sections={sections}>
      <Mdx />
    </BlogEntry>
  );
}

export function generateStaticParams() {
  return mdxInfos.map(info => ({
    slug: info.slug,
  }));
}