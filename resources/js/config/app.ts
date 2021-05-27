const app = {
    assetsPublicUrl:
        process.env.NODE_ENV === 'development'
            ? 'https://voteswiper-uploads-dev.s3.eu-central-1.amazonaws.com/'
            : 'https://cdn.voteswiper.org/',
};

export default app;
