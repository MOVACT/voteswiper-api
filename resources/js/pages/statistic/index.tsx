import { Page as PageType } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { route } from 'ziggy-js';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props {
    elections: Election[];
    swipes: number;
    results: number;
    initiations: number;
}

const Statistic: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    return (
        <Page title="Statistic">
            <Helmet title="Statistic" />

            <div className="row row-deck row-cards mb-4">
                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="subheader">Swipes (combined)</div>
                            <div className="h1">
                                {Intl.NumberFormat('de').format(props.swipes)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="subheader">
                                Initiations (combined)
                            </div>
                            <div className="h1">
                                {Intl.NumberFormat('de').format(
                                    props.initiations
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="subheader">Results (combined)</div>
                            <div className="d-flex align-items-baseline">
                                <div className="h1 mb-0 me-2">
                                    {Intl.NumberFormat('de').format(
                                        props.results
                                    )}
                                </div>
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                    {(
                                        (props.results * 100) /
                                        props.initiations
                                    ).toFixed(2)}
                                    %
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3>Pick the election you want to get usage statistics for:</h3>

            <div className="card">
                <div className="list-group list-group-flush">
                    {props.elections.map((election) => {
                        return (
                            <div key={election.id} className="list-group-item">
                                <InertiaLink
                                    href={route('admin.statistic.election', {
                                        election: election.id,
                                    })}
                                    className="text-body d-block"
                                >
                                    {election.name}
                                </InertiaLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Page>
    );
};

Statistic.layout = (page) => <Layout>{page}</Layout>;

export default Statistic;
