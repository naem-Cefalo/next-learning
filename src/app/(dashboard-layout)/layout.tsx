import MainLayout from '../shared-components/MainLayout';

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainLayout>{children}</MainLayout>
    </div>
  );
}
export default DashboardLayout;
