'use client';
import React, { useState } from 'react';
import { Checkbox, Col, DatePicker, Flex, Form, Row, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import type { GetProps } from 'antd';

const MonthFormate = 'MMM-YYYY';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

type Prop = {
  name?: number | string | undefined;
  index?: number | string;
};

function DatePickerToField({ name }: Prop) {
  const form = Form.useFormInstance();
  const [checkCurrentWork, setCheckCurrentWork] = useState(false);

  const [fromDateValue, setFromDateValue] = useState<Dayjs>();

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setCheckCurrentWork(e.target.checked);
    if (e.target.checked && !!name) {
      form.setFields([
        {
          name: ['experience', name, `till`],
          value: '',
        },
      ]);
    } else {
      form.setFieldValue('to', '');
    }
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf('day');
  };

  return (
    <Row gutter={50} align="middle">
      <Col md={12} xs={24}>
        <Form.Item name={!!name ? [name, `from`] : 'from'} label="From">
          <DatePicker
            disabledDate={disabledDate}
            onChange={(value) => setFromDateValue(value)}
            placeholder="Start Date"
            picker="month"
            style={{
              width: '100%',
            }}
            format={MonthFormate}
          />
        </Form.Item>
      </Col>
      <Col md={12} xs={24}>
        <Form.Item
          labelCol={{
            span: '24',
          }}
          name={!!name ? [name, `till`] : 'till'}
          label="To">
          <DatePicker
            disabledDate={disabledDate}
            disabled={checkCurrentWork || !fromDateValue}
            type="text"
            placeholder="End Date"
            picker="month"
            style={{
              width: '100%',
            }}
            format={'MMM-YYYY'}
            minDate={dayjs(fromDateValue, 'MMM-YYYY')}
          />
        </Form.Item>
        <Form.Item
          style={{
            position: 'absolute',
            top: 0,
            right: '18px',
          }}
          valuePropName="checked"
          name={!!name ? [name, 'is_current'] : 'is_current'}>
          <Checkbox checked={checkCurrentWork} onChange={onCheckboxChange}>
            Currently Working
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
}

export default DatePickerToField;
