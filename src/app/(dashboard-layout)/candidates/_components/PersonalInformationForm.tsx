/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import getData from '../_api/getData';
import { dateFormate } from '@/app/modules/constant';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const uploadUrl = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_BASE_URL}upload/${path}`;

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

function PersonalInformationForm() {
  const form = Form.useFormInstance();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [pdfFileList, setPdfFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handlePdfUpload: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    if (file.response && file.status === 'done') {
      form.setFieldValue('resume', file.response.path);

      form
        .validateFields(['resume'], {
          recursive: true,
          dirty: true,
        })
        .then((val) => {
          console.log(val);
        })
        .catch((res) => {
          console.log(res);
        });
      message.success('File uploaded successfully!');
    }

    if (file.status === 'removed') {
      form.setFieldValue('resume', '');
      form
        .validateFields(['resume'], {
          recursive: true,
          dirty: true,
        })
        .then((val) => {
          console.log(val);
        })
        .catch((res) => {
          console.log(res);
        });
    }

    setPdfFileList(newFileList);
  };

  const handleChange: UploadProps['onChange'] = ({
    file,
    fileList: newFileList,
  }) => {
    if (!file.response) {
      setFileList([]);
      form.setFieldValue('photo', undefined);
    }

    if (file.response && file.status === 'done') {
      form.setFieldValue('photo', file.response.path);
      form
        .validateFields([['photo']], {
          recursive: true,
          dirty: true,
        })
        .then((val) => {
          console.log(val);
        })
        .catch((res) => {
          console.log(res);
        });
      message.success('File uploaded successfully!');
    }

    if (file.status === 'removed') {
      form.setFieldValue('photo', undefined);
      form
        .validateFields(['photo'])
        .then((value) => {
          console.log(value);
        })
        .catch((resone) => {
          console.log('resone', resone);
        });
    }

    setFileList(newFileList);
  };

  const beforeUpload = (file: FileType) => {
    const isLt2M = file.size / 1024 / 1024 < 1;

    if (!isLt2M) {
      message.error('Image must smaller than 1024KB!');
    }
    return isLt2M || Upload.LIST_IGNORE;
  };

  const {
    isLoading,
    error,
    data: jobList,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => getData('entities/jobs'),
  });

  const jobData = jobList?.length
    ? jobList?.map((item: { title: string; id: string }) => ({
        key: item.id,
        value: item.id,
        label: item.title,
      }))
    : [];

  return (
    <>
      <Row>
        <Col sm={6} md={4} xl={4} xxl={3}>
          <Form.Item
            label="Photo"
            name="photo"
            rules={[
              {
                required: true,
              },
            ]}
            style={{
              height: '140px',
            }}>
            <ImgCrop aspect={400 / 400}>
              <Upload
                // withCredentials
                headers={{
                  Authorization: 'test ats',
                }}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                maxCount={1}
                accept="image/png, image/jpeg"
                name="image"
                action={uploadUrl('image')}
                listType="picture-card">
                {fileList.length >= 1 ? null : (
                  <>
                    <Flex vertical align="center">
                      <UploadOutlined />
                      <span>400x400</span>
                      <Typography.Text
                        style={{
                          fontSize: '10px',
                        }}
                        className="ant-upload-text">
                        Upto 1024 KB.
                      </Typography.Text>
                    </Flex>
                  </>
                )}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col>
        <Col
          sm={18}
          md={20}
          xl={20}
          xxl={21}
          style={{
            paddingLeft: '-10px',
          }}>
          <Form.Item
            label="Resume / CV"
            rules={[{ required: true, message: 'Resume required' }]}
            name="resume">
            <Upload.Dragger
              // withCredentials
              headers={{
                Authorization: 'test ats',
              }}
              onChange={handlePdfUpload}
              rootClassName="uploadCv"
              action={uploadUrl('pdf')}
              listType="text"
              name="pdf"
              accept={'.pdf'}
              maxCount={1}
              beforeUpload={beforeUpload}>
              <Flex
                justify="center"
                gap={20}
                align="center"
                style={{
                  height: '70px',
                }}>
                <Flex vertical>
                  <Typography.Text className="ant-upload-text">
                    <UploadOutlined /> Drag or Upload Your Resume/CV(pdf)
                  </Typography.Text>
                  <Typography.Text
                    style={{
                      fontSize: '10px',
                    }}
                    className="ant-upload-text">
                    Upto 1024 KB.
                  </Typography.Text>
                </Flex>
              </Flex>
            </Upload.Dragger>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[
              {
                type: 'string',
                whitespace: true,
                required: true,
              },
            ]}>
            <Input placeholder="First and last name" />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name="reference"
            label="Reference (If you're referred by any Cefalo employee)">
            <Input placeholder="Mention his/her full name and designation" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
              },
              {
                max: 10,
              },
              {
                type: 'integer',
                transform: (value) => Number(value),
              },
            ]}>
            <Input prefix="+880" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}>
            <Input placeholder="example@cefalo.com" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={50}>
        <Col md={12} sm={24} xs={24}>
          <Form.Item name="job_id" label="Position Applied for">
            <Select
              loading={isLoading}
              showSearch
              filterOption={(input, option) => {
                return (option?.label ?? '').toString().includes(input);
              }}
              placeholder="Select position"
              allowClear
              options={jobData}></Select>
          </Form.Item>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Form.Item label="Applied at" name="applied_at">
            <DatePicker style={{ width: '100%' }} format={dateFormate} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={24}>
          <Form.Item
            rules={[{ required: true }]}
            label="Residential Address"
            name="address">
            <Input.TextArea placeholder="Write as much detail as you can" />
          </Form.Item>
        </Col>
      </Row>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
}

export default PersonalInformationForm;
