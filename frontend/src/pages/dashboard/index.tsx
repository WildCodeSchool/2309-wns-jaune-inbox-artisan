import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import { ReactElement } from 'react';

const Dashboard = () => {
	return <div></div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalLayout title="Dashboard" description="this is a dashboard.">
			{page}
		</GlobalLayout>
	);
};

export default Dashboard;
