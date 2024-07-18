import { Avatar, List, Card } from 'antd';
import { useEditor } from "@/Contexts/EditorContext";

import MailTitle from "../mailComponents/MailTitle";
import MailText from "../mailComponents/MailText";
import Settings from '@/pages/settings';
import MailHeader from '../mailComponents/MailHeader';
import MailPicture from '../mailComponents/MailPicture';
import MailCarousel from '../mailComponents/MailCarousel'
import { Component } from 'react';
import { title } from 'process';
import MailCard from '../mailComponents/MailCard';
import MailList from '../mailComponents/MailList';
import MailSocial from '../mailComponents/MailSocial';



const carouselPictures = [
  {
    src: "https://picsum.photos/200/300",
    alt: 'pic1'
  },
  {
    src: "https://picsum.photos/200/300",
    alt: 'pic2'
  },
  {
    src: "https://picsum.photos/200/300",
    alt: 'pic3'
  },
  {
    src: "https://picsum.photos/200/300",
    alt: 'pic4'
  },
]
const carouselStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

const data = [
  {title : "Title", definition : "title components", name: "MailTitle", component : <MailTitle level={5} text="this is a demo" />, keys: {level : 5, text : "this is a demo"}},
  // {title: "Header", definition: "Mail header",name: "MailHeader", component: <MailHeader style={{color: 'red', backgroundColor: "green"}}>children</MailHeader>, keys: {style : 5, text : "this is a demo"}} ,
  // {title : "Text", definition : "text components", name: "MailText", component : <MailText text="this is a demo" style={{bold: false, italic: false, underline: false}} />, keys: { style:{bold: false, italic: false, underline: false}, text : "this is a demo"}},
  {title : "Text", definition : "text components", name: "MailText", component : <MailText text="this is a demo" strong={false} italic={false} underline={false} />, keys: {text : "this is a demo"}, strong:false, italic:false, underline:false},
  {title: "Picture", definition: "picture holder",name: "MailPicture", component: <MailPicture style={{}} src={"https://picsum.photos/200/300"} alt='empty picture' height={50} width={50}/>, keys: { style: {}, src: "https://picsum.photos/200/300", alt: "this is a picture", height: 50, width: 50}},
  {title: 'Carousel', definition: 'carousel',name: "MailCarousel", component: <MailCarousel style={{}} contentStyle={carouselStyle} pictures={carouselPictures} title='carousel' ></MailCarousel>},
  {title:'Card', definition:'card with title and content',name: "MailCard", component: <MailCard title='simple card' style={{}}><p>Card content</p>
    <p>Card content</p>
    <p>Card content</p>
    </MailCard>},
  {title: 'Text list', definition: 'list with items', name: 'MailList', component: <MailList title='List example' style={{}} items={["example 1 ", "example 2"]}></MailList>},
  {title: 'social', definition: 'social link', name:'MailSocial', component: <MailSocial style={{}} facebookLink='#'></MailSocial>, keys: {facebookLink: '#'}},
]



const {Meta} = Card

const Library = () => {
const { dispatch, editedPostion } = useEditor()

const addComponent = (item) => {
  dispatch({type : "addComponent", data : {keys : item.keys, name : item.name, position: editedPostion }})
}

    return (
        <div className='bg-[#e6e6e6]'>
        <div>Library</div>
        <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
          <Card
          onClick={() => addComponent(item)}
    hoverable
    className='w-full !m-1'
    cover={<div className="scale-[90%] w-full h-full border border-solid">
        {item.component}
      </div>}
  >
    <Meta title={item.title} description={item.definition} />
  </Card>
      </List.Item>
    )}
  />
        </div>
    )
}

export default Library