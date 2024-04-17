import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import { useTemplatesLazyQuery } from '@/types/graphql';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { TemplateType } from '@/types/dashboard.type';

const data = [
	{ name: 'title 0', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 1', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 2', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 3', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 4', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 5', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 6', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 7', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 8', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 9', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 10', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 11', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 12', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 13', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 14', photo: 'https://picsum.photos/200/300' },
	{ name: 'title 15', photo: 'https://picsum.photos/200/300' },
];

const Dashboard = () => {
	const [getTemplateByUserId, { data: dataAds }] = useTemplatesLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(data) {
			setTemplates(
				data.templates.map((el) => ({
					...el,
					photo: 'https://picsum.photos/200/300',
				}))
			);
		},
	});
	const [templates, setTemplates] = useState<TemplateType[]>([]);

	useEffect(() => {
		getTemplateByUserId({ variables: { id: 1 } });
	}, []);

	return (
		<Row gutter={[16, 16]}>
			{[...templates, ...data].map((el, index) => (
				<Col key={index} xs={24} md={12} lg={8} xl={6}>
					<Card
						title={el.name}
						cover={<Image alt="example" src={el.photo} />}
						actions={[
							<SettingOutlined key="setting" />,
							<EditOutlined key="edit" />,
							<EllipsisOutlined key="ellipsis" />,
						]}
						bodyStyle={{ display: 'none' }}
						className="!border-gray-300"
					/>
				</Col>
			))}
		</Row>
	);
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalLayout title="Dashboard" description="this is a dashboard.">
			{page}
		</GlobalLayout>
	);
};

export default Dashboard;
