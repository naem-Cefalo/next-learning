'use client';
import React from 'react';
import {
  Button,
  Col,
  Divider,
  Flex,
  Form,
  message,
  Row,
  Typography,
} from 'antd';
import { useRouter } from 'next/navigation';
import ProfessionalInfoForm from '../_components/ProfessionalInfoForm';
import PersonalInformationForm from '../_components/PersonalInformationForm';
import EducationInfoForm from '../_components/EducationInfoForm';
import WorkHistoryForm from '../_components/WorkHistoryForm';
import EducationHistoryForm from '../_components/EducationHistoryForm';
import Portfolio from '../_components/Portfolio';
import { useMutation } from '@tanstack/react-query';
import postData from '../_api/postData';
import dayjs from 'dayjs';
import { dateFormate } from '@/app/modules/constant';

const CandidateCreateForm: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return postData('candidates', data);
    },
  });

  const initialValues = {
    applied_at: dayjs(dayjs(), dateFormate),
    experience: [
      {
        employer: '',
        position: '',
        from: '',
        till: '',
        is_current: false,
      },
    ],
    education: [
      {
        degree: '',
        major: '',
        university_id: null,
        university_name: '',
        passing_year: null,
        remarks: '',
      },
    ],
    links: [
      {
        url: '',
      },
    ],
  };

  const steps = [
    {
      title: 'Personal Details',
      subTitle: '',
      content: <PersonalInformationForm />,
    },
    {
      title: 'Professional Information',
      subTitle: '',
      content: <ProfessionalInfoForm />,
    },

    {
      title: 'Educational Background',
      subTitle: '',
      content: <EducationInfoForm />,
    },
    {
      title: '',
      subTitle: '',
      content: <WorkHistoryForm />,
    },
    {
      title: '',
      subTitle: '',
      content: <EducationHistoryForm />,
    },
    {
      title: '',
      subTitle: '',
      content: <Portfolio />,
    },
  ];

  const handleSubmit = () => {
    form
      .validateFields()
      .then((value) => {
        // router.push('/candidates');

        console.log('before modified', value);

        value.country_code = 'BD';
        value.expected_salary = value.expected_salary.toString();
        value.phone = `+880${value.phone}`;
        delete value.applied_at;

        mutate(value, {
          onSuccess() {
            message.success('Candidate successfully applied');
            router.push('/candidates');
          },
          onError(error, variables, context) {
            console.log(error);

            message.error('Something went wrong');
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Row justify="space-evenly" className="myClass">
      <Col xxl={19} xl={18} md={20} sm={22} xs={23}>
        <Form
          scrollToFirstError
          colon={false}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinishFailed={(errorInfo) => {
            console.log(errorInfo.values);
          }}
          onFinish={handleSubmit}>
          {steps.map((item, index) => {
            return (
              <div key={index}>
                {index > 0 && <Divider />}
                <Typography.Title level={3}>{item.title}</Typography.Title>

                {item.content}
              </div>
            );
          })}
          <Row
            justify="end"
            style={{
              margin: '100px 0',
            }}>
            <Col span={8}>
              <Form.Item>
                <Flex gap={20} justify="end">
                  <Button loading={isPending} type="primary" htmlType="submit">
                    Submit Now
                  </Button>
                  <Button>Cancel</Button>
                </Flex>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};

export default CandidateCreateForm;
