import client from "lib/sanity";
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
export const urlFor = (source) => {
    return builder.image(source)
}
export const getAllPosts = async () => {
    const posts = await client.fetch(`*[_type=="post"]{_createdAt, title,subtitle, 'image':cover_image.asset->url, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}`);
    return posts;
}
export const getPostBySlug = async (slug) => {
    const post = await client.fetch(`*[_type=="post" && slug.current==$slug]{_createdAt, title,subtitle,content[]{..., 'asset':asset->} ,cover_image, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}`, { slug });
    return post;
}
