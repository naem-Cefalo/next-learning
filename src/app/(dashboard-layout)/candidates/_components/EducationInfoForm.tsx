'use client';
import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';

import UniversityField from './UniversityField';
import { createArrayFromTo } from '@/app/lib/utils';

const years = createArrayFromTo(1955, new Date().getFullYear());

function EducationInfoForm() {
  const bachelorYear = Form.useWatch('bechelor_passing_year');
  const HSCYear = Form.useWatch('passing_year_hsc_or_equivalent');
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
              {
                validator: (_, value) => {
                  if (value) {
                    if (HSCYear >= value) {
                      return Promise.reject(
                        new Error('Bachelors should be getter then HSC')
                      );
                    } else Promise.resolve();
                  } else {
                    return Promise.reject(new Error('This field is required!'));
                  }
                },
              },
            ]}>
            <Select
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
              {
                validator: (_, value) => {
                  if (value) {
                    if (value >= bachelorYear) {
                      return Promise.reject(
                        new Error('HSC should be lower then Bachelor')
                      );
                    } else Promise.resolve();
                  } else {
                    return Promise.reject(new Error('Required'));
                  }
                },
              },
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
