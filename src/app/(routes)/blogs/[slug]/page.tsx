//? REACT.JS BUILT-IN
import React, { Suspense, cache } from "react";
//? NEXT.JS MODULES
import Image from "next/image";
//? NODE.JS MODULES
import path from "path";
import fs from "fs";
//? GRAY MATTER
import matter from "gray-matter";
//? REACT ICONS | Icon Library
import { VscCalendar } from "react-icons/vsc";
//? LIBRARY 
import { getAllPosts } from "../../../../lib/post";
//? CUSTOM UI
import Breadcrumbs from "@/app/(custom)/ui/breadcrumbs";
import ViewCounter from "@/app/(custom)/ui/view-counter";
import { LoadingSpinner } from "@/app/(custom)/ui/loading-spinner";
//? DATABASE QUERIES
import { getViewsCount } from "@/app/(data)/db/queries";
import { increment } from "@/app/(data)/db/actions";

//? FORMAT THE DATE DAY/MONTH/YEAR AGO
function formateDate(date: string) {
  //* VAR: Store today's date
  const currentDate = new Date();
  //* VAR: Store target date
  const targetDate = new Date(date);
  //* VAR: Get current year - target date year
  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  //* VAR: Get current month - target date month
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  //* VAR: Get current date - target date 
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  //* VAR: String to store the formatted date
  let formattedDate = "";

  //? CONDITIONAL STATEMENT: Checks if today/month/year ago
  //* CONDITIONAL STATEMENT: Checks if it's more than a year ago
  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
    //* CONDITIONAL STATEMENT: Checks if it's more than a month ago
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
    //* CONDITIONAL STATEMENT: Checks if it's more than a day ago
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
    //* CONDITIONAL STATEMENT: If none above conditions met, it's today
  } else {
    formattedDate = 'Today';
  }
  
  //* VAR: Get the full date in a human-readable format
  const fullDate = targetDate.toLocaleString('en-us', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  //? Return the formatted date including the human-readable date and the time ago
  return `${fullDate} (${formattedDate})`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  //? Get slug from URL
  const  { slug } = await params;

  //? Get MDX content
  const { default: Post } = await import(`@/content/${slug}.mdx`);

  //? Build the path to the blog file based on the slug
  const filePath = path.join(process.cwd(), 'src/content', `${slug}.mdx`);

  //? Read the file contents
  const source = fs.readFileSync(filePath, 'utf8');

  //? Use gray-matter to parse frontmatter and content
  const { data } = matter(source);

  //? DYNAMIC BREADCRUMBS
  const breadcrumbData = [
    { label: "Home", href: "/", active: false },
    { label: "Featured Blogs", href: "/blogs", active: false },
    { label: data.breadcrumb, href: `/blogs/${data.slug}`, active: true },
  ];

  return  (
    <div className="display-flex-center__container">
      <div className="article__container">
        <div className="article__content">
          {/* BLOG TITLE */}
          <h1 className="display-3 fw-bold mb-4 mb-md-5 pb-2">{data.title}</h1>
          {/* BREADCRUMBS BAR */}
          <Breadcrumbs breadcrumbs={breadcrumbData} />
          {/* BLOG PREVIEW IMAGE */}
          {data.image && (
            <Image
              src={data.image} 
              alt={data.title} 
              width={300}
              height={200}
              className="img-theme w-100 mb-4"
            />
          )}
          <div className="d-flex justify-content-between">
            {/* BLOG DATE */}
            <time
              className="d-block" 
              dateTime={data.publishedAt}
            >
              <div className="d-flex align-items-center mb-4 ml-2 mt-2">
                <VscCalendar 
                  style={{ 
                    width: '1rem', 
                    height: 'auto', 
                    marginRight: '0.2rem'
                  }} 
                />
                <span className="d-none d-md-block pl-1">Published on</span> 
                {/* BLOG DATE PUBLISHED */}
                {/* <span className="mx-1">{format(new Date(data.publishedAt), 'LLLL d, yyyy')}</span> */}
                {/* BLOG PUBLISHED X DAYS AGO */}
                <span className="mx-2">{formateDate(data.publishedAt)}</span>
              </div>
            </time>
            <div className="px-3 mt-2 d-flex" id="viewCounter">
              {/* JSX code with 'Suspense' for lazy loading the 'Views' component */}
              <Suspense fallback={<LoadingSpinner />}>
                {/* Render 'Views' component w/ specified 'slug' */}
                <Views slug={data.fullSlug} />
              </Suspense>
            </div>
          </div>
          {/* BLOG POST CONTENT | MDX */}
          <Post />     
        </div>
      </div>
    </div>
  );
}

//? Create a cached version of the 'increment' function
const incrementViews = cache(increment);

//? Define asynchronous function named 'Views'
async function Views({ slug }: { slug: string }) {
  
  //* Fetch the current view counts for the specified blog post using 'getViewsCount'.
  const views = await getViewsCount();

  //* Increment the views count using the cached 'increment' function.
  incrementViews(slug);

  //? Return the 'ViewCounter' component with the fetched view counts and provided 'slug'.
  return <ViewCounter allViews={views} slug={slug} />;
}

//* Async function to generate static params
export async function generateStaticParams() {
  //* Get all posts
  const posts = await getAllPosts();

  //* Return an array of slug objects
  return posts.map((post) => ({
    //* Get the slug from each post
    slug: post.slug,
  }));
}
