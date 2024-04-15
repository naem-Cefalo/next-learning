'use client';
import React, { useState } from 'react';
import { Form, Input, Select, Space } from 'antd';

const degrees = [
  { label: 'Bachelors', value: 'Bachelors' },
  { label: 'Masters', value: 'Masters' },
  { label: 'Diploma', value: 'Diploma' },
];

type Prop = {
  name?: string | number | undefined;
};

function DegreeFormField({ name }: Prop) {
  const [isSelectOtherDegree, setIsSelectOtherDegree] = useState(false);

  const onSelectChange = (value: string, fieldName: string) => {
    if (fieldName === 'degree' && value === 'Other') {
      setIsSelectOtherDegree(true);
    }

    if (fieldName === 'degree' && value !== 'Other') {
      setIsSelectOtherDegree(false);
    }
  };

  return (
    <>
      <Form.Item label="Degree">
        <Form.Item name={!!name ? [name, 'degree'] : 'degree'}>
          <Select
            allowClear
            placeholder="Select Degree"
            onChange={(value) => {
              onSelectChange(value, 'degree');
            }}
            options={degrees}
          />
        </Form.Item>
        <Space.Compact
          style={{
            width: '100%',
          }}>
          <Form.Item name={!!name ? [name, 'degree'] : 'degree'}>
            <Select
              allowClear
              placeholder="Select Degree"
              onChange={(value) => {
                onSelectChange(value, 'degree');
              }}
              options={degrees}
            />
          </Form.Item>
          {isSelectOtherDegree && (
            <Form.Item
              name={!!name ? [name, 'otherDegree'] : 'otherDegree'}
              noStyle>
              <Input style={{ width: '100%' }} placeholder="Degree name" />
            </Form.Item>
          )}
        </Space.Compact>
      </Form.Item>
    </>
  );
}

export default DegreeFormField;
