const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: "",
    useCdn: process.NODE_ENV === 'production'
});

export default client;