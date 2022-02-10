import useSWR from "swr"
export const usePosts = (posts) => {
    const { data, error } = useSWR('api/posts', {
        initialData: posts
    });
    return {
        data,
        isLoading: !error && !data,
        error: error
    };
}