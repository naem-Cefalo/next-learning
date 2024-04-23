import { AntdRegistry } from '@ant-design/nextjs-registry';
import ReactQueryWrapper from '../shared-components/ReactQuery';
import './global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ReactQueryWrapper>{children}</ReactQueryWrapper>
        </AntdRegistry>
      </body>
    </html>
  );
}
