import { Layout, Space } from 'antd';
import Library from '@/components/editor/Library';
import { NextPageWithLayout } from '../_app';
import ToolBar from '@/components/editor/ToolBar';
import View from '@/components/editor/View';
import Properties from '@/components/editor/Properties';
import { ReactElement, useEffect, useState } from 'react';
import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import SetupModal from '../../components/editor/Modal/SetupModal';
import { useRouter } from 'next/router';
import {
	useTemplateLazyQuery,
	useUpdateTemplateMutation,
	useSendMailLazyQuery,
} from '@/types/graphql';
import { useEditor } from '@/Contexts/EditorContext';
import { json } from 'stream/consumers';

const { Sider, Content } = Layout;

const Editor: NextPageWithLayout = () => {
	const { state, dispatch } = useEditor();
	const router = useRouter();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const templateId = router.query.templateId as string;

	const [getTemplateById] = useTemplateLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(getTemplateData) {
			console.log(getTemplateData.templateById.config);
			dispatch({ type: 'load', data: getTemplateData.templateById.config });
		},
		onError(getTemplateError) {
			if (getTemplateError) router.push('/dashboard');
			console.log(getTemplateError);
		},
	});

	const [updateTemplate] = useUpdateTemplateMutation({
		fetchPolicy: 'no-cache',
		onCompleted(updateTemplateData) {
			console.log(updateTemplateData);
		},
		onError(updateError) {
			console.log('updateError:', updateError);
		},
	});

	const [printTemplate] = useSendMailLazyQuery({
		fetchPolicy: 'no-cache',
		onCompleted(sendMail) {
			console.log(sendMail);
			if (sendMail.sendMail?.html) {
				console.log(sendMail.sendMail?.html);
				const blob = new Blob([sendMail.sendMail?.html], {
					type: 'text/html',
				});
				// Créer une URL pour le Blob
				const url = URL.createObjectURL(blob);

				window.open(url, '_blank');
			}
		},
		onError(updateError) {
			console.log('updateError:', updateError);
		},
	});

	useEffect(() => {
		console.log(templateId);
		if (templateId)
			getTemplateById({ variables: { id: Number(router.query.templateId) } });
	}, [templateId]);

	const onSave = () => {
		console.log(state);
		const newTemplate = {
			id: templateId,
			config: JSON.stringify(state),
		};
		updateTemplate({ variables: { template: newTemplate } });
	};

	const print = () => {
		printTemplate({ variables: { id: parseInt(templateId, 10) } });
	};

	return (
		<div className="editor h-[calc(100vh-7vh)] w-full">
			<SetupModal
				isOpen={isModalOpen}
				closeModal={() => setIsModalOpen(false)}
			/>
			<div className="editor h-[7vh] w-full">
				<ToolBar
					setIsModalOpen={setIsModalOpen}
					onSave={onSave}
					printTemplate={print}
				/>
			</div>
			<Layout className="h-[calc(100vh-14vh)] w-full">
				{/* <Sider theme="light" className='border border-green-500 border-solid overflow-y-auto select-none' width="20%"> */}
				<Sider
					theme="light"
					className="border border-gray-100 border-solid rounded-lg overflow-y-auto select-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
					width="20%"
				>
					<Library></Library>
				</Sider>
				{/* <Content className='border-2 border-black border-solid h-full flex flex-grow p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'> */}
				<Content className="h-full flex flex-grow bg-white rounded-lg p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
					<View />
				</Content>
				{/* <Sider theme="light" className='border border-red-500 border-solid overflow-auto select-none' width="300px" collapsible collapsedWidth="20%" reverseArrow> */}
				<Sider
					theme="light"
					className="h-full overflow-auto select-none rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
					width="300px"
					collapsible
					collapsedWidth="20%"
					reverseArrow
				>
					<Properties></Properties>
				</Sider>
			</Layout>
		</div>
	);
};

export default Editor;

Editor.getLayout = function getLayout(page: ReactElement) {
	return (
		<GlobalLayout
			title="Dashboard"
			description="this is a dashboard."
			hidden={true}
		>
			{page}
		</GlobalLayout>
	);
};
