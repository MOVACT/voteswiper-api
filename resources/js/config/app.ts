const app = {
    assetsPublicUrl: import.meta.env.DEV
        ? 'https://voteswiper-uploads-dev.s3.eu-central-1.amazonaws.com/'
        : 'https://cdn.voteswiper.org/',
};

export default app;
