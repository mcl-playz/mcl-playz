import { error, } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked, type Renderer } from 'marked';

const renderer: Partial<Renderer> = {
    link(this: any, { href, title, tokens }) {
        const renderedText = this.parser.parseInline(tokens);

        const isExternal = href.startsWith('http');
        const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
        
        return `<a href="${href}"${target}${title ? ` title="${title}"` : ''}>${renderedText}↗</a>`;
    }
};

marked.use({ renderer });

const slugify = (text: string) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-');    // Replace multiple - with single -
};

const getWordCount = (content: string): number => {
    const cleanText = content
        .replace(/[#*`_~]/g, '')                 // Remove symbols like #, *, `, _, ~
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Keep link text, remove URL
        .replace(/!\[[^\]]*\]\([^)]+\)/g, '')    // Remove images entirely
        .trim();

    const words = cleanText.split(/\s+/).filter(word => word.length > 0);
    
    return words.length;
}

export const load = async ({ params }) => {
    const { slug } = params;

    const contentPath = path.join(process.cwd(), 'blog');
    if (!fs.existsSync(contentPath)) {
        throw error(500, 'Content directory missing');
    }
    const filenames = fs.readdirSync(contentPath);

    let matchedPost = null;
    for (const filename of filenames) {
        if (!filename.endsWith('.md')) continue;

        const fullPath = path.join(contentPath, filename);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const { data, content } = matter(fileContent);

        // Use defined slug OR slugified title OR filename (as last resort)
        const postSlug = data.slug || (data.title ? slugify(data.title) : filename.replace('.md', ''));

        if (postSlug === slug) {
            matchedPost = { data, content };
            break;
        }
    }

    if (!matchedPost || matchedPost.data.draft) {
        throw error(404, 'Post not found');
    }

    const wordCount = getWordCount(matchedPost.content)
    const wpm = 225;
    const readingTime = wordCount < wpm ? "<1" : Math.ceil(wordCount / wpm);
    const html = await marked.parse(matchedPost.content);

    return {
        meta: matchedPost.data,
        content: html,
        stats: {
            wordCount,
            readingTime
        }
    };
};