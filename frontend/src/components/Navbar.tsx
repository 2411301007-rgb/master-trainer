import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Dashboard', path: '/dashboard', icon: 'person' },
    { name: 'Exercises', path: '/exercises', icon: 'fitness_center' },
  ];

  const secondaryNavItems: NavItem[] = [
    { name: 'Programs', path: '#programs', icon: 'event_note' },
    { name: 'Nutrition', path: '#nutrition', icon: 'restaurant' },
    { name: 'Knowledge', path: '#knowledge', icon: 'menu_book' }
  ];

  return (
    <>
      {/* Desktop Navigation Drawer */}
      <nav className="hidden md:flex flex-col h-full w-80 rounded-r-xl shadow-xl bg-surface-container border-r border-outline-variant fixed inset-y-0 left-0 z-[60] p-md">
        <div className="mb-lg">
          <Link to="/" className="font-display-lg text-display-lg text-primary tracking-tighter text-[28px] font-bold block">
            MASTER TRAINER
          </Link>
        </div>
        
        <ul className="flex flex-col gap-sm flex-grow">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-sm px-md py-sm rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface'
                  }`
                }
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-body-lg text-body-lg">{item.name}</span>
              </NavLink>
            </li>
          ))}

          <hr className="border-outline-variant my-md" />

          {secondaryNavItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant/60 hover:bg-surface-variant/40 hover:text-on-surface transition-all"
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-body-lg text-body-lg">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* User Account / Profile Summary at bottom */}
        <div className="border-t border-outline-variant pt-md flex items-center gap-sm mt-auto">
          <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold border border-primary/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-body-md font-semibold text-on-surface">Elite Athlete</span>
            <span className="font-label-sm text-on-surface-variant text-[10px] uppercase">Level 3</span>
          </div>
        </div>
      </nav>

      {/* Mobile Top App Bar */}
      <header className="md:hidden fixed top-0 left-0 w-full h-16 z-50 flex justify-between items-center px-margin-mobile bg-surface-dim border-b border-outline-variant">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-on-surface-variant hover:bg-surface-bright p-sm rounded-full flex items-center justify-center focus:outline-none"
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
        <Link to="/" className="font-display-lg text-display-lg tracking-tighter text-primary text-[22px] leading-tight font-bold">
          MASTER TRAINER
        </Link>
        <Link to="/dashboard" className="w-8 h-8 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold text-sm">
          A
        </Link>
      </header>

      {/* Mobile Menu Overlay Drawer */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[55] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <nav className="fixed inset-y-0 left-0 w-72 bg-surface-container z-[58] p-md flex flex-col gap-md shadow-2xl border-r border-outline-variant md:hidden animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center h-16 border-b border-outline-variant mb-sm">
              <span className="font-display-lg text-primary tracking-tighter text-[20px] font-bold">
                MASTER TRAINER
              </span>
            </div>

            <ul className="flex flex-col gap-sm flex-grow">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-sm px-md py-sm rounded-lg transition-all ${
                        isActive
                          ? 'bg-primary-container text-on-primary-container font-bold'
                          : 'text-on-surface-variant hover:bg-surface-variant'
                      }`
                    }
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-body-md">{item.name}</span>
                  </NavLink>
                </li>
              ))}

              <hr className="border-outline-variant my-sm" />

              {secondaryNavItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant/60 hover:bg-surface-variant/40 hover:text-on-surface transition-all"
                  >
                    <span className="material-symbols-outlined">{item.icon}</span>
                    <span className="font-body-md">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t border-outline-variant pt-md flex items-center gap-sm mt-auto">
              <div className="w-10 h-10 rounded-full bg-surface-bright flex items-center justify-center text-primary font-bold">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-body-md font-semibold text-on-surface">Elite Athlete</span>
                <span className="font-label-sm text-on-surface-variant text-[10px] uppercase">Level 3</span>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
