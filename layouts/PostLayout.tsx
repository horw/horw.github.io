import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="space-y-6 py-8">
          <div className="text-center">
            <time dateTime={date} className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
            </time>
            <PageTitle>{title}</PageTitle>
          </div>

          {/* Author Section */}
          <div className="border-y border-gray-200 py-4 dark:border-gray-800">
            <ul className="flex flex-wrap justify-center gap-6">
              {authorDetails.map((author) => (
                <li className="flex items-center space-x-3" key={author.name}>
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      width={40}
                      height={40}
                      alt={author.name}
                      className="rounded-full"
                    />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{author.name}</p>
                    {author.twitter && (
                      <Link
                        href={author.twitter}
                        className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {author.twitter
                          .replace('https://twitter.com/', '@')
                          .replace('https://x.com/', '@')}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Main Content */}
        <div className="prose max-w-none pb-8 dark:prose-invert">{children}</div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-3 pb-8">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Article Navigation */}
        {(next || prev) && (
          <nav className="mb-8 grid grid-cols-1 gap-6 border-t border-gray-200 pt-8 dark:border-gray-800 sm:grid-cols-2">
            {prev && prev.path && (
              <div>
                <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                  Previous Article
                </span>
                <Link
                  href={`/${prev.path}`}
                  className="text-lg font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
                  ← {prev.title}
                </Link>
              </div>
            )}
            {next && next.path && (
              <div className="text-right">
                <span className="mb-2 block text-sm text-gray-500 dark:text-gray-400">
                  Next Article
                </span>
                <Link
                  href={`/${next.path}`}
                  className="text-lg font-medium text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                >
                  {next.title} →
                </Link>
              </div>
            )}
          </nav>
        )}

        {/* Social Links & Comments */}
        <footer className="border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between py-6">
            <Link
              href={`/${basePath}`}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Back to blog</span>
            </Link>
            <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <Link
                href={editUrl(filePath)}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                View on GitHub
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </SectionContainer>
  )
}
