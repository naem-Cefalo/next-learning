'use client';
import React, { useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';

import UniversityField from './UniversityField';
import { createArrayFromTo } from '@/lib/createArrayFromTo';

const years = createArrayFromTo(1955, new Date().getFullYear());

function EducationInfoForm() {
  const from = Form.useFormInstance();
  const [HSCValue, setHSCValue] = useState();
  const [bachelorValue, setBachelorValue] = useState();
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
            <Input placeholder="example: CSE,EEE" />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            required
            name={'bechelor_passing_year'}
            label="Passing Year (Bachelors or Equivalent)"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, bachelorYear) {
                  const HSCYear = getFieldValue(
                    'passing_year_hsc_or_equivalent'
                  );
                  if (!bachelorYear) {
                    return Promise.reject(new Error('This field is required'));
                  } else if (bachelorYear <= HSCYear) {
                    return Promise.reject(
                      new Error(
                        'Bachelor passing year should be greater then HSC'
                      )
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}>
            <Select
              onChange={(val) => setBachelorValue(val)}
              allowClear
              showSearch
              options={years}
              placeholder="Select year"
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            required
            name={'passing_year_hsc_or_equivalent'}
            label="Passing Year (HSC or equivalent)"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, HSCYear) {
                  const bachelorYear = getFieldValue('bechelor_passing_year');
                  if (!HSCYear) {
                    return Promise.reject(new Error('This field is required'));
                  } else if (bachelorYear <= HSCYear) {
                    return Promise.reject(
                      new Error('HSC passing year should be less then bachelor')
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}>
            <Select
              onChange={(val) => setHSCValue(val)}
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
