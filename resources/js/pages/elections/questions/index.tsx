import { Inertia, Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import {
    IconArrowDownCircle,
    IconArrowLeft,
    IconArrowUpCircle,
    IconEye,
    IconPlus,
} from '@tabler/icons-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import { Layout } from '../../../components/layout';
import { Page } from '../../../components/page';

interface Props {
    election: ElectionWithQuestions;
}

const Questions: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();
    const { election } = props;

    const moveUp = React.useCallback(
        (question: Question) => {
            Inertia.post(
                route('admin.election.questions.up', {
                    election: election.id,
                    question: question.id,
                })
            );
        },
        [election]
    );

    const moveDown = React.useCallback(
        (question: Question) => {
            Inertia.post(
                route('admin.election.questions.down', {
                    election: election.id,
                    question: question.id,
                })
            );
        },
        [election]
    );

    return (
        <Page
            title={
                <div>
                    <small className="fs-6 text-sm text-secondary">
                        <InertiaLink
                            href={route('admin.elections')}
                            className="d-flex"
                        >
                            <IconArrowLeft size={14} />
                            {election.name}
                        </InertiaLink>
                    </small>
                    <div>Questions</div>
                </div>
            }
            actions={
                <div className="btn-list">
                    <InertiaLink
                        href={route('admin.election.questions.create', {
                            election: election.id,
                        })}
                        className="btn btn-primary d-inline-block"
                    >
                        <IconPlus size={24} />
                        Add new question
                    </InertiaLink>
                </div>
            }
        >
            <Helmet title={`Questions for ${election.name}`} />

            <div className="row row-cards">
                <div className="col-12">
                    <div className="card">
                        <div className="table-responsive">
                            <table className="table table-vcenter card-table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th className="w-1">Sort</th>
                                        <th className="w-1">ID</th>
                                        <th>Topic</th>
                                        <th>Thesis</th>
                                        <th className="w-1">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {election.questions.map((question) => {
                                        return (
                                            <tr key={question.id}>
                                                <td>
                                                    <div className="d-flex">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                moveUp(question)
                                                            }
                                                            className="btn btn-link btn-icon"
                                                            title="Move one up"
                                                        >
                                                            <IconArrowUpCircle
                                                                size={16}
                                                            />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                moveDown(
                                                                    question
                                                                )
                                                            }
                                                            title="Move 1 down"
                                                            className="btn btn-link btn-icon"
                                                        >
                                                            <IconArrowDownCircle
                                                                size={16}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td>{question.id}</td>
                                                <td>{question.topic}</td>
                                                <td>{question.thesis}</td>
                                                <td>
                                                    <div className="btn-list flex-nowrap">
                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.questions.edit',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                    question:
                                                                        question.id,
                                                                }
                                                            )}
                                                            className="btn btn-white"
                                                        >
                                                            Edit
                                                        </InertiaLink>

                                                        <InertiaLink
                                                            href={route(
                                                                'admin.election.questions.show',
                                                                {
                                                                    election:
                                                                        election.id,
                                                                    question:
                                                                        question.id,
                                                                }
                                                            )}
                                                            className="btn btn-icon btn-white"
                                                        >
                                                            <IconEye
                                                                size={24}
                                                            />
                                                        </InertiaLink>
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

Questions.layout = (page) => <Layout>{page}</Layout>;

export default Questions;
