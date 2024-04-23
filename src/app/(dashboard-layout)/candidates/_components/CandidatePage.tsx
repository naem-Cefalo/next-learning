'use client';
import {
  Button,
  Col,
  Dropdown,
  Flex,
  Row,
  Space,
  Table,
  Typography,
} from 'antd';
import { useRouter } from 'next/navigation';
import { PlusOutlined, CaretDownOutlined } from '@ant-design/icons';
import Skills from '@/shared-components/Skills';
import type { MenuProps, TableProps } from 'antd';
import ATSDate from '@/shared-components/ATSDate';
import { useQuery } from '@tanstack/react-query';
import getData from '../_api/getData';

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
    },
    {
      title: 'Applied at',
      dataIndex: 'updated_at',
      align: 'center',
      render: (text) => {
        return <ATSDate date={text}></ATSDate>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      align: 'center',
    },
    {
      title: 'Job Title',
      dataIndex: 'job_id',
      align: 'center',
    },
    {
      title: 'Experience',
      dataIndex: 'experience_period',
      align: 'center',
    },
    {
      title: 'Primary Skills',
      dataIndex: 'primary_skills',
      align: 'center',
      render: (skills: []) => {
        return <Skills skills={skills} />;
      },
    },
    {
      title: 'Relevant Experiences',
      dataIndex: 'relevant_experiences',
      width: 280,
      align: 'center',
      // TODO: type module should be sharable
      render: (skills: []) => {
        return <Skills skills={skills} />;
      },
    },
    { title: 'Employer', dataIndex: 'current_employer', align: 'center' },
    {
      title: 'University',
      dataIndex: 'university',
      align: 'center',
    },
  ];

  const {
    isLoading: isCandidateLoading,
    error: CandidateError,
    data: CandidateList,
  } = useQuery({
    queryKey: ['candidates'],
    queryFn: () => getData('candidates'),
  });

  console.log(CandidateList);

  const { isLoading: isSkillLoading, data: skillList } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getData('entities/skills'),
  });

  const {
    isLoading: isJobLoading,
    error: JobError,
    data: jobList,
    refetch,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getData('entities/jobs'),
  });

  const itemsJob: MenuProps['items'] = jobList?.map(
    (item: { id: string; title: string }) => {
      return {
        key: item.id,
        label: item.title,
      };
    }
  );
  const itemsSkill: MenuProps['items'] = skillList?.map(
    (item: { id: string; name: string }) => {
      return {
        key: item.id,
        label: item.name,
      };
    }
  );
  // jobList?.map((item) => {
  //   return {
  //     key: item.id,
  //     label: item.title,
  //   };
  // });

  return (
    <Row justify="center">
      <Col md={22}>
        <Row
          justify="space-between"
          style={{
            marginBottom: '20px',
          }}
          gutter={20}>
          <Col>
            <Space>
              <Dropdown menu={{ items: itemsJob }} trigger={['click']} arrow>
                <Button>
                  <Space>
                    Jobs
                    <CaretDownOutlined />
                  </Space>
                </Button>
              </Dropdown>
              <Dropdown
                menu={{ items: itemsSkill }}
                trigger={['click']}
                arrow
                overlayStyle={{
                  maxHeight: '400px',
                  height: '200px',
                }}>
                <Button>
                  <Space>
                    Skills
                    <CaretDownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </Col>
          <Col>
            <Button
              icon={<PlusOutlined />}
              onClick={() => {
                router.push('candidates/add');
              }}>
              Create Candidate{' '}
            </Button>
          </Col>
        </Row>
        <Table
          loading={isCandidateLoading}
          columns={columns}
          dataSource={CandidateList}
          size="middle"
        />
      </Col>
    </Row>
  );
};

export default CandidatePage;
