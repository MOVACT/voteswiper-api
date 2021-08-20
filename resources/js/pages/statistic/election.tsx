import { Page as PageType } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../../components/layout';
import { Page } from '../../components/page';

interface Props {
    election: Election;
    swipes: number;
    initiations: number;
    results: number;
}

const StatisticElection: InertiaPage = () => {
    const { props } = usePage<PageType<Props>>();

    return (
        <Page title={`Statistic for ${props.election.name}`}>
            <Helmet title={`Statistic for ${props.election.name}`} />

            <div className="row row-deck row-cards mb-4">
                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="subheader">Swipes</div>
                            <div className="h1">
                                {Intl.NumberFormat('de').format(props.swipes)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="subheader">Initiations</div>
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
                            <div className="subheader">Results</div>
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
        </Page>
    );
};

StatisticElection.layout = (page) => <Layout>{page}</Layout>;

export default StatisticElection;
