import Navbar from '@/components/Navbar'

interface RootLayoutProps {
    children: React.ReactNode;
  }
  
  export default async function RootLayout({ children }: RootLayoutProps) {
    return (
      <div className="flex m-3  bg-slate-200 h-[calc(100vh-2rem)]">
        <Navbar />
        {children}
      </div>
    );
  }