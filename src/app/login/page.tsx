'use client';
import React from 'react';
import { Card, Flex, message } from 'antd';
import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import Title from 'antd/es/typography/Title';
import withTheme from '@/theme';

type FieldType = {
  username: string;
  password: string;
};
function Login() {
  const router = useRouter();
  const onFinish = (values: FieldType) => {
    console.log('Success:', typeof values.password);
    if (values.password === '1234') {
      localStorage.setItem('auth', 'true');
      router.push('/candidates');
    } else {
      message.error('Your password is incorrect');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Flex
      align="center"
      justify="center"
      vertical
      style={{
        height: '100vh',
      }}>
      <Title level={2}>Login</Title>
      <Card
        bordered
        style={{
          width: 600,
        }}>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
            ]}>
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}

const LoginPage = () => {
  return withTheme(<Login />);
};

export default LoginPage;
