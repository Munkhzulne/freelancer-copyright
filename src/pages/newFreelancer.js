import React, { useState, useRef, useContext } from "react"
import { App } from "../components"
import {
  Layout,
  Avatar,
  Row,
  Col,
  Upload,
  Button,
  Space,
  Select,
  Radio,
  Divider,
  Spin,
  Typography,
} from "antd"
import {
  UserOutlined,
  UploadOutlined,
  RightOutlined,
  EllipsisOutlined,
} from "@ant-design/icons"
import * as _ from "lodash"
import {languages, skills} from '../data'
import { updateRecordWithAccount, useFirebase, useDocumentWithAccount } from "../firebase"
import { AuthContext } from "../contexts/AuthContext"
import { navigate } from "gatsby"
const NewFreelancer = () => {
  let { data: account } = useDocumentWithAccount("")
  const { user, ready } = useContext(AuthContext)

  const { firebase } = useFirebase()
  const fileInput = useRef()
  const [form, setForm] = useState({
    profile: null,
    languages: [],
    experience: "Beginner",
    skills: [],
  })
  const [loading, setLoading] = useState(false)
  const handleLanguage = value => {
    console.log(`${_.isArray(value)}`)
    setForm({ ...form, languages: value })
  }
  const handleExperience = e => {
    setForm({ ...form, experience: e.target.value })
  }
  const handleSkills = value => {
    setForm({ ...form, skills: value })
  }
  const saveUserInfo = async () => {
    setLoading(true)
    const { experience, skills, profile, languages } = form
    if (profile != null) {
      let storage = firebase.storage().ref()
      let thisRef = storage.child(profile.name + Date.now().toString())
      await thisRef.put(profile).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          updateRecordWithAccount("", {
            experience,
            skills: [...skills],
            profile: downloadURL,
            languages: [...languages],
          })
        })
      })

      setLoading(false)
    } else {
      await updateRecordWithAccount("", {
        experience,
        skills: [...skills],
        profile: "",
        languages: [...languages],
      })
      setLoading(false)
    }
    fileInput.current.value = ""
    navigate("/")
  }
  if (user != null && user) {
    navigate("/")
  }
  if (_.has(account, "skills")) {
    navigate("/")
  }
  return (
    <App>
      <Spin size="large" spinning={loading}>
        <Layout style={{ background: "white" }}>
          <Layout.Header style={{ background: "#f0f2f5" }}></Layout.Header>
          <Layout>
            <Layout.Sider
              width={400}
              style={{ background: "#f0f2f5", margin: "50px" }}
            >
              <EllipsisOutlined style={{ color: "gray", fontSize: "50px" }} />
              <Typography.Title level={3}>
                Та өөрийн мэдээллээ бүрэн оруулаарай.
              </Typography.Title>
              <Typography.Text>
                Ингэснээр бид таньд хамгийн тохирсон ажлын захиалгыг олоход
                туслах болно. Амжилт хүсье!
              </Typography.Text>
            </Layout.Sider>
            <Layout.Content>
              <Space
                size="middle"
                direction="vertical"
                style={{ width: "100%" }}
              >
                <div>
                  <h2>Зураг</h2>
                  <Space size="small" direction="vertical">
                    <Avatar shape="square" size={128} icon={<UserOutlined />} />
                    <input
                      onChange={e =>
                        setForm({ ...form, profile: e.target.files[0] })
                      }
                      ref={fileInput}
                      type="file"
                      accept="image/*"
                      multiple={false}
                    />
                  </Space>
                </div>
                <div style={{ width: "100%" }}>
                  <h2>Гадаад хэл</h2>
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Та өөрийн эзэмшсэн гадаад хэлүүдийг сонгоно уу."
                    onChange={handleLanguage}
                    style={{ width: "100%" }}
                  >
                    {languages
                      .filter(e => !form.languages.includes(e))
                      .map(e => (
                        <Select.Option key={e}>{e}</Select.Option>
                      ))}
                  </Select>
                </div>
                <div style={{ width: "100%" }}>
                  <h2>Ур чадварууд</h2>
                  <Select
                    mode="multiple"
                    size="large"
                    placeholder="Та өөрийн эзэмшсэн чадваруудыг сонгоно уу."
                    onChange={handleSkills}
                    style={{ width: "100%" }}
                  >
                    {skills
                      .filter(e => !form.skills.includes(e))
                      .map(e => (
                        <Select.Option key={e}>{e}</Select.Option>
                      ))}
                  </Select>
                </div>
                <div style={{ width: "100%" }}>
                  <h2>Туршлага</h2>
                  <Radio.Group
                    value={form.experience}
                    style={{ width: "100%" }}
                    onChange={handleExperience}
                  >
                    <Row justify="space-around" align="middle">
                      <Col span={8} xs={24} lg={6}>
                        <Radio.Button value="Beginner" className="experience">
                          <div className="t-center">
                            <Divider />
                            <h1>Beginner</h1>
                            <Divider />
                          </div>
                        </Radio.Button>
                      </Col>

                      <Col span={8} xs={24} lg={6}>
                        <Radio.Button
                          value="Intermediate"
                          className="experience"
                        >
                          <div className="t-center">
                            <Divider />
                            <h1>Intermediate</h1>
                            <Divider />
                          </div>
                        </Radio.Button>
                      </Col>

                      <Col span={8} xs={24} lg={6}>
                        <Radio.Button value="Advanced" className="experience">
                          <div className="t-center">
                            <Divider />
                            <h1>Advanced</h1>
                            <Divider />
                          </div>
                        </Radio.Button>
                      </Col>
                    </Row>
                  </Radio.Group>
                </div>
                <Row justify="end">
                  <Button type="primary" onClick={saveUserInfo}>
                    Next <RightOutlined />
                  </Button>
                </Row>
              </Space>
            </Layout.Content>
            <Layout.Sider style={{ background: "#f0f2f5" }}></Layout.Sider>
          </Layout>
          <Layout.Footer style={{ background: "#f0f2f5" }}></Layout.Footer>
        </Layout>
      </Spin>
    </App>
  )
}
export default NewFreelancer
