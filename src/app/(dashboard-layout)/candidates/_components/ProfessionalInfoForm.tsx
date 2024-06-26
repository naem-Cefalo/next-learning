'use client';
import React, { useState, useEffect } from 'react';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';

import { useQuery } from '@tanstack/react-query';
import getData from '../_api/getData';
import { useCandidateStore } from '../_store/candidateStore';

function ProfessionalInfoForm() {
  const skills = useCandidateStore((state) => state.skills);
  const primaryValues = Form.useWatch('primary_skills') || [];
  const secondaryValues = Form.useWatch('secondary_skills') || [];
  const [skillList, setSkillsList] = useState([]);
  const { data } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getData('entities/skills'),
  });

  useEffect(() => {
    setSkillsList(data);
  }, [data]);

  const handleFilter: any = (input: string, option: { label: string }) => {
    return (option?.label?.toString().toLowerCase() ?? '').includes(
      input.toString().toLowerCase()
    );
  };

  const options = skillList?.map((item: any) => {
    return {
      value: item.id,
      label: item.name,
      id: item.id,
    };
  });

  const handleOnchangeSkill = (value: [], filedName: string) => {
    const newValue = !!filedName
      ? [...value, ...primaryValues]
      : [...value, ...secondaryValues];

    const newSkillList = data.filter((item: { name: string }) => {
      if (newValue.every((input) => input.label !== item.name)) {
        return item;
      }
    });

    setSkillsList(newSkillList);
  };

  return (
    <div>
      <Row gutter={50}>
        <Col md={12} xs={24}>
          <Form.Item
            name={'current_employer'}
            label="Current/Last Employer"
            rules={[
              {
                required: true,
                message: 'Please input the Employer name',
              },
            ]}>
            <Input placeholder="Name of Current/Last employer"></Input>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            tooltip="For example, if notice period is 1 month, input should be 4"
            name="notice_period"
            label="Notice Period of Current/Last Employer"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
              {
                type: 'integer',
                message: 'Not a valid integer',
              },
            ]}>
            <InputNumber
              min={0}
              addonAfter="Weeks"
              style={{
                width: '100%',
              }}
              placeholder="Input your notice period in week"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col md={12} xs={24}>
          <Form.Item
            name="expected_salary"
            label="Expected Salary"
            rules={[
              {
                required: true,
                message: 'This field is required',
              },
            ]}>
            <InputNumber
              min={0}
              prefix="BDT"
              style={{
                width: '100%',
              }}
              placeholder="0"></InputNumber>
          </Form.Item>
        </Col>

        <Col md={12} xs={24}>
          <Form.Item
            name="experience_period"
            label="Total Experience"
            rules={[
              {
                type: 'integer',
                required: true,
                message: 'This field is required',
              },
            ]}>
            <InputNumber
              addonAfter="Years"
              min={0}
              style={{
                width: '100%',
              }}
              placeholder="Total professional experience in years"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={50}>
        <Col md={12} xs={24}>
          <Form.Item
            name={'primary_skills'}
            label="Primary Skills"
            rules={[
              {
                required: true,
                message: 'Please input the skill',
              },
            ]}>
            <Select
              labelInValue
              maxCount={3}
              onChange={(value) => {
                handleOnchangeSkill(value, '');
              }}
              filterOption={handleFilter}
              mode="multiple"
              placeholder="Select skill"
              allowClear
              options={options}
            />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name={'secondary_skills'}
            label="Secondary Skills"
            rules={[
              {
                required: true,
                message: 'Please input the skill',
              },
            ]}>
            <Select
              labelInValue
              maxCount={7}
              mode="multiple"
              placeholder="Select skill"
              allowClear
              onChange={(value) => {
                handleOnchangeSkill(value, 'secondary');
              }}
              filterOption={handleFilter}
              options={options}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="relevant_experience">
        {(fields) => {
          return (
            <>
              {fields.map((field, index) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <Row gutter={50} key={index}>
                    {skills?.map((item) => {
                      return (
                        <Col lg={12} xs={24} key={item.id}>
                          <Form.Item
                            label={`Professional Experience in ${item.name}`}
                            rules={[
                              {
                                required: true,
                                message: 'This field is required',
                              },
                              {
                                type: 'integer',
                                message: 'Not a valid integer',
                              },
                            ]}
                            name={[field.name, `${item.id}`]}>
                            <InputNumber
                              min={0}
                              addonAfter="Years"
                              style={{
                                width: '100%',
                              }}
                              placeholder="Input your experience"
                            />
                          </Form.Item>
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </>
          );
        }}
      </Form.List>
    </div>
  );
}

export default ProfessionalInfoForm;
