import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconEye, IconPlus } from '@tabler/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';
import cdn from '../../util/cdn';

interface Props {
    parties: Party[];
}

const Parties: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();
    const { parties } = props;

    return (
        <Page
            title="All Parties"
            actions={
                <div className="btn-list">
                    <InertiaLink
                        href={route('admin.parties.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new party
                    </InertiaLink>
                </div>
            }
        >
            <Helmet title="All Parties" />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className="w-1">ID</th>
                                        <th className="w-1">Logo</th>
                                        <th>Name</th>
                                        <th>Full Name</th>
                                        <th>Country</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parties.map((party) => {
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
                                                <td>{party.full_name}</td>
                                                <td>{party.country.name}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.parties.edit',
                                                                {
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
                                                                'admin.parties.show',
                                                                {
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
