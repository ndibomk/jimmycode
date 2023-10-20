import { Layout, Image } from "antd";
import SideMenu from '../src/components/SideMenu';
import AppRoutes from "./components/AppRoutes";

const { Sider, Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <Sider style={{ height: "100vh", backgroundColor: "white" }}>
        <Image
          src="https://pbs.twimg.com/media/F59eMKSX0AALsLy?format=jpg&name=medium"
          preview={false}
        />
        <SideMenu />
      </Sider>
      <Layout>
        <Content>
          <AppRoutes />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Yafreeka Management ©2023
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
