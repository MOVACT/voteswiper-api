import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { IconPencil } from '@tabler/icons-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { LocaleWithFlag } from '../../components/locale-with-flag';
import { Page } from '../../components/page';
import { getTranslatedValue } from '../../util/get-translated-value';

interface Props extends GlobalProps {
    country: CountryWithTranslations;
}

const CountriesShow: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();
    const { country } = props;

    const pageTitle = getTranslatedValue(country.name, 'en', 'Show Country');

    return (
        <Page title={pageTitle}>
            <Helmet title={pageTitle} />

            <div className="row row-cards">
                {props.locales.map((language) => {
                    return (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={language}
                        >
                            <div className="card">
                                <div className="card-header justify-content-between">
                                    <LocaleWithFlag locale={language} />

                                    <InertiaLink
                                        href={route('admin.locale', {
                                            key: language,
                                            redirect: route(
                                                'admin.countries.edit',
                                                { country: country.id }
                                            ),
                                        })}
                                        className="btn btn-icon btn-primary"
                                    >
                                        <IconPencil size={16} />
                                    </InertiaLink>
                                </div>

                                <table className="table table-vcenter card-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <strong>Name</strong>
                                            </td>
                                            <td>
                                                {getTranslatedValue(
                                                    country.name,
                                                    language
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <strong>Slug</strong>
                                            </td>
                                            <td>
                                                {getTranslatedValue(
                                                    country.slug,
                                                    language
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Page>
    );
};

CountriesShow.layout = (page) => <Layout>{page}</Layout>;

export default CountriesShow;
