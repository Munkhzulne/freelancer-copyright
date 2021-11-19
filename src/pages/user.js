import React, { useContext } from "react"
import { StringParam, useQueryParam } from "use-query-params"
import {
  Col,
  Layout,
  Row,
  Avatar,
  Typography,
  Statistic,
  Space,
  Divider,
  Tabs,
  Spin,
  Tag,
} from "antd"
import { AuthContext, AuthUserProvider } from "../contexts/AuthContext"
import { App, Posts } from "../components"
import { useDocument } from "../firebase"

import {
  StarTwoTone,
  IdcardTwoTone,
  UserOutlined,
  HeartTwoTone,
  TrophyTwoTone,
  CheckCircleTwoTone,
  SmileTwoTone,
} from "@ant-design/icons"
import { navigate } from "gatsby"
const User = () => {
  const [id, setId] = useQueryParam("u", StringParam)
  console.log(id)
  const { user, ready } = useContext(AuthContext)
  const { data: account, loading } = useDocument(`users/${id}`)
  console.log(account)
  if (user == null && ready) {
    navigate("/")
  }
  return (
    <App>
      <Layout>
        <Layout.Header className="profile-header"></Layout.Header>
        <Layout.Content
          style={{
            padding: "30px",
            top: "-160px",
            background: "white",
            position: "relative",
            width: "1000px",
            alignSelf: "center",
          }}
        >
          {loading ? (
            <Spin spinning={true} size="large"></Spin>
          ) : (
            <>
              <Row>
                <Col span={8}>
                  <Row>
                    <Avatar
                      shape="square"
                      size={220}
                      src={account && account.profile && account.profile}
                      icon={account && !account.profile && <UserOutlined />}
                    />
                  </Row>
                  <Space direction="vertical">
                    <Typography.Text>
                      <StarTwoTone twoToneColor="red" />{" "}
                      {account && `${account.experience}`}
                    </Typography.Text>
                    <Typography.Text>
                      <IdcardTwoTone twoToneColor="blue" />{" "}
                      {account && `${account.createdAt.toDate()} бүртгэгдсэн`}
                    </Typography.Text>
                    <Typography.Text>
                      <TrophyTwoTone twoToneColor="#f7b95c" />
                      {account &&
                        account.recommendation &&
                        ` ${account.recommendation} `}{" "}
                      Санал болголт
                    </Typography.Text>
                  </Space>
                </Col>
                <Col span={15}>
                  <Space size="middle" direction="vertical" className="w100">
                    <div>
                      <Typography.Title level={3} style={{ marginBottom: 0 }}>
                        {account && `${account.firstname} ${account.lastname}`}
                      </Typography.Title>
                      <Typography.Text>
                        {account && `${account.email}`}
                      </Typography.Text>
                    </div>
                    <Row align="middle">
                      <Col span={12}>
                        <Statistic
                          title="Гүйцэтгэсэн ажлын тоо"
                          value={10}
                          prefix={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Үнэлгээ"
                          value={6}
                          prefix={<HeartTwoTone twoToneColor="#eb2f96" />}
                        />
                      </Col>
                    </Row>
                    <Divider></Divider>
                    <div>
                      <Typography.Title level={5}>Миний тухай</Typography.Title>
                      <Typography.Text>
                        {account &&
                          (account.descripton ? account.descripton : "")}
                      </Typography.Text>
                    </div>
                  </Space>
                </Col>
              </Row>
              <Row className="w100">
                <Tabs defaultActiveKey="1" className="w100">
                  <Tabs.TabPane tab="Хувийн мэдээлэл" key="1">
                    <Divider orientation="left">
                      <Typography.Title level={4}>Гадаад хэл</Typography.Title>
                    </Divider>
                    {account &&
                      account.languages &&
                      account.languages.map(el => (
                        <Tag className="tag">{el}</Tag>
                      ))}
                    <Divider orientation="left">
                      <Typography.Title level={4}>Ур чадвар</Typography.Title>
                    </Divider>
                    {account &&
                      account.skills &&
                      account.skills.map(el => <Tag className="tag">{el}</Tag>)}
                    <Divider orientation="left">
                      <Typography.Title level={4}>Туршлага</Typography.Title>
                    </Divider>
                    <Divider orientation="left">
                      <Typography.Title level={4}>
                        Хувийн хаяг, платформууд
                      </Typography.Title>
                    </Divider>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="Хийсэн ажлууд" key="2">
                    <Posts id={id}/>
                  </Tabs.TabPane>
                </Tabs>
              </Row>
            </>
          )}
        </Layout.Content>
      </Layout>
    </App>
  )
}
export default User
