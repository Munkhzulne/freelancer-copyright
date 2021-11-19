import React from "react"
import { Layout, Row, Col, Menu, Space, Button } from "antd"
const Landing = () => {
  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={10} offset={2}>
        <h1 className="t-w" style={{ fontSize: "50px" }}>
          Хамтдаа санаагаа бодит байдал болгоё.
        </h1>
        <h1 className="t-w">
          Хаанаас ч хэзээ ч хамгийн сайн ажил, хамгийн чадварлаг хүнийг олох
          болно.
        </h1>
        <Space size="large">
          <Button>Би бол ажлын захиалагч</Button>
          <Button>Би бол ажлын гүйцэтгэгч</Button>
        </Space>
      </Col>
    </Row>
  )
}
export { Landing }
