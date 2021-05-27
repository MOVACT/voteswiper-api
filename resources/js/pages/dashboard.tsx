import React from 'react';
import { Helmet } from 'react-helmet';
import { Layout } from '../components/layout';
import { Page } from '../components/page';

const Dashboard: InertiaPage = () => {
    return (
        <Page title="Dashboard">
            <Helmet title="Dashboard" />
        </Page>
    );
};

Dashboard.layout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
