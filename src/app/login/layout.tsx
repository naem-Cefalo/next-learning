export default function LoginLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        backgroundColor: 'whitesmoke',
      }}>
      {children}
    </section>
  );
}
