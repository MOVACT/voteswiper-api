import React from 'react';
import cdn from '../../util/cdn';

interface Props {
    file: Upload;
}

const Image: React.FC<Props> = ({ file }) => {
    return (
        <div className="mt-3">
            <img
                src={cdn(file.filename)}
                alt={file.alt_text || ''}
                className="img-thumbnail img-fluid"
                width={file.width || undefined}
                height={file.height || undefined}
            />
        </div>
    );
};

export default Image;
