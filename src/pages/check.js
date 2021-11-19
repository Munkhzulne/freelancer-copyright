import { Layout, Button, Card, Form, Spin, Image, Skeleton } from "antd"
import React, { useRef, createRef, useState, useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { App } from "../components"
import { useDocumentWithAccount } from "../firebase"

import axios from "axios"
import {
  createRecordWithAccount,
  useCollection,
  useFirebase,
  createRecord,
  useUser,
} from "../firebase"
import * as _ from "lodash"
import { baseApiURL } from "../data"
import { navigate, Link } from "gatsby"
const Post = ({ photo, user, createdAt }) => {
  console.log(user)
  return (
    <Card
      title={<Link to={`/user?u=${user}`}>Uploaded user</Link>}
      cover={photo && <Image src={photo} />}
      style={{ minWidth: 300, marginTop: 16, height: "100%" }}
    >
      Uploaded at {createdAt}
    </Card>
  )
}
export const Check = () => {
  const fileInput = useRef()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [form, setForm] = useState({ file: null })
  const { data: photos } = useCollection("photos")
  console.log(photos)
  const hammingD = async (str, str1) => {
    if (str.length === str1.length) {
      let count = 0
      for (let i = 0; i <= str1.length; i++) {
        if (str.toLowerCase()[i] !== str1.toLowerCase()[i]) {
          count++
        }
      }
      return count
    }
    return 11
  }
  const checkSimiliarPictires = async hashValue => {
    await Promise.all(
      photos.map(async ({ hash, photo, user, createdAt }) => {
        const cnt = await hammingD(hash, hashValue).then(res => {
          if (res <= 10) {
            setPosts([
              ...posts,
              { photo, user, createdAt: createdAt.toDate().toString() },
            ])
            console.log(res)
            console.log(posts)
          }
        })
      })
    )
    return
  }
  const post = async () => {
    const { file } = form
    setLoading(true)
    const data = new FormData()
    if (file != null) {
      data.append("file", file)
      axios
        .post(baseApiURL, data)
        .then(response => {
          if (response) {
            checkSimiliarPictires(response.data.hash).then(res => {
              console.log(res)
              fileInput.current.value = ""
              setForm({ file: null })
              setLoading(false)
            })
          }
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
  const { user: userC, ready } = useContext(AuthContext)
  const { data: account } = useDocumentWithAccount("")
  if (userC == null && ready) {
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
          <Card
            title="Шинээр нийтлэх"
            size="small"
            headStyle={{ background: "#001529", color: "white" }}
            style={{ borderColor: "#001529" }}
          >
            <Spin tip="Уншиж байна" size="large" spinning={loading}>
              <Form onFinish={post}>
                <Form.Item label="Зураг шалгах">
                  <input
                    onChange={e => {
                      setForm({ ...form, file: e.target.files[0] })
                      setPosts([])
                    }}
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    multiple={false}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    background: "#001529",
                    color: "white",
                    border: "none",
                  }}
                >
                  Шалгах
                </Button>
              </Form>
            </Spin>
          </Card>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {posts.map(({ photo, user, createdAt }) => (
              <Post photo={photo} user={user} createdAt={createdAt} />
            ))}
          </div>
        </Layout.Content>
      </Layout>
    </App>
  )
}
export default Check
