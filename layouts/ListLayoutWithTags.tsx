'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { useState } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-10 flex justify-between">
      {!prevPage && (
        <span className="cursor-not-allowed rounded-lg px-4 py-2 text-gray-400">Previous</span>
      )}
      {prevPage && (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
          className="rounded-lg px-4 py-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Previous
        </Link>
      )}
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>
      {!nextPage && (
        <span className="cursor-not-allowed rounded-lg px-4 py-2 text-gray-400">Next</span>
      )}
      {nextPage && (
        <Link
          href={`/${basePath}/page/${currentPage + 1}`}
          className="rounded-lg px-4 py-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
        >
          Next
        </Link>
      )}
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const [isTagsOpen, setIsTagsOpen] = useState(false)

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="mx-auto max-w-6xl px-4">
      {/* Header */}
      <div className="space-y-8 pb-10 pt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          {title}
        </h1>

        {/* Tags Section */}
        <div className="space-y-4">
          <button
            onClick={() => setIsTagsOpen(!isTagsOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:bg-gray-800/50"
          >
            <span className="font-medium">
              {pathname.startsWith('/blog') ? (
                <span className="text-blue-600 dark:text-blue-400">All Posts</span>
              ) : (
                <Link
                  href="/blog"
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  All Posts
                </Link>
              )}
            </span>
            <svg
              className={`h-5 w-5 transform text-gray-500 transition-transform duration-200 ${
                isTagsOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isTagsOpen && (
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {sortedTags.map((t) => {
                  const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                  return (
                    <div key={t}>
                      {isActive ? (
                        <span className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          {`${t} (${tagData[t]})`}
                        </span>
                      ) : (
                        <Link
                          href={`/tags/${slug(t)}`}
                          className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          {`${t} (${tagData[t]})`}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 sm:grid-cols-2">
        {displayPosts.map((post) => {
          const { path, date, title: postTitle, summary } = post
          return (
            <div
              key={path}
              className="group relative rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <article>
                <Link href={`/${path}`} className="absolute inset-0" aria-label={postTitle} />
                <div className="flex flex-col space-y-4">
                  <time
                    dateTime={date}
                    className="text-sm text-gray-500 dark:text-gray-400"
                    suppressHydrationWarning
                  >
                    {formatDate(date, siteMetadata.locale)}
                  </time>
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
                    {postTitle}
                  </h2>
                  <p className="line-clamp-3 text-gray-500 dark:text-gray-400">{summary}</p>
                </div>
              </article>
            </div>
          )
        })}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
