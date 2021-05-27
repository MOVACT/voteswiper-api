import { Page as InertiaPage } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';

interface Props {
    title: string | React.ReactElement;
    actions?: React.ReactElement;
}

interface PageProps {
    success?: string;
    error?: string;
}

export const Page: React.FC<Props> = ({ children, title, actions }) => {
    const { props } = usePage<InertiaPage<PageProps>>();
    const { success, error } = props;

    return (
        <>
            <div className="container-xl">
                <div className="page-header d-print-none">
                    <div className="row align-items-center">
                        <div className="col">
                            <h2 className="page-title">{title}</h2>
                        </div>
                        <div className="col-auto ms-auto d-print-none">
                            {actions}
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-body">
                {(success || error) && (
                    <div className="container-xl pb-2">
                        {success && (
                            <div className="alert alert-success" role="alert">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                    </div>
                )}
                <div className="container-xl">{children}</div>
            </div>
        </>
    );
};
