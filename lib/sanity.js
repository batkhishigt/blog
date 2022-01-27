const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: "",
    useCdn: process.NODE_ENV === 'production'
});

export default client;