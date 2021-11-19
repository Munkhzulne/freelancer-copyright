import React, { useState, useContext } from "react"
import { Link, navigate } from "gatsby"
import {
  Layout,
  Row,
  Input,
  Form,
  Button,
  Col,
  Typography,
  Divider,
  Space,
} from "antd"
import Logo from "../images/Freelance1.svg"
import { useFirebase, useDocumentWithAccount } from "../firebase"
import { AuthContext, AuthUserProvider } from "../contexts/AuthContext"
import * as _ from 'lodash'
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons"

const { Content } = Layout
const { Text } = Typography

const Login = () => {
  const { auth } = useFirebase()
  let { data: account } = useDocumentWithAccount("")
  const { user, ready } = useContext(AuthContext)
  const [form, setForm] = useState({ email: "", password: "" })
  const onInputChanged = e => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const login = async () => {
    const { email, password } = form
    await auth.signInWithEmailAndPassword(email, password)
    if (_.has(account, "skills")) {
      navigate("/")
    } else {
      navigate("/newFreelancer")
    }
  }
  if (user != null && user) {
    navigate("/")
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row align="middle" justify="center" className="h100">
          <Col className="login-form">
            <Space size="large" direction="vertical">
            <Row justify="center">
              <img src={Logo} width="80%"/>
            </Row>
            <Row justify="center">
              <h1>Нэвтрэх</h1>
            </Row></Space>
            <Form onFinish={login}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  size="large"
                  id="email"
                  value={form.email}
                  onChange={onInputChanged}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input
                  value={form.password}
                  onChange={onInputChanged}
                  id="password"
                  prefix={<LockOutlined />}
                  type="password"
                  size="large"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Row justify="space-between">
                  <Link to="/signup">
                    <Text type="secondary"> Нууц үгээ мартсан</Text>
                  </Link>
                  <Link to="/signup">
                    <Text type="secondary">Шинээр бүргүүлэх</Text>
                  </Link>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  size="large"
                  block
                >
                  Нэвтрэх
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Row justify="center">
              <Button shape="round" size="large" block>
                <GoogleOutlined />
                Google-р нэвтрэх
              </Button>
            </Row>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}
const App = ({ children }) => {
  return (
    <AuthUserProvider>
      <div
        className=""
        style={{
          minHeight: "100vh",
          alignItems: "stretch",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </AuthUserProvider>
  )
}

export default () => {
  return (
    <App>
      <Login />
    </App>
  )
}
