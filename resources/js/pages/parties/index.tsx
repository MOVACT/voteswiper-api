import { Head, Link, usePage } from '@inertiajs/react';
import { IconEye, IconPlus } from '@tabler/icons-react';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';
import cdn from '../../util/cdn';

interface Props extends GlobalProps {
    parties: Party[];
}

const Parties: InertiaPage = () => {
    const { props } = usePage<Props>();
    const { parties } = props;

    return (
        <Page
            title="All Parties"
            actions={
                <div className="btn-list">
                    <Link
                        href={route('admin.parties.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new party
                    </Link>
                </div>
            }
        >
            <Head title="All Parties" />

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
                                                        <Link
                                                            href={route(
                                                                'admin.parties.edit',
                                                                {
                                                                    party: party.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Link
                                                            href={route(
                                                                'admin.parties.show',
                                                                {
                                                                    party: party.id,
                                                                }
                                                            )}
                                                            className="btn btn-icon btn-white"
                                                        >
                                                            <IconEye
                                                                size={24}
                                                            />
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

Parties.layout = (page) => <Layout>{page}</Layout>;

export default Parties;
