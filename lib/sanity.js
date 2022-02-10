const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: "",
    useCdn: process.NODE_ENV === 'production'
});

export const previewClient = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: "skBnQPwmo8CvkzAFQagfCCeUM1lP1DiP5Ta1rtK4P2p6aMzTzsloujy08svSUMwm6UtyaSDcNTm0NYQ45YQxbn4qRCefFs4G1MoXWSmwNaHh6GyIaH8YrCtb58lBFvtp7K0nyfG7VrhIZeaZiDcpsWdlL1vGmIG7tgFN5qp16im2MgOAwn9n",
    useCdn: false
});
export default client;