import React, { useState, useContext } from "react"
import { Link, navigate } from "gatsby"
import {
  Layout,
  Row,
  Input,
  Select,
  Form,
  Button,
  Col,
  Typography,
  Spin,
  Divider,
} from "antd"
import { AuthContext, AuthUserProvider } from "../contexts/AuthContext"
import { useFirebase, createDoc } from "../firebase"
import Logo from "../images/gatsby-icon.png"
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  MailOutlined,
} from "@ant-design/icons"

const { Content } = Layout
const { Text } = Typography
const { Option } = Select
const SignUp = () => {
  const { auth } = useFirebase()
  const { user } = useContext(AuthContext)
  console.log(user)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    accountType: "",
  })
  const onInputChanged = e => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const signup = async () => {
    setLoading(true)
    const { email, firstname, lastname, accountType, password } = form
    await auth.createUserWithEmailAndPassword(email, password)
    let { uid } = auth.currentUser
    await createDoc(`users/${uid}`, { firstname, lastname, accountType, email, feedback: 0, jobs: 0 })
    setLoading(false)
    await auth.signInWithEmailAndPassword(email, password)
    navigate("/newFreelancer")
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Content>
        <Row align="middle" justify="center" className="h100">
          <Spin size="large" spinning={loading}>
            <Col className="login-form">
              <Row justify="center">
                <img src={Logo} width="80px" />
              </Row>
              <Row justify="center">
                <h1>Бүргүүлэх</h1>
              </Row>
              <Form onFinish={signup}>
                <Form.Item
                  name="firstname"
                  rules={[{ required: true, message: "Нэрээ оруулна уу!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Нэр"
                    size="middle"
                    id="firstname"
                    value={form.firstname}
                    onChange={onInputChanged}
                  />
                </Form.Item>
                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: "Овгоо оруулна уу!" }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Овог"
                    size="middle"
                    id="lastname"
                    value={form.lastname}
                    onChange={onInputChanged}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                    { required: true, message: "Email хаягаа оруулна уу!" },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    size="middle"
                    id="email"
                    value={form.email}
                    onChange={onInputChanged}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  hasFeedback
                  rules={[
                    { required: true, message: "Нууц үгээ оруулна уу!" },
                    {
                      validator: (rule, value, callback) => {
                        if (value && value.length < 6) {
                          callback(
                            "Нууц үг 6-аас олон дээг тэмдэгтээс бүрдсэн байх ёстой."
                          )
                        } else {
                          callback()
                        }
                      },
                    },
                  ]}
                >
                  <Input.Password
                    value={form.password}
                    onChange={onInputChanged}
                    id="password"
                    prefix={<LockOutlined />}
                    size="middle"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item
                  name="accountType"
                  rules={[
                    { required: true, message: "Энэ талбарыг бөглөнө үү!" },
                  ]}
                >
                  <Select
                    placeholder="Би бол ..."
                    size="middle"
                    value={form.accountType}
                    onChange={value => {
                      setForm({ ...form, accountType: value })
                    }}
                  >
                    <Option value="freelancer">Freelancer</Option>
                    <Option value="employer">Ажил олгогч</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    size="middle"
                    block
                  >
                    Бүргүүлэх
                  </Button>
                </Form.Item>
              </Form>
              <Row justify="center">
                <Button shape="round" size="middle" block>
                  <GoogleOutlined />
                  Google-р бүртгүүлэх
                </Button>
              </Row>
              <Divider>
                <Text type="secondary">or</Text>
              </Divider>
              <Row justify="center">
                <Link to="/login">
                  <Text type="primary">Нэвтрэх</Text>
                </Link>
              </Row>
            </Col>
          </Spin>
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
      <SignUp />
    </App>
  )
}
