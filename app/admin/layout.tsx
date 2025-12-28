import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import AdminSidebar from "@/components/admin/sidebar";
import { auth } from "@/lib/auth";
import { BorderBeam } from "@/components/ui/border-beam";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
        <AdminSidebar />
        
        {/* Main Content */}
        <main className="lg:ml-64 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800/50 shadow-sm dark:shadow-lg transition-colors duration-300">
            <BorderBeam 
              size={300} 
              duration={10} 
              borderWidth={1} 
              colorFrom="#3b82f6" 
              colorTo="#8b5cf6"
              className="opacity-50"
            />
            <div className="px-6 py-4 lg:px-8">
              <div className="flex items-center justify-between">
                <div className="lg:hidden w-10" /> {/* Spacer for mobile menu button */}
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Welcome back, <span className="font-medium bg-linear-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{session.user.name}</span>
                  </span>
                  <AnimatedThemeToggler 
                    className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all hover:scale-105"
                    duration={400}
                  />
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
