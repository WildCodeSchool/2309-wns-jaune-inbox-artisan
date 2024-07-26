import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import {
	Template,
	useInsertTemplateMutation,
	useTemplatesLazyQuery,
} from '@/types/graphql';
import {
	EditOutlined,
	EllipsisOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Card, Col, Image, Row } from 'antd';
import { ReactElement, useEffect, useState } from 'react';
import { TemplateType } from '@/types/dashboard.type';
import { useUser } from '@/Contexts/UserContext';
import { useRouter } from 'next/router';

const Dashboard = () => {
	const [insertTemplate, { data: id }] = useInsertTemplateMutation();

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

	const { user } = useUser();
	const router = useRouter();
	useEffect(() => {
		getTemplateByUserId({ variables: { id: user.id } });
	}, []);

	// console.log(user)
	const onAddTemplate = () => {
		const newTemplate = {
			name: 'New Template',
			userId: user.id,
		};
		insertTemplate({
			variables: {
				template: newTemplate,
			},
		}).then((r) => router.push(`/editor/${r.data?.insertTemplate.id}`));
	};

	const onEditClick = (template: TemplateType) => {
		console.log('edit', template);
		router.push(`/editor/${template.id}`);
	};

	return (
		<>
			<div>
				<button onClick={onAddTemplate}>add template</button>
			</div>
			<Row gutter={[16, 16]}>
				{templates.map((el, index) => (
					<Col key={index} xs={24} md={12} lg={8} xl={6}>
						<Card
							title={el.name}
							cover={<Image alt="example" src={el.photo} />}
							actions={[
								<SettingOutlined key="setting" />,
								<EditOutlined key="edit" onClick={(e) => onEditClick(el)} />,
								<EllipsisOutlined key="ellipsis" />,
							]}
							bodyStyle={{ display: 'none' }}
							className="!border-gray-300"
						/>
					</Col>
				))}
			</Row>
		</>
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
