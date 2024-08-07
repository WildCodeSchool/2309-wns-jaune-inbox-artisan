import { Avatar, List, Card } from 'antd';
import { useEditor } from '@/Contexts/EditorContext';

import MailTitle from '../mailComponents/MailTitle';
import MailText from '../mailComponents/MailText';
import Settings from '@/pages/settings';
import MailPicture from '../mailComponents/MailPicture';
import MailCard from '../mailComponents/MailCard';
import MailList from '../mailComponents/MailList';
import MailSocial from '../mailComponents/MailSocial';

const imagePicture = {
	src: 'https://picsum.photos/200/300',
	alt: 'pic1',
};

const carouselPictures = [
	{
		src: 'https://picsum.photos/200/300',
		alt: 'pic1',
	},
	{
		src: 'https://picsum.photos/200/300',
		alt: 'pic2',
	},
	{
		src: 'https://picsum.photos/200/300',
		alt: 'pic3',
	},
	{
		src: 'https://picsum.photos/200/300',
		alt: 'pic4',
	},
];
const carouselStyle = {
	margin: 0,
	height: '160px',
	color: '#fff',
	lineHeight: '160px',
	textAlign: 'center',
	background: '#364d79',
};

const data = [
	{
		title: 'Title',
		definition: 'title components',
		name: 'MailTitle',
		component: <MailTitle level={2} text="this is a demo" style={{}} />,
		keys: { style: {}, level: 2, text: 'this is a demo' },
	},
	{
		title: 'Text',
		definition: 'text components',
		name: 'MailText',
		component: <MailText text="this is a demo" style={{}} />,
		keys: { style: {}, text: 'this is a demo' },
		strong: false,
		italic: false,
		underline: false,
	},
	{
		title: 'Picture',
		definition: 'picture holder',
		name: 'MailPicture',
		component: (
			<MailPicture style={{}} picture={imagePicture} height={100} width={100} />
		),
		keys: { style: {}, picture: imagePicture, height: 100, width: 100 },
	},
	{
		title: 'Card',
		definition: 'card with title and content',
		name: 'MailCard',
		component: (
			<MailCard
				title="simple card"
				style={{ whiteSpace: 'pre-wrap' }}
				content={`Card content
					Card content
					Card content`}
			></MailCard>
		),
		keys: {
			style: {},
			title: 'simple card',
			content: `Card content
			Card content
			Card content`,
		},
	},
	{
		title: 'Text list',
		definition: 'list with items',
		name: 'MailList',
		component: (
			<MailList style={{}} items={['example 1 ', 'example 2']}></MailList>
		),
		keys: {},
	},
	{
		title: 'Social',
		definition: 'Social link',
		name: 'MailSocial',
		component: (
			<MailSocial
				style={{}}
				facebookLink="#"
				twitterLink="#"
				instagramLink="#"
			></MailSocial>
		),
		keys: {
			facebookLink: 'https://www.facebook.com',
			twitterLink: 'https://twitter.com',
			instagramLink: 'https://www.instagram.com',
			style: {},
		},
	},
];

const { Meta } = Card;

const Library = () => {
	const { dispatch, editedPostion } = useEditor();

	const addComponent = (item: any) => {
		dispatch({
			type: 'addComponent',
			data: { keys: item.keys, name: item.name, position: editedPostion },
		});
	};

	return (
		<div className="bg-[#e6e6e6]">
			<div>Library</div>
			<List
				itemLayout="horizontal"
				dataSource={data}
				renderItem={(item, index) => (
					<List.Item>
						<Card
							onClick={() => addComponent(item)}
							hoverable
							className="w-full !m-1 !p-2 !py-4"
							cover={
								<div className="scale-[90%] w-full h-full border border-solid p-2">
									{item.component}
								</div>
							}
						>
							<Meta title={item.title} description={item.definition} />
						</Card>
					</List.Item>
				)}
			/>
		</div>
	);
};

export default Library;
