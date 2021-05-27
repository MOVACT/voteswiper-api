import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import { IconArrowLeft } from '@tabler/icons';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import Input from '../../../components/form/input';
import Textarea from '../../../components/form/textarea';
import Image from '../../../components/image';
import { Layout } from '../../../components/layout';
import { LocaleSwitch } from '../../../components/locale-switch';
import { Page } from '../../../components/page';

interface Props extends GlobalProps {
    election: Election;
    question?: Question;
}

const QuestionCreateOrEdit: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const { data, setData, post, put, processing, errors } = useForm({
        thesis: props.question ? props.question.thesis : '',
        topic: props.question ? props.question.topic : '',
        video_url: props.question ? props.question.video_url : '',
        explainer_text: props.question ? props.question.explainer_text : '',
        thumbnail_upload_id: props.question
            ? props.question.thumbnail_upload_id
            : '',
        thumbnail: null,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (props.question) {
            put(
                route('admin.election.questions.update', {
                    election: props.election.id,
                    question: props.question.id,
                }),
                data
            );
            return;
        }

        post(
            route('admin.election.questions.store', {
                election: props.election.id,
            }),
            data
        );
    };

    const pageTitle = props.question
        ? `Edit question ${props.question.thesis}`
        : `Add new question to ${props.election.name}`;

    return (
        <Page
            title={
                <>
                    {props.question ? (
                        <div>
                            <small className="fs-6 text-sm text-secondary">
                                <InertiaLink
                                    href={route('admin.election.questions', {
                                        election: props.election.id,
                                    })}
                                    className="d-flex"
                                >
                                    <IconArrowLeft size={14} />
                                    {props.election.name}
                                </InertiaLink>
                            </small>
                            <div>Edit question {props.question.thesis}</div>
                        </div>
                    ) : (
                        <>Add new question to ${props.election.name}</>
                    )}
                </>
            }
        >
            <Helmet title={pageTitle} />
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                action={
                    props.question
                        ? route('admin.election.questions.update', {
                              election: props.election.id,
                              question: props.question.id,
                          })
                        : route('admin.election.questions.store', {
                              election: props.election.id,
                          })
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
                                        props.question
                                            ? props.election
                                                  .translations_available
                                            : ['en']
                                    }
                                />
                            </div>
                            <div className="card-body">
                                <Input
                                    error={!!errors.topic}
                                    helperText={errors.topic ?? undefined}
                                    required
                                    disabled={processing}
                                    id="topic"
                                    label="Topic"
                                    value={data.topic}
                                    onChange={(e) =>
                                        setData('topic', e.target.value)
                                    }
                                />
                                <Input
                                    error={!!errors.thesis}
                                    helperText={errors.thesis ?? undefined}
                                    required
                                    disabled={processing}
                                    id="thesis"
                                    label="Thesis"
                                    value={data.thesis}
                                    onChange={(e) =>
                                        setData('thesis', e.target.value)
                                    }
                                />
                                <Input
                                    error={!!errors.video_url}
                                    helperText={errors.video_url ?? undefined}
                                    disabled={processing}
                                    id="video_url"
                                    label="Video URL"
                                    value={data.video_url}
                                    onChange={(e) =>
                                        setData('video_url', e.target.value)
                                    }
                                />

                                <Textarea
                                    rows={8}
                                    error={!!errors.explainer_text}
                                    helperText={
                                        errors.explainer_text ?? undefined
                                    }
                                    disabled={processing}
                                    id="explainer_text"
                                    label="Explainer Text"
                                    value={data.explainer_text}
                                    onChange={(e) =>
                                        setData(
                                            'explainer_text',
                                            e.target.value
                                        )
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
                                    type="file"
                                    label="Thumbnail"
                                    error={!!errors.thumbnail}
                                    helperText={errors.thumbnail ?? undefined}
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files[0]
                                        ) {
                                            setData(
                                                'thumbnail',
                                                e.target.files[0]
                                            );
                                        }
                                    }}
                                />

                                {props.question && props.question.thumbnail && (
                                    <Image file={props.question.thumbnail} />
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
                                    Save question
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

QuestionCreateOrEdit.layout = (page) => <Layout>{page}</Layout>;

export default QuestionCreateOrEdit;
