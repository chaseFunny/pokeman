"use client";
// src/components/layout/header.tsx
import { Menu } from "lucide-react"; // 引入 Menu 图标
import Link from "next/link";
import React, { useState } from "react"; // 引入 useState



import { navLinks, siteConfig } from "@/config";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 初始化菜单状态为收起

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // 切换菜单状态
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          {siteConfig.title}
        </Link>

        <div className="hidden md:flex justify-end gap-2 leading-9">
          {/* 桌面端导航栏 */}
          <nav className="hidden md:flex space-x-4">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.text}
              </Link>
            ))}
          </nav>
          {/* <UserNav /> */}
        </div>
        {/* 移动端汉堡菜单图标 */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="h-6 w-6" />
          </button>
          {/* <UserNav /> */}
        </div>
      </div>

      {/* 移动端导航菜单 (默认隐藏，展开时显示) */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-white dark:bg-gray-800`}>
        <div className="px-4 py-2 flex flex-col space-y-2">
          {navLinks.map((item) => (
            <Link
              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
              key={item.href}
              href={item.href}
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
