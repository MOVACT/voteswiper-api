import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useForm, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import Datepicker from '../../components/form/datepicker';
import Input from '../../components/form/input';
import Select from '../../components/form/select';
import Toggle from '../../components/form/toggle';
import Translations from '../../components/form/translations';
import Image from '../../components/image';
import { Layout } from '../../components/layout';
import { LocaleSwitch } from '../../components/locale-switch';
import { Page } from '../../components/page';

interface Props extends GlobalProps {
    election?: Election;
    countries: Country[];
}

const ElectionCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, put, processing, errors } = useForm({
        country_id: props.election ? props.election.country_id : '',
        name: props.election ? props.election.name : '',
        published: props.election ? props.election.published : false,
        playable: props.election ? props.election.playable : false,
        voting_day: props.election ? props.election.voting_day : '',
        playable_date: props.election ? props.election.playable_date : '',
        translations_available: props.election
            ? props.election.translations_available
            : ['en'],
        card_upload_id: props.election ? props.election.card_upload_id : '',
        card: null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.election) {
            put(
                route('admin.elections.update', {
                    election: props.election.id,
                }),
                data
            );
            return;
        }

        post(route('admin.elections.store'), data);
    };

    return (
        <Page
            title={
                props.election
                    ? `Edit election ${props.election.name}`
                    : 'Add new election'
            }
        >
            <Helmet
                title={props.election ? 'Edit Election' : 'Create Election'}
            />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                action={
                    props.election
                        ? route('admin.elections.update', {
                              election: props.election.id,
                          })
                        : route('admin.elections.store')
                }
                method="post"
            >
                <div className="row row-cards">
                    <div className="col-12 col-lg-6">
                        <div className="card">
                            <div className="card-header justify-content-between">
                                <h4 className="card-title">Translatable</h4>
                                <LocaleSwitch
                                    locales={
                                        props.election
                                            ? props.election
                                                  .translations_available
                                            : ['en']
                                    }
                                />
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
                                <Translations
                                    value={data.translations_available}
                                    onChange={(translations) => {
                                        setData(
                                            'translations_available',
                                            translations
                                        );
                                    }}
                                    label="Election available in"
                                    error={!!errors.translations_available}
                                    helperText={
                                        errors.translations_available ??
                                        undefined
                                    }
                                />

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
                                            <option
                                                key={country.id}
                                                value={country.id}
                                            >
                                                {country.name}
                                            </option>
                                        );
                                    })}
                                </Select>

                                <Datepicker
                                    error={!!errors.voting_day}
                                    helperText={errors.voting_day ?? undefined}
                                    required
                                    disabled={processing}
                                    id="voting_day"
                                    label="Voting day"
                                    value={data.voting_day}
                                    onChange={(date) =>
                                        setData('voting_day', date)
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

                                <Toggle
                                    checked={data.playable}
                                    onChange={(e) => {
                                        setData('playable', e.target.checked);
                                    }}
                                    label="Playable"
                                    error={!!errors.playable}
                                    helperText={errors.playable ?? undefined}
                                />

                                <Datepicker
                                    error={!!errors.playable_date}
                                    helperText={
                                        errors.playable_date ?? undefined
                                    }
                                    required
                                    disabled={processing}
                                    id="playable_date"
                                    showTimeSelect
                                    label="Playable date"
                                    value={data.playable_date}
                                    onChange={(date) =>
                                        setData('playable_date', date)
                                    }
                                />

                                <Input
                                    type="file"
                                    label="Card"
                                    error={!!errors.card}
                                    helperText={errors.card ?? undefined}
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setData('card', e.target.files[0]);
                                        }
                                    }}
                                />

                                {props.election && props.election.card && (
                                    <Image file={props.election.card} />
                                )}
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
                                    Save election
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

ElectionCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default ElectionCreateOrEdit;
