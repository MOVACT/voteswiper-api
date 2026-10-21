import { Head } from '@inertiajs/react';
import { Layout } from '../components/layout';
import { Page } from '../components/page';

const Dashboard: InertiaPage = () => {
    return (
        <Page title="Dashboard">
            <Head title="Dashboard" />
        </Page>
    );
};

Dashboard.layout = (page) => <Layout>{page}</Layout>;

export default Dashboard;
