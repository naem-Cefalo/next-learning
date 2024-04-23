'use client';
import React, { useState } from 'react';
import { Form, Input, Row, Select, Space } from 'antd';
import { useQuery } from '@tanstack/react-query';
import getData from '../_api/getData';

function UniversityField({
  name,
  required,
  label,
}: {
  name?: number | string | undefined;
  required?: boolean;
  label?: string;
}) {
  const [isSelectOtherUniversity, setIsSelectOtherUniversity] = useState(false);

  const {
    isLoading,
    error,
    data: universityList,
  } = useQuery({
    queryKey: ['universities'],
    queryFn: () => getData('entities/universities'),
  });

  const onSelectChange = (value: string, fieldName: string) => {
    if (fieldName === label && value === 'Other') {
      setIsSelectOtherUniversity(true);
    }

    if (fieldName === label && value !== 'Other') {
      setIsSelectOtherUniversity(false);
    }
  };
  return (
    <Form.Item label={label} required={required}>
      <Space.Compact
        style={{
          width: '100%',
        }}>
        <Form.Item
          noStyle
          name={!!name ? [name, 'university_id'] : 'university_id'}
          rules={[
            {
              required: required,
              message: 'Please input the university name',
            },
          ]}>
          <Select
            style={{
              width: isSelectOtherUniversity ? '40%' : '100%',
            }}
            allowClear
            showSearch
            filterOption={(input, option) => {
              return (
                option?.label?.toString().toLocaleLowerCase() ?? ''
              ).includes(input);
            }}
            placeholder={`Select ${name ? 'institution' : 'university'}`}
            onChange={(value) => {
              onSelectChange(value, 'university');
            }}
            options={universityList?.map(
              (item: { name: string; id: number }) => ({
                value: item.id,
                label: item.name,
              })
            )}
          />
        </Form.Item>
        {isSelectOtherUniversity && (
          <Form.Item
            name={!!name ? [name, 'otherUniversity'] : 'otherUniversity'}
            noStyle>
            <Input style={{ width: '100%' }} placeholder="Input other" />
          </Form.Item>
        )}
      </Space.Compact>
    </Form.Item>
  );
}

export default UniversityField;
