import React from "react"
import { Button, Card, Form, Avatar, Spin, Skeleton, Image } from "antd"
import {
  SettingOutlined,
  EditOutlined,
  UserOutlined,
  EllipsisOutlined,
} from "@ant-design/icons"
import { useCollection,useDocument } from "../firebase"
import { Link } from "gatsby"

export const Posts = ({id = null}) => {
  console.log(id)
  const { data, loading } = useCollection(`users/${id}/posts`)
  const { data: account } = useDocument(`users/${id}`)

  return (
    <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent:"space-around"}}>
      {data && data.map(el => {
        return (
          <Card
            cover={el.photo &&
              <Image
                src={el.photo}
              />
            }
            style={{ minWidth: 300, marginTop: 16, height: "100%" }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Skeleton loading={loading} avatar active>
              <Card.Meta
                avatar={
                  <Link to={`/user`}>
                    <Avatar src={account && (account.profile && account.profile)} icon={account && (!account.profile && <UserOutlined />)}/>
                  </Link>
                }
                title={el.title}
                style={{ width: 200}}
                description={el.description}
              />
            </Skeleton>
          </Card>
        )
      })}
    </div>
  )
}
