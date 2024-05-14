import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import Input from '../../components/form/input';
import Toggle from '../../components/form/toggle';
import { Layout } from '../../components/layout';
import { LocaleSwitch } from '../../components/locale-switch';
import { Page } from '../../components/page';

interface Props extends GlobalProps {
    country?: {
        name: string;
        country_code: string;
        language_code: string;
        published: boolean;
        id: number;
    };
}

const CountryCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, put, processing, errors } = useForm({
        name: props.country ? props.country.name : '',
        country_code: props.country ? props.country.country_code : '',
        language_code: props.country ? props.country.language_code : '',
        published: props.country ? props.country.published : false,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.country) {
            put(route('admin.countries.update', { country: props.country.id }));
            return;
        }

        post(route('admin.countries.store'));
    };

    return (
        <Page
            title={
                props.country
                    ? `Edit country ${props.country.name}`
                    : 'Add new Country'
            }
        >
            <Helmet title={props.country ? 'Edit Country' : 'Create Country'} />
            <form
                onSubmit={submit}
                action={
                    props.country
                        ? route('admin.countries.update', {
                              country: props.country.id,
                          })
                        : route('admin.countries.store')
                }
                method="post"
            >
                <div className="row row-cards">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header justify-content-between">
                                <h4 className="card-title">Translatable</h4>
                                <LocaleSwitch locales={props.locales} />
                            </div>
                            <div className="card-body">
                                <Input
                                    error={!!errors.name}
                                    helperText={errors.name ?? undefined}
                                    required
                                    disabled={processing}
                                    id="name"
                                    label="Name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Global Fields</h4>
                            </div>
                            <div className="card-body">
                                <Input
                                    error={!!errors.country_code}
                                    helperText={
                                        errors.country_code ?? undefined
                                    }
                                    required
                                    disabled={processing}
                                    id="country_code"
                                    label="Country Code"
                                    value={data.country_code}
                                    onChange={(e) =>
                                        setData('country_code', e.target.value)
                                    }
                                />

                                <Input
                                    error={!!errors.language_code}
                                    helperText={
                                        errors.language_code ?? undefined
                                    }
                                    required
                                    disabled={processing}
                                    id="language_code"
                                    label="Language Code"
                                    value={data.language_code}
                                    onChange={(e) =>
                                        setData('language_code', e.target.value)
                                    }
                                />

                                <Toggle
                                    checked={data.published}
                                    onChange={(e) => {
                                        setData('published', e.target.checked);
                                    }}
                                    label="Published"
                                    error={!!errors.published}
                                    helperText={errors.published ?? undefined}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="card">
                            <div className="card-footer text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-auto"
                                    disabled={processing}
                                >
                                    Save country
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

CountryCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default CountryCreateOrEdit;
