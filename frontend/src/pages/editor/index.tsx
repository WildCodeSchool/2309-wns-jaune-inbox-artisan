import { Layout,  } from 'antd';
import Library from '@/components/editor/Library';
import { NextPageWithLayout } from '../_app';
import ToolBar from '@/components/editor/ToolBar';
import View from '@/components/editor/View';
import Properties from '@/components/editor/Properties';
import { ReactElement, useState } from 'react';
import GlobalLayout from '@/components/layout-elements/GlobalLayout';

const {Sider, Content} = Layout

const Editor: NextPageWithLayout = () => {
	const [mail, setMail] = useState('');

	return (
		<div className="editor h-full w-full">
			<ToolBar>
            </ToolBar>
			<button>add header</button>
			<Layout>
                <Sider theme="light" >
				    <Library></Library>
                </Sider>
                <Content className='border-2 border-black border-solid h-full flex flex-grow'>
				    <View mail={mail}></View>
                </Content>
                <Sider theme="light">
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
