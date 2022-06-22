import { Layout, Menu } from "antd";
import { ChangeEvent, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../../data/img/logo-img.png";
import InputFile from "../InputFile/InputFile";
import { Modal } from "../modal/ModalImport";
const { Sider } = Layout;

const LayoutMain = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [file, setFile] = useState<File>();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _file = e.target.files![0];
    setFile(_file);
    e.target.value = "";
  };

  const onClose = () => {
    setFile(undefined);
  };

  return (
    <div className="container">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="logo mb-2 scale-75">
            <img
              srcSet={`${Logo} 2x`}
              className="w-full h-full object-cover"
              alt="Logo"
            />
          </div>

          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            className="flex justify-center flex-col gap-3"
          >
            <Menu.Item key="1">
              <NavLink to={"/"}>
                <div className="flex items-center justify-between w-[150px]">
                  <i className="fal fa-home-lg"></i>
                  <span>Home</span>
                </div>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <InputFile onChange={handleFileChange} name="file" />
              <Modal file={file} onClose={onClose} />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="p-4">
          <Outlet />
        </Layout>
      </Layout>
    </div>
  );
};

export default LayoutMain;
