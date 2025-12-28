import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/sidebar";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // If no session, just render children (login page handles its own UI)
  // Middleware handles the actual route protection
  if (!session?.user) {
    return (
      <>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
          }}
        />
      </>
    );
  }

  return (
    <SessionProvider session={session}>
      <div className="min-h-screen bg-gray-950">
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="lg:ml-64 min-h-screen">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
            <div className="px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">
                    Welcome back, <span className="text-white font-medium">{session.user.name}</span>
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="p-6 lg:p-8">
            {children}
          </div>
        </main>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#1f2937",
              color: "#fff",
              border: "1px solid #374151",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </div>
    </SessionProvider>
  );
}
