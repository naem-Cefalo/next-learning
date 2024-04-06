'use client';
import { Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import isAuth from './shared-components/Auth';

function Home() {
  return (
    <Row justify="center" align="middle">
      <Col>
        <Title level={2}>Welcome To ATS</Title>
      </Col>
    </Row>
  );
}

export default isAuth(Home);
