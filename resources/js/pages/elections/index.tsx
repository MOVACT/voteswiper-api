import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconEye, IconPlus } from '@tabler/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props {
    elections: Election[];
}

const Elections: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();
    const { elections } = props;

    return (
        <Page
            title="All Elections"
            actions={
                <div className="btn-list">
                    <InertiaLink
                        href={route('admin.elections.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new election
                    </InertiaLink>
                </div>
            }
        >
            <Helmet title="All Elections" />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className="w-1">ID</th>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Country</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {elections.map((election) => {
                                        return (
                                            <tr key={election.id}>
                                                <td>{election.id}</td>
                                                <td>
                                                    {election.name}
                                                    <br />
                                                    <small className="text-muted">
                                                        <em>{election.slug}</em>
                                                    </small>
                                                </td>
                                                <td>
                                                    {election.published ? (
                                                        <span className="badge bg-success me-2">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-danger me-2">
                                                            Unpublished
                                                        </span>
                                                    )}
                                                    {election.playable ? (
                                                        <span className="badge bg-success">
                                                            Playable
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-danger">
                                                            Not playable
                                                        </span>
                                                    )}
                                                </td>
                                                <td>{election.country.name}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.parties',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                }
                                                            )}
                                                            className="btn btn-white me-3"
                                                        >
                                                            Parties
                                                            <span className="badge bg-primary ms-1">
                                                                {
                                                                    election.parties_count
                                                                }
                                                            </span>
                                                        </InertiaLink>
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.questions',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                }
                                                            )}
                                                            className="btn btn-white me-3"
                                                        >
                                                            Questions
                                                            <span className="badge bg-primary ms-1">
                                                                {
                                                                    election.questions_count
                                                                }
                                                            </span>
                                                        </InertiaLink>

                                                        <InertiaLink
                                                            href={route(
                                                                'admin.elections.edit',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
                                                        </InertiaLink>

                                                        <InertiaLink
                                                            href={route(
                                                                'admin.elections.show',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                }
                                                            )}
                                                            className="btn btn-icon btn-white"
                                                        >
                                                            <IconEye
                                                                size={24}
                                                            />
                                                        </InertiaLink>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
};

Elections.layout = (page) => <Layout>{page}</Layout>;

export default Elections;
