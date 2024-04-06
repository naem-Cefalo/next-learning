'use client';
import React from 'react';
import {
  Button,
  Col,
  Collapse,
  Divider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd';
import UniversityField from './UniversityField';
import { PlusOutlined } from '@ant-design/icons';
import { createArrayFromTo } from '@/app/lib/utils';
import DegreeFormField from './DegreeFormField';

const years = createArrayFromTo(1955, new Date().getFullYear());

function EducationHistoryForm() {
  return (
    <Collapse
      expandIconPosition="end"
      bordered={false}
      style={{
        backgroundColor: '#fff',
      }}
      items={[
        {
          key: '2222',
          label: (
            <Typography.Title
              style={{
                margin: 0,
              }}
              level={3}>
              Educational History
            </Typography.Title>
          ),
          children: (
            <div
              style={{
                marginTop: '20px',
              }}>
              <Form.List name="education">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name }, index) => {
                      return (
                        <div key={key}>
                          {!!index && (
                            <Divider
                              style={{
                                marginBottom: '40px',
                              }}
                            />
                          )}
                          <Row gutter={50}>
                            <Col md={12} xs={24}>
                              <UniversityField
                                name={`${name}`}
                                required={false}
                                label="Institution"
                              />
                            </Col>
                            <Col md={12} xs={24}>
                              <DegreeFormField name={`${name}`} />
                            </Col>
                          </Row>
                          <Row gutter={50}>
                            <Col md={12} sm={24} xs={24}>
                              <Form.Item name={[name, 'major']} label="Major">
                                <Input placeholder="Major" />
                              </Form.Item>
                            </Col>
                            <Col md={12} sm={24} xs={24}>
                              <Form.Item
                                name={[name, 'passing_year']}
                                label="Passing year of Degree">
                                <Select
                                  showSearch
                                  allowClear
                                  options={years}
                                  placeholder="select year"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Form.Item label="Remarks" name={[name, 'remarks']}>
                            <Input.TextArea placeholder="Additional remarks or notes (optional)" />
                          </Form.Item>

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
      ]}
    />
  );
}

export default EducationHistoryForm;
