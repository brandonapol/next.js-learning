import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

//! This page would be your API calls page IRL

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // remove .md from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // read mrkdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // use grey matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // combine data with id
        return {
            id, 
            ...matterResult.data,
        };
    });
    // sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}