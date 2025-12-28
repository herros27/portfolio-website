"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Award,
  Wrench,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Skills", href: "/admin/skills", icon: Wrench },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200 dark:border-gray-700'>
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}>
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='p-6 border-b border-gray-200 dark:border-gray-800'>
            <Link href='/admin' className='flex items-center gap-3 group'>
              <div className='relative w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110'>
                <BorderBeam size={50} duration={3} borderWidth={2} />
                <span className='text-white font-bold text-lg'>P</span>
              </div>
              <div>
                <h1 className='text-gray-900 dark:text-white font-bold text-lg group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors'>
                  Portfolio
                </h1>
                <p className='text-gray-500 text-xs'>Admin Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`relative overflow-hidden flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group ${
                      active
                        ? "bg-linear-to-r from-blue-500/10 to-purple-600/10 dark:from-blue-500/20 dark:to-purple-600/20 text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:scale-[1.02]"
                    }`}>
                    {active && (
                      <>
                        <div className='absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-blue-500 to-purple-600 rounded-r-full' />
                        <BorderBeam size={100} duration={4} borderWidth={1} />
                      </>
                    )}
                    <Icon
                      size={20}
                      className={
                        active ? "text-blue-500 dark:text-blue-400" : ""
                      }
                    />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User Section */}
          <div className='p-4 border-t border-gray-200 dark:border-gray-800'>
            <div className='relative'>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className='w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors'>
                <div className='w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg'>
                  <span className='text-white font-medium'>
                    {session?.user?.name?.[0] || "A"}
                  </span>
                </div>
                <div className='flex-1 text-left'>
                  <p className='text-gray-900 dark:text-white text-sm font-medium truncate'>
                    {session?.user?.name || "Admin"}
                  </p>
                  <p className='text-gray-500 text-xs truncate'>
                    {session?.user?.email}
                  </p>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800/95 backdrop-blur-md rounded-lg border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden'>
                  <Link
                    href='/'
                    target='_blank'
                    className='flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white transition-all'>
                    View Portfolio
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300 transition-all'>
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
