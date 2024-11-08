import { mdxInfos, twInfo, ogInfo } from '@/infos';
import { importMdxFile, isObject, isString } from '@/utils';
import { JoinNewsletter } from '@/components/JoinNewsletter';
import { BlogList } from '@/components/BlogList';

export async function generateMetadata() {
  const res = /** @type any */({ twitter: { ...twInfo }, openGraph: { ...ogInfo } });

  const title = 'Blog - AugurRank';
  res.title = title;
  res.twitter.title = title;
  res.openGraph.title = title;

  const description = 'Stay informed with all the latest AugurRank news straight from the team.';
  res.description = description;
  res.twitter.description = description;
  res.openGraph.description = description;

  return res;
}

export default async function Page() {

  const blogInfos = [];
  for (const mdxInfo of mdxInfos) {
    const { slug } = mdxInfo;
    const { metadata } = await importMdxFile(slug);

    let title = '', description = '', date = null;
    if (isObject(metadata)) {
      if (isString(metadata.title)) title = metadata.title;
      if (isString(metadata.description)) description = metadata.description;
      if (isString(metadata.date)) date = new Date(metadata.date);
    }

    blogInfos.push({ ...mdxInfo, title, description, date });
  }

  return (
    <>
      <JoinNewsletter />
      <BlogList blogInfos={blogInfos} />
    </>
  );
}
