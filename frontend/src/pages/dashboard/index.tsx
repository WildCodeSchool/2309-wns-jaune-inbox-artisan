import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import {
	Template,
	useDeleteTemplateMutation,
	useInsertTemplateMutation,
	useTemplatesLazyQuery,
} from '@/types/graphql';
import {
	DeleteOutlined,
	EditOutlined,
	EllipsisOutlined,
	PlusOutlined,
	SettingOutlined,
} from '@ant-design/icons';
import { Button, Card, Col, Image, Row } from 'antd';
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

	const [deleteTemplate] = useDeleteTemplateMutation({
		fetchPolicy: 'no-cache',
		onCompleted() {
			getTemplateByUserId({ variables: { id: user.id } });
		},
	});

	const onEditClick = (template: TemplateType) => {
		console.log('edit', template);
		router.push(`/editor/${template.id}`);
	};

	return (
		<>
			<div>
				{/* <button onClick={onAddTemplate}>add template</button> */}
				<Row className="mb-8 justify-end">
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={onAddTemplate}
					>
						Add template
					</Button>
				</Row>
			</div>
			<Row gutter={[16, 16]}>
				{templates.map((el, index) => (
					<Col key={index} xs={24} md={12} lg={8} xl={6}>
						<Card
							title={el.name}
							cover={<Image alt="example" src={el.photo} />}
							actions={[
								// <SettingOutlined key="setting" />,
								<EditOutlined key="edit" onClick={(e) => onEditClick(el)} />,
								<DeleteOutlined
									key="ellipsis"
									onClick={() =>
										el?.id &&
										deleteTemplate({ variables: { deleteTemplateId: el?.id } })
									}
								/>,
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
