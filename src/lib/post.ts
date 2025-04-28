//? Node.js File System Module
import fs from "fs";
//? Node.js Path Module | Handling File Paths
import path from "path";
//? Gray Matter | Parse Frontmatter from MDX Files
import matter from "gray-matter";

//? Define path to blog content directory
const contentDir = path.join(process.cwd(), 'src/content');

//? Function: Get metadata from all blog posts
export function getAllPosts() {
  //* Read all file names from the blog directory
  const files = fs.readdirSync(contentDir);
  //? Loop through each file & extract metadata
  return files.map((filename) => {
    //* Get full path of the file
    const filePath = path.join(contentDir, filename);
    //* Read the file content as a string
    const source = fs.readFileSync(filePath, 'utf-8');
    //* Use gray-matter to parse frontmatter (title, date, etc.)
    const { data } = matter(source);

    //? Return metadata and slug (filename without extension)
    return {
      slug: filename.replace(/\.mdx?$/, ''), //* Remove .mdx extension
      title: data.title,
      description: data.description,
      publishedAt: data.publishedAt,
      image: data.image,
      breadcrumb: data.breadcrumb,
      fullSlug: data.fullSlug,
      ...data, //* Spread frontmatter into object (e.g., title, date)
    };
  });
}

//? Function: Get content and metadata of a single post by slug
export function getPostBySlug(slug: string) {
  //* Build the full path to the MDX file using the slug
  const filePath = path.join(contentDir, `${slug}.mdx`);
  //* Read the file contents
  const source = fs.readFileSync(filePath, 'utf-8');
  //* Parse the content and frontmatter using gray-matter
  const { content, data } = matter(source);

  //? Return content and metadata as an object
  return { content, metadata: data };
}
