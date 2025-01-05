import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  return (
    <>
      <div className="space-y-12">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest Articles
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        {/* Featured Post - First post gets special treatment */}
        {posts.length > 0 && (
          <div className="group relative rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
            <article>
              <Link
                href={`/blog/${posts[0].slug}`}
                className="absolute inset-0"
                aria-label={posts[0].title}
              />
              <div className="flex flex-col space-y-4">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={posts[0].date}>
                    {formatDate(posts[0].date, siteMetadata.locale)}
                  </time>
                </div>
                <h2 className="text-3xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {posts[0].title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                  {posts[0].summary}
                </p>
              </div>
            </article>
          </div>
        )}

        {/* Remaining Posts Grid */}
        {posts.length > 1 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {posts.slice(1, MAX_DISPLAY).map((post) => (
              <div
                key={post.slug}
                className="group relative rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="absolute inset-0"
                    aria-label={post.title}
                  />
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>
                        {formatDate(post.date, siteMetadata.locale)}
                      </time>
                    </div>
                    <h2 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* View All Articles Link */}
      {posts.length > MAX_DISPLAY && (
        <div className="mt-12 flex justify-center">
          <Link
            href="/blog"
            className="rounded-full bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 dark:hover:bg-blue-500"
          >
            View all articles
          </Link>
        </div>
      )}


    </>
  )
}