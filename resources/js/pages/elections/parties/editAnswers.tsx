import { Page as PageType } from '@inertiajs/inertia';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaLink, useForm, usePage } from '@inertiajs/inertia-react';
import { IconArrowLeft } from '@tabler/icons';
import cn from 'classnames';
import React from 'react';
import { Helmet } from 'react-helmet';
import route from 'ziggy-js';
import Answer from '../../../components/form/answer';
import Textarea from '../../../components/form/textarea';
import { Layout } from '../../../components/layout';
import { Page } from '../../../components/page';

interface Props extends GlobalProps {
    election: Election;
    party: Party;
    questions: Question[];
    pivot: ElectionPartyPivot;
}

const PartyEditAnswers: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    const getAnswer = React.useCallback(
        (id: number) => {
            const answerIndex = props.pivot.answers.findIndex(
                (a) => a.question_id === id
            );

            if (answerIndex > -1) {
                return {
                    answer: props.pivot.answers[answerIndex].answer,
                    reason: props.pivot.answers[answerIndex].reason,
                };
            }

            return {
                answer: 0,
                reason: '',
            };
        },
        [props.pivot]
    );

    const getInitialFormState = React.useCallback(() => {
        const formState = {} as { [key: string]: number | string };

        props.questions.map((question) => {
            const answer = getAnswer(question.id);
            formState[`answer_${question.id}`] = answer.answer;
            formState[`reason_${question.id}`] = answer.reason;
        });

        return formState;
    }, [props.questions, getAnswer]);

    const { data, setData, post, processing, errors } = useForm(
        getInitialFormState()
    );

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        post(
            route('admin.election.parties.answers.store', {
                election: props.election.id,
                party: props.party.id,
            }),
            data
        );
    };

    const pageTitle = `Edit answers for party ${props.party.name} on ${props.election.name}`;

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
                    <div>
                        Edit answers for {props.party.name} on{' '}
                        {props.election.name}
                    </div>
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
                    {props.questions.map((question, index) => {
                        const reasonFieldName = `reason_${question.id}`;
                        const answerFieldName = `answer_${question.id}`;
                        console.log(data, reasonFieldName);
                        return (
                            <div key={question.id} className="col-12">
                                <div className="card">
                                    <div
                                        className={cn(
                                            'card-header',
                                            data[answerFieldName] === 2 &&
                                                'bg-success text-white',
                                            data[answerFieldName] === 1 &&
                                                'bg-danger text-white'
                                        )}
                                    >
                                        <h4 className="card-title">
                                            {index + 1}. {question.thesis}
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12 col-lg-6">
                                                <Answer
                                                    error={
                                                        !!errors[
                                                            answerFieldName
                                                        ]
                                                    }
                                                    helperText={
                                                        errors[answerFieldName]
                                                    }
                                                    disabled={processing}
                                                    id={answerFieldName}
                                                    label="Answer"
                                                    value={
                                                        data[answerFieldName]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            answerFieldName,
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="col-12 col-lg-6">
                                                <Textarea
                                                    rows={8}
                                                    error={
                                                        !!errors[
                                                            reasonFieldName
                                                        ]
                                                    }
                                                    helperText={
                                                        errors[
                                                            reasonFieldName
                                                        ] ?? undefined
                                                    }
                                                    disabled={processing}
                                                    id={reasonFieldName}
                                                    label="Reasoning"
                                                    value={
                                                        data[reasonFieldName]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            reasonFieldName,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div className="col-12">
                        <div className="card">
                            <div className="card-footer text-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary ms-auto"
                                    disabled={processing}
                                >
                                    Save answers
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Page>
    );
};

PartyEditAnswers.layout = (page) => <Layout>{page}</Layout>;

export default PartyEditAnswers;
