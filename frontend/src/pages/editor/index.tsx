import { Layout,  } from 'antd';
import Library from '@/components/editor/Library';
import { NextPageWithLayout } from '../_app';
import ToolBar from '@/components/editor/ToolBar';
import View from '@/components/editor/View';
import Properties from '@/components/editor/Properties';
import { ReactElement, useState } from 'react';
import GlobalLayout from '@/components/layout-elements/GlobalLayout';
import SetupModal from "../../components/editor/Modal/SetupModal"

const {Sider, Content} = Layout

const Editor: NextPageWithLayout = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	return (
		<div className="editor h-[calc(100vh-7vh)] w-full">
      <SetupModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
			<div className="editor h-[7vh] w-full">
			<ToolBar setIsModalOpen={setIsModalOpen}/>
			</div>
			<Layout className='h-[calc(100vh-14vh)] w-full'>
                <Sider theme="light" className='border border-green-500 border-solid overflow-y-auto' width="20%">
				    <Library></Library>
                </Sider>
                <Content className='border-2 border-black border-solid h-full flex flex-grow'>
				    <View/>
                </Content>
                <Sider theme="light" className='border border-red-500 border-solid overflow-auto' width="300px" collapsible collapsedWidth="20%" reverseArrow>
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
