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

  const [fromDateValue, setFromDateValue] = useState<Dayjs | null>();
  const [toDateValue, setToDateValue] = useState<Dayjs | null>(dayjs());

  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    setCheckCurrentWork(e.target.checked);
    form.resetFields([['experience', name, `till`]]);
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
    return current && current > dayjs().endOf('day');
  };

  return (
    <Row gutter={50} align="middle">
      <Col md={12} xs={24}>
        <Form.Item
          name={!!name ? [name, `from`] : 'from'}
          label="From"
          rules={[
            {
              validator(rule, value, callback) {
                if (value) {
                  form.resetFields([['experience', name, `till`]]);
                }

                return Promise.resolve();
              },
            },
          ]}>
          <DatePicker
            disabledDate={disabledDate}
            onChange={(value) => setFromDateValue(value)}
            placeholder="Start"
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
          label="To"
          rules={[
            {
              validator(rule, value, callback) {
                if (!fromDateValue) {
                  form.setFields([
                    {
                      name: ['experience', name, `till`],
                      value: '',
                    },
                  ]);
                  return Promise.reject(
                    Error('Please select starting Month first')
                  );
                }
                return Promise.resolve();
              },
            },
          ]}>
          <DatePicker
            onChange={(val) => setToDateValue(val)}
            disabledDate={disabledDate}
            disabled={checkCurrentWork}
            type="text"
            placeholder="End"
            picker="month"
            style={{
              width: '100%',
            }}
            format={'MMM-YYYY'}
            minDate={dayjs(fromDateValue, MonthFormate)}
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
          <Checkbox
            disabled={fromDateValue ? false : true}
            checked={checkCurrentWork}
            onChange={onCheckboxChange}>
            Currently Working
          </Checkbox>
        </Form.Item>
      </Col>
    </Row>
  );
}

export default DatePickerToField;
