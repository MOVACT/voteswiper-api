import app from '../config/app';

const cdn = (fileName: string): string => {
    return app.assetsPublicUrl + fileName;
};

export default cdn;
