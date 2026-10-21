import { Head, Link, usePage } from '@inertiajs/react';
import { IconPlus } from '@tabler/icons-react';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props extends GlobalProps {
    users: Array<{
        id: number;
        name: string;
        email: string;
    }>;
}

const Users: InertiaPage = () => {
    const { props } = usePage<Props>();

    const { users } = props;

    return (
        <Page
            title="All Users"
            actions={
                <div className="btn-list">
                    <Link
                        href={route('admin.users.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new user
                    </Link>
                </div>
            }
        >
            <Head title="All Users" />

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
                                                        <Link
                                                            href={route(
                                                                'admin.users.edit',
                                                                {
                                                                    user: user.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
                                                        </Link>
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
