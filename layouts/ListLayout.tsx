'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

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
    <div className="pb-8 pt-6">
      <nav className="flex justify-between text-sm">
        {!prevPage && (
          <span className="cursor-auto text-gray-400">Previous</span>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Previous
          </Link>
        )}
        <span className="text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <span className="cursor-auto text-gray-400">Next</span>
        )}
        {nextPage && (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayout({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogPosts = posts.filter((post) => {
    const searchContent = post.title + post.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles..."
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!filteredBlogPosts.length && 'No posts found.'}
          {displayPosts.map((post) => {
            const { path, date, title, summary } = post
            return (
              <li key={path} className="py-12">
                <article className="space-y-2">
                  <div className="flex flex-col space-y-1">
                    <h2 className="text-2xl font-bold tracking-tight">
                      <Link
                        href={`/${path}`}
                        className="text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400"
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                  </div>
                  <p className="prose text-gray-500 dark:text-gray-400 line-clamp-3">
                    {summary}
                  </p>
                  <div className="text-sm">
                    <Link
                      href={`/${path}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}