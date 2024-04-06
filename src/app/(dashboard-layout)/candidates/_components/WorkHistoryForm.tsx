'use client';
import React, { useState } from 'react';
import {
  Col,
  Collapse,
  Row,
  Typography,
  Form,
  Input,
  Divider,
  Button,
  Flex,
} from 'antd';
import DatePickerToField from './DatePickerToField';
import { PlusOutlined } from '@ant-design/icons';

function WorkHistoryForm() {
  return (
    <Collapse
      expandIconPosition="end"
      className="myClass"
      style={{
        padding: 0,
      }}
      ghost
      items={[
        {
          key: '11111',

          label: (
            <Typography.Title
              level={3}
              style={{
                margin: 0,
              }}>
              Work history{' '}
            </Typography.Title>
          ),
          children: (
            <div
              style={{
                marginTop: '20px',
              }}>
              <Form.List name="experience">
                {(fields, { add, remove }) => {
                  return (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        return (
                          <div
                            key={key}
                            style={{
                              marginTop: fields.length && '20px',
                              padding: 0,
                            }}>
                            {!!index && <Divider />}
                            <Row gutter={50}>
                              <Col md={12} xs={24}>
                                <Form.Item
                                  name={[name, `employer`]}
                                  label="Employer">
                                  <Input placeholder="Name of employer"></Input>
                                </Form.Item>
                              </Col>
                              <Col md={12} xs={24}>
                                <Form.Item
                                  name={[name, `position`]}
                                  label="Position">
                                  <Input placeholder="Position of current employer"></Input>
                                </Form.Item>
                              </Col>
                            </Row>
                            <DatePickerToField name={`${name}`} index={index} />
                            {fields.length > 1 &&
                              fields.length !== index + 1 && (
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
                  );
                }}
              </Form.List>
            </div>
          ),
        },
      ]}></Collapse>
  );
}

export default WorkHistoryForm;
