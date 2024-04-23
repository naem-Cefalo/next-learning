'use client';
import { Button, Result } from 'antd';

const BoundaryError: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    extra={
      <Button href="/candidates" type="primary">
        Back Home
      </Button>
    }
  />
);

export default BoundaryError;
