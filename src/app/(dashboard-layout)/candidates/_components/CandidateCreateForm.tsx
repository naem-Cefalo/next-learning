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
import ProfessionalInfoForm from './ProfessionalInfoForm';
import PersonalInformationForm from './PersonalInformationForm';
import EducationInfoForm from './EducationInfoForm';
import WorkHistoryForm from './WorkHistoryForm';
import EducationHistoryForm from './EducationHistoryForm';
import Portfolio from './Portfolio';
import { useMutation } from '@tanstack/react-query';
import postData from '../_api/postData';
import dayjs from 'dayjs';
import { dateFormate } from '@/modules/constant';

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
        employer: null,
        position: null,
        from: null,
        till: null,
        is_current: false,
      },
    ],
    education: [
      {
        degree: null,
        major: null,
        university_id: null,
        university_name: '',
        passing_year: null,
        remarks: null,
      },
    ],
    links: [
      {
        url: '',
      },
    ],
    relevant_experience: [{}],
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

        value.country_code = 'BD';
        value.expected_salary = value.expected_salary.toString();
        value.phone = `${value.phone}`;
        value.relevant_experience = Object.entries(
          value.relevant_experience[0]
        )?.map((item: any[]) => {
          return { skill_id: parseInt(item[0]), experience: item[1] };
        });

        console.log('after modified', value);

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
          name="candidate-create"
          scrollToFirstError
          colon={false}
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinishFailed={(errorInfo) => {
            console.log(errorInfo);
            // form.scrollToField(errorInfo.values[0]);
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
