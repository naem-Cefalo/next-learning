/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

import {
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
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
import { useCandidateStore } from '../_store/candidateStore';
import { SkillsProps } from '@/app/modules/data-types';

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
  const setSkillsData = useCandidateStore((state) => state.setSkillsData);
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
          console.debug(val);
        })
        .catch((res) => {
          console.debug(res);
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
          console.debug(val);
        })
        .catch((res) => {
          console.debug(res);
        });
    }

    setPdfFileList(newFileList);
  };

  const handleChangeImageUpload: UploadProps['onChange'] = ({
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
          console.debug(val);
        })
        .catch((res) => {
          console.debug(res);
        });
      message.success('File uploaded successfully!');
    }

    if (file.status === 'removed') {
      form.setFieldValue('photo', undefined);
      form
        .validateFields(['photo'])
        .then((value) => {
          console.debug(value);
        })
        .catch((resone) => {
          console.debug('resone', resone);
        });
    }

    setFileList(newFileList);
  };
  const validateImageAspect = async (file: FileType) => {
    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg'
    ) {
      return false;
    }
    let img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    if (img.width < 400 && img.height < 400) {
      return false;
    }
    return true;
  };

  const validateFileSize = (file: FileType) => {
    const isLt2M = file.size / 1024 / 1024 < 1;

    return isLt2M;
  };

  const beforeUploadPdf = (file: FileType) => {
    if (file?.type !== 'application/pdf') {
      message.error('Only PDF supported');
      return false || Upload.LIST_IGNORE;
    }
    const iSValidFileSize = validateFileSize(file);
    if (!iSValidFileSize) {
      message.error('File size must be upto 1024kb!');
      return iSValidFileSize || Upload.LIST_IGNORE;
    }
  };

  const beforeUploadImg = async (file: FileType) => {
    const isValidImageAspect = await validateImageAspect(file);

    const iSValidFileSize = validateFileSize(file);

    if (
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'image/jpg'
    ) {
      message.error('Only JPEG,JPG and PNG supported');
      return Upload.LIST_IGNORE;
    }

    if (!iSValidFileSize) {
      message.error('File size must be smaller than 1025KB!');
      return false || Upload.LIST_IGNORE;
    }

    if (!isValidImageAspect) {
      message.error('Image size is less then 400*400 size');
      return Upload.LIST_IGNORE || isValidImageAspect;
    }
    return true;
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
    ? jobList?.map(
        (item: {
          title: string;
          id: string;
          skills: SkillsProps['skills'];
          label: string;
        }) => ({
          key: item.id,
          value: item.id,
          label: item.title,
          skills: item.skills,
        })
      )
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
                message: 'Image required',
              },
            ]}
            style={{
              height: '140px',
            }}>
            <ImgCrop aspect={400 / 400} beforeCrop={validateImageAspect}>
              <Upload
                // withCredentials
                headers={{
                  Authorization: 'test ats',
                }}
                onPreview={handlePreview}
                onChange={handleChangeImageUpload}
                beforeUpload={beforeUploadImg}
                maxCount={1}
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                action={uploadUrl('image')}
                listType="picture-card">
                {fileList.length >= 1 ? null : (
                  <>
                    <Flex vertical align="center">
                      <UploadOutlined />
                      <span>400*400</span>
                      <span>px</span>
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
              beforeUpload={beforeUploadPdf}>
              <Flex
                justify="center"
                gap={20}
                align="center"
                style={{
                  height: '70px',
                }}>
                <Flex vertical>
                  <Typography.Text className="ant-upload-text">
                    <UploadOutlined /> Drag or Upload Your Resume/CV (pdf)
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
                type: 'integer',
              },
            ]}>
            <InputNumber
              maxLength={10}
              minLength={5}
              min={0}
              prefix="+880"
              style={{ width: '100%' }}
            />
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
              onSelect={(
                _,
                { skills }: { skills: SkillsProps['skills']; label: string }
              ) => setSkillsData(skills)}
              loading={isLoading}
              showSearch
              filterOption={(input, option) => {
                return (option?.label ?? '')
                  .toString()
                  .toLowerCase()
                  .includes(input.toLowerCase());
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
