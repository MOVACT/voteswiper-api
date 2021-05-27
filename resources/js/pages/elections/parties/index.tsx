import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconArrowLeft, IconEye, IconPlus } from '@tabler/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import { Layout } from '../../../components/layout';
import { Page } from '../../../components/page';
import cdn from '../../../util/cdn';

interface Props {
    election: Election;
    parties: Party[];
}

const Parties: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();
    const { election } = props;

    console.log(election);

    return (
        <Page
            title={
                <div>
                    <small className="fs-6 text-sm text-secondary">
                        <InertiaLink
                            href={route('admin.elections')}
                            className="d-flex"
                        >
                            <IconArrowLeft size={14} />
                            {election.name}
                        </InertiaLink>
                    </small>
                    <div>Parties</div>
                </div>
            }
            actions={
                <div className="btn-list">
                    <InertiaLink
                        href={route('admin.election.parties.create', {
                            election: election.id,
                        })}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Attach new party
                    </InertiaLink>
                </div>
            }
        >
            <Helmet title={`Parties for ${election.name}`} />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-striped table-hover card-table">
                                <thead>
                                    <tr>
                                        <th className="w-1">Party ID</th>
                                        <th>Logo</th>
                                        <th>Party</th>
                                        <th>Status</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.parties.map((party) => {
                                        return (
                                            <tr key={party.id}>
                                                <td>{party.id}</td>
                                                <td>
                                                    <img
                                                        src={cdn(
                                                            party.logo.filename
                                                        )}
                                                        alt=""
                                                        height="auto"
                                                        width={40}
                                                    />
                                                </td>
                                                <td>{party.name}</td>
                                                <td>
                                                    {party.pivot.published ? (
                                                        <span className="badge bg-success me-2">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-danger me-2">
                                                            Unpublished
                                                        </span>
                                                    )}
                                                    {party.pivot.playable ? (
                                                        <span className="badge bg-success">
                                                            Playable
                                                        </span>
                                                    ) : (
                                                        <span className="badge bg-danger">
                                                            Not playable
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.parties.answers',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                    party:
                                                                        party.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Answers
                                                            <span className="badge bg-primary ms-1">
                                                                {
                                                                    party.pivot
                                                                        .answers_count
                                                                }
                                                                /
                                                                {
                                                                    election.questions_count
                                                                }
                                                            </span>
                                                        </InertiaLink>
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.parties.edit',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                    party:
                                                                        party.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
                                                        </InertiaLink>

                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.parties.show',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                    party:
                                                                        party.id,
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

Parties.layout = (page) => <Layout>{page}</Layout>;

export default Parties;
