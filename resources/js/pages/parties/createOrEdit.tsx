import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import Input from '../../components/form/input';
import Select from '../../components/form/select';
import Image from '../../components/image';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props extends GlobalProps {
    party?: Party;
    countries: Country[];
}

const PartyCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, processing, errors } = useForm({
        country_id: props.party ? props.party.country_id : '',
        name: props.party ? props.party.name : '',
        full_name: props.party ? props.party.full_name : '',
        url: props.party ? props.party.url : '',
        logo_upload_id: props.party ? props.party.logo_upload_id : '',
        logo: null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.party) {
            // We're using post here with an additional field because
            // PHP won't read a file from a put request
            post(
                `${route('admin.parties.update', {
                    party: props.party.id,
                })}?_method=PUT`
            );
            return;
        }

        post(route('admin.parties.store'));
    };

    return (
        <Page
            title={
                props.party ? `Edit party ${props.party.name}` : 'Add new Party'
            }
        >
            <Helmet title={props.party ? 'Edit Party' : 'Create Party'} />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                action={
                    props.party
                        ? route('admin.parties.update', {
                              party: props.party.id,
                          })
                        : route('admin.parties.store')
                }
                method="post"
            >
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Global Fields</h4>
                    </div>
                    <div className="card-body">
                        <Select
                            required
                            value={data.country_id}
                            error={!!errors.country_id}
                            onChange={(e) => {
                                setData('country_id', e.target.value);
                            }}
                            label="Country"
                        >
                            <option aria-label="Select" value="" />
                            {props.countries.map((country) => {
                                return (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                );
                            })}
                        </Select>
                        <Input
                            error={!!errors.name}
                            helperText={errors.name ?? undefined}
                            required
                            disabled={processing}
                            id="name"
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <Input
                            error={!!errors.full_name}
                            helperText={errors.full_name ?? undefined}
                            required
                            disabled={processing}
                            id="full_name"
                            label="Full Name"
                            value={data.full_name}
                            onChange={(e) =>
                                setData('full_name', e.target.value)
                            }
                        />

                        <Input
                            error={!!errors.url}
                            helperText={
                                errors.url ?? 'Full URL with http in front'
                            }
                            required
                            disabled={processing}
                            id="url"
                            label="URL (Website)"
                            value={data.url ?? ''}
                            onChange={(e) => setData('url', e.target.value)}
                        />

                        <Input
                            type="file"
                            label="Logo"
                            error={!!errors.logo}
                            helperText={errors.logo ?? undefined}
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    // @ts-expect-error Typing
                                    setData('logo', e.target.files[0]);
                                }
                            }}
                        />

                        {props.party && props.party.logo && (
                            <Image file={props.party.logo} />
                        )}
                    </div>

                    <div className="card-footer text-end">
                        <button
                            type="submit"
                            className="btn btn-primary ms-auto"
                            disabled={processing}
                        >
                            Save party
                        </button>
                    </div>
                </div>
            </form>
        </Page>
    );
};

PartyCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default PartyCreateOrEdit;
