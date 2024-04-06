'use client';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';

function Portfolio() {
  return (
    <Collapse
      expandIconPosition="end"
      bordered={false}
      style={{
        backgroundColor: '#fff',
      }}
      items={[
        {
          key: '3',
          label: (
            <Typography.Title
              style={{
                margin: 0,
              }}
              level={3}>
              Portfolio
            </Typography.Title>
          ),
          children: (
            <div
              style={{
                marginTop: '20px',
              }}>
              <Row gutter={50}>
                <Col md={12} sm={24} xs={24}>
                  <Form.Item
                    name="linkedin"
                    label="LinkedIn URL"
                    rules={[
                      {
                        type: 'url',
                      },
                    ]}>
                    <Input placeholder="Write url" />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <Form.Item
                    name={'github'}
                    label="Github URL"
                    rules={[
                      {
                        type: 'url',
                      },
                    ]}>
                    <Input placeholder="Write url" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={50}>
                <Col md={12} sm={24} xs={24}>
                  <Form.Item
                    name="stackoverflow"
                    label="StackOverflow URL"
                    rules={[
                      {
                        type: 'url',
                      },
                    ]}>
                    <Input placeholder="Write url" />
                  </Form.Item>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <Form.Item
                    name={'portfolio'}
                    label="Website/Blog/Portfolio URL"
                    rules={[
                      {
                        type: 'url',
                      },
                    ]}>
                    <Input placeholder="Write url" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.List name="links">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => {
                      return (
                        <div
                          title={`Previous experience ${index}`}
                          key={key}
                          style={{
                            marginTop: fields.length > 1 ? '20px' : '0',
                            padding: 0,
                          }}>
                          {!!index && <Divider />}
                          <Row gutter={50}>
                            <Col xs={24}>
                              <Form.Item label="Other url" name={[name, 'url']}>
                                <Input placeholder="Additional url"></Input>
                              </Form.Item>
                            </Col>
                          </Row>
                          {fields.length > 1 && fields.length !== index + 1 && (
                            <Row>
                              <Col>
                                <Button danger onClick={() => remove(name)}>
                                  Remove
                                </Button>
                              </Col>
                            </Row>
                          )}
                        </div>
                      );
                    })}
                    <Flex gap={20}>
                      <Button
                        onClick={() => add()}
                        style={{
                          marginTop: fields.length && '20px',
                        }}
                        icon={<PlusOutlined />}>
                        Add
                      </Button>
                      {fields.length > 1 && (
                        <Button
                          danger
                          style={{
                            marginTop: fields.length && '20px',
                          }}
                          onClick={() => remove(fields.length - 1)}>
                          Remove
                        </Button>
                      )}
                    </Flex>
                  </>
                )}
              </Form.List>
            </div>
          ),
        },
      ]}></Collapse>
  );
}

export default Portfolio;
