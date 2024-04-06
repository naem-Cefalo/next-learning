'use client';
import { Button, Col, Flex, Row, Table, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import Skills from '@/app/shared-components/Skills';
import type { TableProps } from 'antd';

const data = [
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
  {
    name: 'Azman Amin Azman',
    appliedAt: '7 MAR 2024',
    status: 'HR Interview Scheduled',
    jobTitle: 'Sr. Software Test Enginee',
    experience: '3 years',
    primarySkill: [
      {
        id: 126,
        name: 'Software Testing',
      },
      {
        id: 127,
        name: 'Manual Testing',
      },
      {
        id: 128,
        name: 'Test Automation',
      },
      {
        id: 129,
        name: 'API Testing',
      },
      {
        id: 130,
        name: 'Performance Testing',
      },
    ],
    employer: 'Cefalo home company',
    university: 'BUET',
  },
];

const CandidatePage = () => {
  const router = useRouter();

  type skill = {
    id: number;
    name: string;
  };
  interface DataType {
    name: string;
    appliedAt: string;
    status: string;
    jobTitle: string;
    experience: string;
    primarySkill: skill[];
    employer: string;
    university: string;
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Applied at',
      dataIndex: 'appliedAt',
      align: 'center',
      render: (text: { $d: string }) => {
        return (
          <Typography.Text>
            {dayjs(text.$d).format('DD/MM/YYYY')}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      align: 'center',
    },
    {
      title: 'Experience',
      dataIndex: 'experience',
      align: 'center',
    },
    {
      title: 'Primary Skill',
      dataIndex: 'primarySkill',
      width: 280,
      align: 'center',
      // TODO: type module should be sharable
      render: (skills: []) => {
        return <Skills skills={skills} />;
      },
    },
    { title: 'Employer', dataIndex: 'employer', align: 'center' },
    {
      title: 'University',
      dataIndex: 'university',
      align: 'center',
    },
  ];

  // const { isPending, error, data, isFetching } = useQuery({
  //   queryKey: ['candidates'],
  //   queryFn: getCandidates,
  // });

  // const dynamicData = await fetch(
  //   `https://jsonplaceholder.typicode.com/users`,
  //   { cache: 'no-store' }
  // );
  // const promisData = await dynamicData.json();
  // console.log(dynamicData);

  return (
    <Row justify="center">
      <Col md={22}>
        <Row
          justify="end"
          style={{
            marginBottom: '30px',
          }}>
          <Col>
            <Flex justify="end">
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  router.push('candidates/add');
                }}>
                Create Candidate{' '}
              </Button>
            </Flex>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} size="middle" />
      </Col>
    </Row>
  );
};

export default CandidatePage;
