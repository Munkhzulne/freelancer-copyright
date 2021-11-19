import React, { useContext } from "react"
import { Link } from "gatsby"
import { Navigation, Landing, App } from "../components"
import { AuthContext, AuthUserProvider } from "../contexts/AuthContext"
import { Layout } from "antd"
import "antd/dist/antd.css"
import "../index.css"
const IndexPage = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <App>
      <Layout className="landing">
        <Landing />
      </Layout>
    </App>
  )
}

export default IndexPage
