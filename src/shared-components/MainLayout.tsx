'use client';
import React from 'react';
import { useState } from 'react';
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Affix, Breadcrumb, Col, Layout, Menu, Row, theme } from 'antd';
import Link from 'next/link';
import logo from '../../public/logo.png';
const { Header, Sider, Content, Footer } = Layout;

import type { MenuProps } from 'antd';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import isAuth from './Auth';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href="/candidates">Candidates</Link>,
    '1',
    <PieChartOutlined />
  ),
  getItem(<Link href="/jobs">Jobs</Link>, '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [
    getItem('Team 1', '6'),
    getItem('Team 2', '8'),
  ]),
  getItem('Files', '9', <FileOutlined />),
];

function MainLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathename = usePathname();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Affix offsetTop={0}>
        <Header
          style={{
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            maxWidth: '100%',
            boxShadow:
              '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
            backdropFilter: "blur('8px')",
            alignItems: 'center',
          }}>
          <Row
            align="middle"
            justify="start"
            style={{
              height: '100%',
            }}>
            <Col
              xl={2}
              sm={3}
              xs={5}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Image
                src={logo}
                alt=""
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Col>
            <Col offset={2}>
              <Breadcrumb
                items={pathename.split('/').map((item) => {
                  return {
                    title:
                      item === ''
                        ? 'Home'
                        : item.charAt(0).toUpperCase() + item.slice(1),
                  };
                })}
              />
            </Col>
          </Row>
        </Header>
      </Affix>

      <Row>
        <Col span={4}>
          <section
            style={{
              position: 'sticky',
              width: '100%',
              height: '100%',
              maxHeight: '100vh',
              overflow: 'hidden',
            }}>
            <Affix offsetTop={64}>
              <Sider
                style={{
                  background: '#ffff',
                }}
                width={'100%'}
                breakpoint="md"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <Menu
                  defaultSelectedKeys={['1']}
                  mode="inline"
                  items={items}
                  style={{
                    paddingTop: '40px',
                    height: '100vh',
                  }}
                />
              </Sider>
            </Affix>
          </section>
        </Col>
        <Col span={20}>
          <Content
            style={{
              height: '100vh',

              minHeight: 400,
              background: colorBgContainer,
            }}>
            <div
              style={{
                marginTop: '80px',
              }}>
              {children}
            </div>
          </Content>
        </Col>
      </Row>
    </>
  );
}

export default isAuth(MainLayout);
