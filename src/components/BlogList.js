import { BlogListItem } from '@/components/BlogListItem';

export function BlogList(props) {
  const { blogInfos } = props;

  return (
    <div className="relative sm:ml-[calc(2rem+1px)] sm:pb-12 md:ml-[calc(3.5rem+1px)] lg:ml-[max(calc(14.5rem+1px),calc(100%-48rem))]">
      <div className="space-y-16">
        {blogInfos.map(blogInfo => (
          <BlogListItem key={blogInfo.slug} blogInfo={blogInfo} />
        ))}
      </div>
    </div>
  );
}
