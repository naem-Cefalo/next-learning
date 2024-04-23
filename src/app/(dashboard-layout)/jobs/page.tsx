'use client';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import {
  Button,
  Col,
  Dropdown,
  Flex,
  Input,
  Menu,
  Pagination,
  Radio,
  Row,
  Table,
} from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import Skills from '../../../shared-components/Skills';
import { useEffect, useState } from 'react';
import getJobs, { JobQueryParams } from '../jobs/_api/getJobs';
import TextSummary from '../../../shared-components/TextSummary';
import ATSDate from '../../../shared-components/ATSDate';
import debounce from '../../../utils/helpers/debounce';
import { jobFilters, jobStatus } from '@/utils/constants/jobs';

const menuItems = (id: number) => [
  {
    key: '1',
    label: <a onClick={() => handleMenuClick(id, 'edit')}>Edit</a>,
  },
  {
    key: '2',
    label: <a onClick={() => handleMenuClick(id, 'duplicate')}>Duplicate</a>,
  },
  {
    key: '3',
    label: <a onClick={() => handleMenuClick(id, 'delete')}>Delete</a>,
  },
];

const handleMenuClick = (id: number, action: string) => {
  alert(`id: ${id}, action: ${action}`);
};

const tableProps = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: 250,
  },
  {
    title: 'Summary',
    dataIndex: 'summary',
    render: (summary: string) => <TextSummary summary={summary} length={70} />,
    width: 350,
  },
  {
    title: 'Primary Skills',
    dataIndex: 'skills',
    render: (skills: { id: number; name: string }[]) => (
      <Skills skills={skills} />
    ),
    width: 350,
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    render: (deadline: string) => <ATSDate date={deadline}></ATSDate>,
    width: 150,
  },
  {
    title: 'State',
    dataIndex: 'state',
    render: (state: string) => (
      <span style={{ textTransform: 'uppercase' }}>{state}</span>
    ),
    width: 150,
  },
  {
    title: '',
    dataIndex: 'id',
    render: (id: number) => (
      // @ts-ignore
      <Dropdown overlay={<Menu items={menuItems(id)} />}>
        <a onClick={(e) => e.preventDefault()}>...</a>
      </Dropdown>
    ),
  },
];

const JobsPage = () => {
  const router = useRouter();
  const [queryParams, setQueryParams] = useState<JobQueryParams>({
    status: 'published',
    showDeleted: false,
    page: 1,
    rows: 10,
    query: '',
  });

  const [totalData, setTotalData] = useState(0);

  const updateQueryParams = (val: string) => {
    setQueryParams({
      ...queryParams,
      status: [jobStatus.published, jobStatus.draft].includes(val) ? val : '',
      showDeleted: val === jobStatus.archived,
      page: 1,
    });
  };

  const pageChanged = (page: number, pageSize: number) => {
    setQueryParams({
      ...queryParams,
      page: page,
      rows: pageSize,
    });
  };

  const onInputSearch = (e: any) => {
    let params = { ...queryParams };
    params.query = e.target.value;
    params.page = 1;
    setQueryParams(params);
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['getJobs', queryParams],
    queryFn: () => {
      return getJobs(queryParams);
    },
  });

  useEffect(() => {
    if (data?.total) {
      setTotalData(data.total);
    }
  }, [data]);

  return (
    <Row
      justify="center"
      style={{
        marginTop: '80px',
      }}>
      <Col xxl={18} md={22}>
        <Flex
          justify="space-between"
          style={{
            marginBottom: '20px',
            borderRadius: 0,
          }}>
          <Flex vertical gap="middle">
            <Radio.Group
              defaultValue="published"
              onChange={(event) => updateQueryParams(event.target.value)}
              className={'custom-radio-tab'}>
              {jobFilters.map((status) => {
                return (
                  <Radio.Button
                    className="custom-radio"
                    value={status.id}
                    key={status.id}>
                    {status.name}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </Flex>

          <Flex gap="middle">
            <Input
              placeholder="Search with Title, Summary"
              allowClear
              onChange={debounce(onInputSearch, 500)}
              style={{ width: 300 }}
            />
            <Button
              type="default"
              size="large"
              icon={<FileAddOutlined />}
              onClick={() => {
                router.push('jobs/add');
              }}>
              New Job{' '}
            </Button>
          </Flex>
        </Flex>
        <Table
          //@ts-ignore
          rowKey={(record) => record.id}
          // title={() => <Typography.Text strong>Open Positions</Typography.Text>}
          loading={isPending}
          columns={tableProps}
          //@ts-ignore
          dataSource={data?.data}
          pagination={false}
        />

        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <Pagination
            showSizeChanger={true}
            current={queryParams.page}
            onChange={pageChanged}
            defaultCurrent={1}
            total={totalData}
            pageSize={queryParams.rows}
          />
        </div>
      </Col>
    </Row>
  );
};
export default JobsPage;
