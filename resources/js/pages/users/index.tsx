import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconPlus } from '@tabler/icons-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props {
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

const Users: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { users } = props;

    return (
        <Page
            title="All Users"
            actions={
                <div className="btn-list">
                    <InertiaLink
                        href={route('admin.users.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new user
                    </InertiaLink>
                </div>
            }
        >
            <Helmet title="All Users" />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className="w-1">ID</th>
                                        <th>Name</th>
                                        <th>E-Mail</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.users.edit',
                                                                {
                                                                    user: user.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
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

Users.layout = (page) => <Layout>{page}</Layout>;

export default Users;
