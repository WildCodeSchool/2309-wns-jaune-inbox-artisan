import {Layout} from "antd"
import Sidebar from "./Sidebar"

const {Content} = Layout


const GlobalLayout = ({children}) => {
<Layout hasSider style={{ minHeight: '100vh' }}>
<Sidebar/>
<Layout className="site-layout">
  {/* <Header user={user} /> */}
  <Content style={{ margin: '0px 16px' }}>
    <div style={{ padding: 24, minHeight: 360, }}>
       {children}
    </div>
  </Content>
</Layout>
</Layout>}

export default GlobalLayout