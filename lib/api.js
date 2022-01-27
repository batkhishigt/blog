import client from "lib/sanity";

export const getAllPosts = async () => {
    const posts = await client.fetch(`*[_type=="post"]{_createdAt, title,subtitle, 'image':cover_image.asset->url, date, 'slug':slug.current,'publisher': publisher->{title, 'picture': cover_image.asset->url}}`);
    return posts;

}