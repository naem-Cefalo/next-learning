'use client';
import { Col, Row, Spin } from 'antd';

const DashBoardLoading = () => {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Spin size="large" />
      </Col>
    </Row>
  );
};

export default DashBoardLoading;
