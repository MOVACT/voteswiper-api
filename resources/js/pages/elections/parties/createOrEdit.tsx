import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import { IconArrowLeft } from '@tabler/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import Input from '../../../components/form/input';
import Select from '../../../components/form/select';
import Toggle from '../../../components/form/toggle';
import Image from '../../../components/image';
import { Layout } from '../../../components/layout';
import { Page } from '../../../components/page';

interface Props extends GlobalProps {
    election: Election;
    party?: Party;
    pivot?: ElectionPartyPivot;
    parties: Party[];
}

const PartyCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, processing, errors } = useForm({
        party_id: props.party ? props.party.id : '',
        published: props.pivot ? props.pivot.published : false,
        playable: props.pivot ? props.pivot.playable : false,
        program_link: props.pivot ? props.pivot.program_link : '',
        program_upload_id: props.pivot ? props.pivot.program_upload_id : '',
        program: null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.party) {
            post(
                `${route('admin.election.parties.update', {
                    election: props.election.id,
                    party: props.party.id,
                })}?_method=PUT`,
                data
            );
            return;
        }

        post(
            route('admin.election.parties.store', {
                election: props.election.id,
            }),
            data
        );
    };

    const pageTitle = props.party
        ? `Edit party ${props.party.name} on ${props.election.name}`
        : `Attach new party to ${props.election.name}`;

    return (
        <Page
            title={
                <div>
                    <small className="fs-6 text-sm text-secondary">
                        <InertiaLink
                            href={route('admin.election.parties', {
                                election: props.election.id,
                            })}
                            className="d-flex"
                        >
                            <IconArrowLeft size={14} />
                            {props.election.name}
                        </InertiaLink>
                    </small>
                    {props.party ? (
                        <div>
                            Edit party {props.party.name} on{' '}
                            {props.election.name}
                        </div>
                    ) : (
                        <div>Attach new party to {props.election.name}</div>
                    )}
                </div>
            }
        >
            <Helmet title={pageTitle} />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                action={
                    props.party
                        ? route('admin.election.parties.update', {
                              election: props.election.id,
                              party: props.party.id,
                          })
                        : route('admin.election.parties.store', {
                              election: props.election.id,
                          })
                }
                method="post"
            >
                <div className="row row-cards">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Global Fields</h4>
                            </div>
                            <div className="card-body">
                                {!props.pivot && (
                                    <Select
                                        required
                                        value={data.party_id}
                                        error={!!errors.party_id}
                                        onChange={(e) => {
                                            setData('party_id', e.target.value);
                                        }}
                                        label="Party"
                                    >
                                        <option aria-label="Select" value="">
                                            Please choose
                                        </option>
                                        {props.parties.map((party) => {
                                            return (
                                                <option
                                                    key={party.id}
                                                    value={party.id}
                                                >
                                                    {party.name}
                                                </option>
                                            );
                                        })}
                                    </Select>
                                )}

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

                                <Input
                                    type="file"
                                    label="Election program PDF"
                                    error={!!errors.program}
                                    helperText={errors.program ?? undefined}
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setData(
                                                'program',
                                                e.target.files[0]
                                            );
                                        }
                                    }}
                                />

                                {props.pivot && props.pivot.program && (
                                    <Image file={props.pivot.program} />
                                )}

                                <Input
                                    error={!!errors.program_link}
                                    helperText={
                                        errors.program_link ??
                                        'Full URL with http in front'
                                    }
                                    disabled={processing}
                                    id="program_link"
                                    label="Program Link (Website)"
                                    value={data.program_link}
                                    onChange={(e) =>
                                        setData('program_link', e.target.value)
                                    }
                                />
                            </div>

                            <div className="card-footer text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-auto"
                                    disabled={processing}
                                >
                                    Save party on election
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

PartyCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default PartyCreateOrEdit;
