import React, { useContext } from "react"
import { Link } from "gatsby"
import { App } from "./"
import { AuthContext } from "../contexts/AuthContext"
import { useDocumentWithAccount } from "../firebase"
import { Layout, Row, Col, Menu, Space, Dropdown, Spin } from "antd"
import Logo from '../images/Freelance.svg'
import { DownOutlined , LoadingOutlined} from "@ant-design/icons"

const { Header, Footer, Sider, Content } = Layout
const UserMenu = () => {
  let { data: userData } = useDocumentWithAccount("")
  const { user, loading, logout } = useContext(AuthContext)
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/profile">Хувийн мэдээлэл</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/settings">Тохиргоо ба нууцлал</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        Гарах
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <a className="t-link" onClick={e => e.preventDefault()}>
        {userData && `${userData.firstname} ${userData.lastname}`}{" "}
        <DownOutlined />
      </a>
    </Dropdown>
  )
}
const Navigation = () => {
  const { user, ready } = useContext(AuthContext)
  return (
    <Header>
      <Row>
        <Col span={10} offset={2}>
          <Row className="h100">
            <Col span={9}>
              <div className="header-text">
              <Link to="/" className="header-text">
                  <img src={Logo} width={"90%"} />
                </Link>
              </div>
            </Col>
            <Col span={8}>
              <div className="header-text">
                <Link to="/jobs" className="header-text">
                  Ажлын жагсаалт
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6} offset={5}>
          <Row>
            {ready ? (
              <>
                <Col span={12}>
                  {user ? (
                    ""
                  ) : (
                    <Link to="/login" className="header-text">
                      Нэвтрэх
                    </Link>
                  )}
                </Col>
                <Col span={12}>
                  {user ? (
                    <UserMenu />
                  ) : (
                    <Link to="/signup" className="header-text">
                      Бүртгүүлэх
                    </Link>
                  )}
                </Col>
              </>
            ) : (
              <Col span={24}>
                <Spin indicator={ <LoadingOutlined style={{ fontSize: 24 }} spin />}/>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Header>
  )
}
export { Navigation }
