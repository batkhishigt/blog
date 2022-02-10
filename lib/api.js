import client, { previewClient } from "lib/sanity";
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
    return builder.image(source)
}
export const getPaginatedPosts = async (page = 1, limit = 2) => {
    const posts = await client.fetch(`*[_type=="post"]{_createdAt, title,subtitle, 'image':cover_image.asset->url, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}| order(date desc)[${(page) * limit}...${(page + 1) * limit}]`);
    return posts;
}
export const getAllPosts = async () => {
    const posts = await client.fetch(`*[_type=="post"]{_createdAt, title,subtitle, 'image':cover_image.asset->url, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}| order(date desc)`);
    return posts;
}
export const getPostBySlug = async (slug, preview = false) => {
    let myClient = preview ? previewClient : client;
    const post = await myClient.fetch(`*[_type=="post" && slug.current==$slug]{_createdAt, title,subtitle,content[]{..., 'asset':asset->} ,cover_image, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}`, { slug });
    return post;
}
