import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Briefcase, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isHR = location.pathname.startsWith('/hr');

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex w-full">
            <div className="flex-shrink-0 flex items-center gap-2 text-indigo-600">
              {isHR ? (
                <>
                  <LayoutDashboard className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tight">RecruitFlow <span className="text-slate-400 font-normal ml-1">| HR Control Center</span></span>
                </>
              ) : (
                <>
                  <Briefcase className="h-6 w-6" />
                  <span className="font-bold text-xl tracking-tight">RecruitFlow <span className="text-slate-400 font-normal ml-1">| Careers</span></span>
                </>
              )}
            </div>
            
            {/* Navigation items are now strictly isolated per route */}
            <div className="hidden sm:ml-auto sm:flex sm:space-x-8">
              {!isHR && (
                <div className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-indigo-500 text-slate-900">
                  Open Roles
                </div>
              )}
              {/* HR doesn't need nav links here because it uses a sidebar */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
