'use client';
import React, { useState } from 'react';
import {
  Avatar,
  Card,
  Col,
  Flex,
  Rate,
  Row,
  Typography,
  Button,
  Space,
  Tooltip,
  Tabs,
  Select,
} from 'antd';
import type { SelectProps } from 'antd';

import {
  UserOutlined,
  DownOutlined,
  MinusCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  StarOutlined,
  FilePdfOutlined,
  EditOutlined,
} from '@ant-design/icons';

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

const options: SelectProps['options'] = [
  {
    label: 'New',
    value: 'new',
    emoji: <UserOutlined />,
    desc: 'New candidate applied',
  },
  {
    label: 'Shortlisted',
    value: 'Shortlisted',
    emoji: <CheckCircleOutlined />,
    desc: 'USA (美国)',
  },
  {
    label: 'Interviewed',
    value: 'Interviewed',
    emoji: <StarOutlined />,
    desc: 'Japan (日本)',
  },
  {
    label: 'Hired',
    value: 'Hired',
    emoji: <DownOutlined />,
    desc: 'Korea (韩国)',
  },
];

function CandidateDetailsPage({ params }: { params: { id: number | string } }) {
  const [review, setReview] = useState(1);

  console.log(params.id);

  const tabItems = [
    {
      key: '1',
      label: 'Applicant Details',
      children: 'All details will be here',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Applicant Remarks',
      children: 'Applicant Remarks',
      icon: <CheckCircleOutlined />,
    },
    {
      key: '3',
      label: 'Evaluation',
      children: 'Evaluation of Applicant',
      icon: <StarOutlined />,
    },
    {
      key: '4',
      label: 'CV',
      children: 'CV Shows up here',
      icon: <FilePdfOutlined />,
    },
    {
      key: '5',
      label: 'Edit',
      children: 'Edit applicant all info',
      icon: <EditOutlined />,
    },
  ];
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        padding: '20px',
      }}
      size="large">
      <Card bordered={false}>
        <Row justify="space-between">
          <Col md={11}>
            <Row>
              <Col lg={6} xl={5}>
                <Avatar
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 120 }}
                  icon={<UserOutlined />}
                />
              </Col>
              <Col>
                <Typography.Title
                  level={2}
                  style={{
                    marginTop: '0',
                  }}>
                  Gunnhild Mentor Medier AS
                </Typography.Title>
                <Typography.Title level={5}>
                  Senior software engineer
                </Typography.Title>
                <Typography.Text>Applied today</Typography.Text>
              </Col>
            </Row>
          </Col>
          <Col md={11}>
            <Row justify="end">
              <Col md={24}>
                <Card
                  style={{
                    backgroundColor: '#f5f5f5',
                    // width: '100%',
                    // minWidth: '325px',
                  }}>
                  <Flex align="baseline" gap={20} justify="space-between">
                    <Typography.Title
                      level={5}
                      style={{
                        margin: 0,
                      }}>
                      {desc[review - 1]}
                    </Typography.Title>
                    <Flex gap="middle" vertical>
                      <Rate
                        tooltips={desc}
                        onChange={(val) => setReview(val)}
                        value={review}
                      />
                    </Flex>
                  </Flex>
                </Card>
              </Col>
            </Row>
            <Row
              justify="space-between"
              align="middle"
              style={{
                marginTop: '20px',
              }}>
              <Col>
                <Tooltip title="Disqualify">
                  {' '}
                  <Button icon={<MinusCircleOutlined />}></Button>
                </Tooltip>
                <Tooltip title="Schedule">
                  {' '}
                  <Button icon={<CalendarOutlined />}></Button>
                </Tooltip>

                {/* <Typography.Text>Disqualify</Typography.Text> */}
              </Col>
              <Col>
                <Space>
                  <Typography.Text strong>Stage</Typography.Text>
                  <Select
                    status="warning"
                    style={{ width: 120 }}
                    options={options}
                    optionRender={(option) => (
                      <Space>
                        <span role="img" aria-label={option.data.label}>
                          {option.data.emoji}
                        </span>
                        {option.data.label}
                      </Space>
                    )}
                  />
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Tabs defaultActiveKey="1" items={tabItems} />
    </Space>
  );
}

export default CandidateDetailsPage;
