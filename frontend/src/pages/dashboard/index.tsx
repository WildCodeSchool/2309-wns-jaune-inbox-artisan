import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import { ReactElement } from 'react';

const Dashboard = () => {
	return <div>Dashboard</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return <GlobalLayout>{page}</GlobalLayout>;
};

export default Dashboard;
