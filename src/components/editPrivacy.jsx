import React, { useState, useEffect } from "react"
import * as _ from "lodash"
import { updateRecordWithAccount, useDocumentWithAccount } from "../firebase"
import {
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
  Input,
} from "antd"
import { MailOutlined, LockOutlined } from "@ant-design/icons"
import { languages, skills } from "../data"
import { navigate } from "gatsby"

export const EditProfile = () => {
  let { data: account } = useDocumentWithAccount("")
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  useEffect(() => {
    console.log(account)
  }, [account])
  const [loading, setLoading] = useState(false)
  const saveUserInfo = async () => {
  }
  return (
    <Spin size="large" spinning={loading}>
      <Space size="middle" direction="vertical" style={{ width: "100%" }}>
        <div>
          <h2>Нэр</h2>
          <Row style={{ width: "100%" }}>
            <Form>
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
            </Form>
          </Row>
        </div>
        <Row justify="end">
          <Button
            type="primary"
            onClick={saveUserInfo}
            shape="round"
            size="large"
            style={{ background: "#001529", border: "none" }}
            block
          >
            Save
          </Button>
        </Row>
      </Space>
    </Spin>
  )
}
