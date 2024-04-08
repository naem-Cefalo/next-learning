'use client';
import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';

import UniversityField from './UniversityField';
import { createArrayFromTo } from '@/app/lib/utils';

const years = createArrayFromTo(1955, new Date().getFullYear());

function EducationInfoForm() {
  const from = Form.useFormInstance();
  return (
    <>
      <Row gutter={50}>
        <Col md={12} sm={24} xs={24}>
          <UniversityField
            required={true}
            label="University (Bachelors or Equivalent)"
          />
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            name={'bechelor_degree_name'}
            label="Degree (Bachelors or Equivalent)"
            rules={[
              {
                required: true,
                message: 'Please input the degree',
              },
            ]}>
            <Input placeholder="CSE,EEE,etc.." />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={'bechelor_passing_year'}
            label="Passing year (Bachelors or Equivalent)"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select
              onSelect={(val) => {
                from.validateFields(['passing_year_hsc_or_equivalent']);
              }}
              allowClear
              showSearch
              options={years}
              placeholder="Select year"
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={'passing_year_hsc_or_equivalent'}
            label="Passing year of HSC or equivalent"
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (
                    !value ||
                    getFieldValue('bechelor_passing_year') > value
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      'Bachelor passing year should be greater then HSC'
                    )
                  );
                },
              }),
            ]}>
            <Select
              allowClear
              showSearch
              options={years}
              placeholder="Select year"
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}

export default EducationInfoForm;
