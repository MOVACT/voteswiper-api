import { Head, Link, usePage } from '@inertiajs/react';
import { IconPlus } from '@tabler/icons-react';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Country {
    id: number;
    name: string;
    country_code: string;
    language_code: string;
    published: boolean;
    slug: string;
    parties_count: number;
}

interface Props extends GlobalProps {
    countries: Country[];
}

const Countries: InertiaPage = () => {
    const { props } = usePage<Props>();
    const { countries } = props;

    return (
        <Page
            title="All Countries"
            actions={
                <div className="btn-list">
                    <Link
                        href={route('admin.countries.create')}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new country
                    </Link>
                </div>
            }
        >
            <Head title="All Countries" />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter table-striped table-hover card-table">
                                <thead>
                                    <tr>
                                        <th className="w-1">ID</th>
                                        <th>Name</th>
                                        <th>Slug</th>
                                        <th>Status</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countries.map((country) => {
                                        return (
                                            <tr key={country.id}>
                                                <td>{country.id}</td>
                                                <td>{country.name}</td>
                                                <td>{country.slug}</td>
                                                <td>
                                                    {country.published ? (
                                                        <span className="badge text-bg-success">
                                                            Published
                                                        </span>
                                                    ) : (
                                                        <span className="badge text-bg-danger">
                                                            Unpublished
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <Link
                                                            href={route(
                                                                'admin.parties',
                                                                {
                                                                    country:
                                                                        country.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Parties
                                                            <span className="badge text-bg-primary ms-1">
                                                                {
                                                                    country.parties_count
                                                                }
                                                            </span>
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                'admin.countries.edit',
                                                                {
                                                                    country:
                                                                        country.id,
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

Countries.layout = (page) => <Layout>{page}</Layout>;

export default Countries;
