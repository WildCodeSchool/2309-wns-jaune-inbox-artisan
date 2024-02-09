import { Image, Layout, Menu } from 'antd';
import { useState, Key, ReactNode } from 'react';
import { MenuItem } from './types';
// import { MdDashboard } from 'react-icons/md';
import Link from "next/link"


const {Sider} = Layout

  const Sidebar = () => {
    const [isSiderCollapsed, setIsSliderCollapsed] = useState(false);

    const setNavigationItem = (
      label: React.ReactNode,
      key: Key,
      icon?: ReactNode,
      children?: MenuItem[],
      type?: 'group'
    ): MenuItem =>
      ({
        key,
        icon,
        children,
        label,
        type,
      } as MenuItem);

    const NAVIGATIONITEMS: MenuItem[] = [
      setNavigationItem(
        <Link href="/" title="Tableau de bord">
          Tableau de bord
        </Link>,
        'dashboard',
        // <MdDashboard />
      ),setNavigationItem(
        <Link href="/" title="Tableau de bord">
          Tableau de bord
        </Link>,
        'dashboard',
        // <MdDashboard />
      ),setNavigationItem(
        <Link href="/" title="Tableau de bord">
          Tableau de bord
        </Link>,
        'dashboard',
        // <MdDashboard />
      ),setNavigationItem(
        <Link href="/" title="Tableau de bord">
          Tableau de bord
        </Link>,
        'dashboard',
        // <MdDashboard />
      ),
        ]

    return (
      <Sider breakpoint="md" collapsed={isSiderCollapsed} collapsible onCollapse={value => setIsSliderCollapsed(value)}>
        <div className='flex justify-center mx-[24px] my-[16px]'>
          <Image src="/logo.svg" preview={false} width={124} />
        </div>
        <Menu defaultSelectedKeys={['1']} items={NAVIGATIONITEMS} mode="inline" theme="dark" />
      </Sider>
    );
  };
  

  export default Sidebar