'use client';
import React from 'react';
import { Card, Col, Flex, message, Row } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Title from 'antd/es/typography/Title';
import withTheme from '@/theme';
import { GooglePlusOutlined } from '@ant-design/icons';
import logo from '../../../../public/logo.png';
import Image from 'next/image';

function Login() {
  return (
    <>
      <Row
        style={{
          background: 'white',
          height: '64px',
        }}
        align="middle">
        <Col offset={2}>
          <Image src={logo} alt="" width={100} />
        </Col>
      </Row>
      <Flex
        align="center"
        justify="center"
        vertical
        style={{
          height: '100vh',
        }}>
        <Title level={2}>Login</Title>
        <Card
          style={{
            width: 600,
            textAlign: 'center',
          }}>
          <Button
            href="https://atsapi.cefalolab.com/admin"
            size="large"
            type="primary"
            icon={<GooglePlusOutlined style={{}} />}>
            Login with cefalo account
          </Button>
        </Card>
      </Flex>
    </>
  );
}

const LoginPage = () => {
  return withTheme(<Login />);
};

export default LoginPage;
