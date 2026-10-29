import React, { useState, useEffect, useRef } from 'react';
import { MSMEProfile, LanguageCode } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { 
  Building,
  ChevronDown,
  Globe, 
  Bell, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Layers, 
  ArrowRight, 
  PlusCircle,
  Check,
  LogOut,
  User as UserIcon,
  Menu
} from 'lucide-react';

interface HeaderProps {
  currentProfile: MSMEProfile;
  profiles: MSMEProfile[];
  onSelectProfile: (profile: MSMEProfile) => void;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
  isAppMode: boolean;
  onToggleAppMode: (isApp: boolean) => void;
  onOpenCreditPassport: () => void;
  onStartOnboarding: () => void;
  isAuthenticated?: boolean;
  userEmail?: string | null;
  userName?: string | null;
  onLogout?: () => void;
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
  isAdmin?: boolean;
  onOpenAdminPortal?: () => void;
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProfile,
  profiles,
  onSelectProfile,
  currentLanguage: _legacyLang,
  onSelectLanguage,
  isAppMode,
  onToggleAppMode,
  onOpenCreditPassport,
  onStartOnboarding,
  isAuthenticated = false,
  userEmail,
  userName,
  onLogout,
  onOpenLogin,
  onOpenRegister,
  isAdmin = false,
  onOpenAdminPortal,
  isMobileMenuOpen = false,
  onToggleMobileMenu,
}) => {
  const { language, setLanguage, t } = useLanguage();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
        setLangDropdownOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen((prev) => !prev);
    setLangDropdownOpen(false);
    setNotifOpen(false);
  };

  const toggleLangDropdown = () => {
    setLangDropdownOpen((prev) => !prev);
    setProfileDropdownOpen(false);
    setNotifOpen(false);
  };

  const toggleNotifDropdown = () => {
    setNotifOpen((prev) => !prev);
    setProfileDropdownOpen(false);
    setLangDropdownOpen(false);
  };

  const supportedLanguages = [
    { code: 'en' as const, label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'ta' as const, label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  ];

  const handleLanguageSelect = (code: 'en' | 'ta') => {
    setLanguage(code);
    onSelectLanguage(code);
    setLangDropdownOpen(false);
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full border-b border-[#222936] bg-[#0B0E14]/90 backdrop-blur-xl shadow-lg shadow-black/20">
      <div className="w-full max-w-[1920px] mx-auto px-2.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Brand Logo, Switcher & Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0">
          {/* Mobile Hamburger Button */}
          {isAppMode && onToggleMobileMenu && (
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-xl bg-[#121722] hover:bg-[#161C27] border border-[#222936] text-[#A7B0C0] hover:text-[#F8FAFC] transition-all shrink-0 focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]/50"
              aria-label="Toggle navigation drawer"
              title="Open Navigation"
            >
              <Menu className="w-4.5 h-4.5 text-[#8B5CF6]" />
            </button>
          )}

          <div 
            onClick={() => onToggleAppMode(false)}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 select-none"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#7C3AED] inline-flex items-center justify-center text-white font-black shadow-md shadow-[#8B5CF6]/25 group-hover:scale-105 transition-all shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-[#F8FAFC] flex items-center gap-1 sm:gap-1.5 leading-none">
                <span>BizPilot</span> <span className="text-[#8B5CF6] font-black">AI</span>
                <span className="text-[9px] uppercase font-semibold px-1.5 py-0.5 rounded bg-[#8B5CF6]/15 text-[#A78BFA] border border-[#8B5CF6]/30 leading-tight">
                  MSME
                </span>
              </div>
              <p className="text-[10px] text-[#707A8C] hidden 2xl:block font-medium mt-1 leading-tight truncate max-w-[180px]">
                {language === 'ta' ? 'நிதி & வளர்ச்சி நுண்ணறிவு' : 'Funding & Growth Intelligence'}
              </p>
            </div>
          </div>

          {/* Navigation Mode Pill */}
          <div className="hidden md:inline-flex items-center h-9 p-1 bg-[#0D1118] rounded-xl border border-[#222936] text-xs shrink-0 select-none">
            <button
              onClick={() => onToggleAppMode(false)}
              className={`h-7 px-2.5 sm:px-3 inline-flex items-center justify-center rounded-lg font-medium transition-all shrink-0 whitespace-nowrap ${
                !isAppMode 
                  ? 'bg-[#8B5CF6] text-white shadow-sm font-semibold' 
                  : 'text-[#707A8C] hover:text-[#F8FAFC]'
              }`}
            >
              {t('nav.productTour', 'Product Tour')}
            </button>
            <button
              onClick={() => onToggleAppMode(true)}
              className={`h-7 px-2.5 sm:px-3 inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all shrink-0 whitespace-nowrap ${
                isAppMode 
                  ? 'bg-[#8B5CF6] text-white shadow-sm font-semibold' 
                  : 'text-[#707A8C] hover:text-[#F8FAFC]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{t('nav.liveWorkspace', 'Live Workspace')}</span>
            </button>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
          
          {/* Active MSME Profile or Authenticated Identity */}
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 min-w-0">
              {isAdmin && onOpenAdminPortal && (
                <button
                  onClick={onOpenAdminPortal}
                  className="h-9 w-9 sm:w-auto sm:px-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 text-[#A78BFA] border border-[#8B5CF6]/30 text-xs font-bold transition-all shadow-sm shrink-0"
                  title={t('admin.adminPortal', 'Admin Portal')}
                >
                  <ShieldCheck className="w-4 h-4 text-[#8B5CF6] shrink-0" />
                  <span className="hidden xl:inline">{t('admin.adminPortal', 'Admin Portal')}</span>
                </button>
              )}

              {/* Active MSME Profile Selector for authenticated user with multiple MSMEs */}
              <div className="relative shrink-0 min-w-0">
                <button
                  onClick={() => {
                    if (profiles.length > 1) {
                      toggleProfileDropdown();
                    }
                  }}
                  className={`h-9 px-2.5 lg:px-3 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl bg-[#121722] border border-[#222936] text-xs text-[#A7B0C0] shadow-sm transition-all min-w-0 max-w-[160px] sm:max-w-[190px] xl:max-w-[240px] shrink ${
                    profiles.length > 1 ? 'hover:bg-[#171D29] hover:border-[#303848] text-[#F8FAFC] cursor-pointer' : 'cursor-default'
                  }`}
                  title={profiles.length > 1 ? t('header.switchStartup', 'Switch MSME Business') : currentProfile.name}
                >
                  <Building className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
                  <div className="text-left hidden lg:block leading-tight min-w-0 flex-1">
                    <div className="font-semibold text-[#F8FAFC] truncate max-w-[95px] sm:max-w-[115px] xl:max-w-[150px]">
                      {currentProfile.name}
                    </div>
                    <div className="text-[10px] text-[#707A8C] flex items-center gap-1 min-w-0">
                      <span className="text-[#A78BFA] font-medium truncate max-w-[55px] xl:max-w-[80px]">{currentProfile.sector || 'MSME'}</span>
                      {profiles.length > 1 && (
                        <span className="text-[9px] px-1 py-0.2 bg-[#8B5CF6]/15 text-[#A78BFA] rounded font-semibold border border-[#8B5CF6]/30 shrink-0">
                          {profiles.length}
                        </span>
                      )}
                    </div>
                  </div>
                  {profiles.length > 1 && (
                    <ChevronDown className={`w-3.5 h-3.5 text-[#707A8C] shrink-0 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {profiles.length > 1 && profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-24px)] bg-[#121722] border border-[#303848] rounded-2xl shadow-2xl p-2 z-50">
                    <div className="flex items-center justify-between px-2.5 py-1 mb-1 border-b border-[#222936]">
                      <span className="text-[10px] font-semibold text-[#707A8C] uppercase tracking-wider">
                        {t('header.myStartups', 'My MSME Businesses')}
                      </span>
                      <span className="text-[10px] font-bold text-[#A78BFA]">
                        {profiles.length} Active
                      </span>
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {profiles.map((p) => {
                        const isSelected = p.id === currentProfile.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              onSelectProfile(p);
                              setProfileDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start justify-between ${
                              isSelected 
                                ? 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/40 text-[#F8FAFC] font-medium' 
                                : 'hover:bg-[#171D29] text-[#A7B0C0]'
                            }`}
                          >
                            <div className="min-w-0 pr-2">
                              <div className="font-bold text-[#F8FAFC] truncate">{p.name}</div>
                              <div className="text-[11px] text-[#707A8C] truncate">{p.sector} • {p.location}</div>
                              <div className="text-[10px] text-[#A78BFA] mt-0.5 font-medium">
                                {p.turnover} | Health: {p.healthScore}/100
                              </div>
                            </div>
                            {isSelected && (
                              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0"></span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 pt-2 border-t border-[#222936]">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onStartOnboarding();
                        }}
                        className="w-full flex items-center justify-center gap-1.5 p-2 rounded-xl bg-[#8B5CF6]/15 hover:bg-[#8B5CF6]/25 text-[#A78BFA] border border-[#8B5CF6]/30 text-xs font-semibold transition-all"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>{t('header.registerAnother', 'Register Another MSME')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Account / Logout */}
              <button
                onClick={onLogout}
                className="h-9 w-9 xl:w-auto xl:px-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#121722] hover:bg-rose-950/40 hover:text-rose-400 hover:border-rose-500/30 border border-[#222936] text-xs font-semibold text-[#A7B0C0] shadow-sm transition-all shrink-0"
                title={t('auth.logout', 'Log Out')}
              >
                <LogOut className="w-3.5 h-3.5 text-[#707A8C] shrink-0" />
                <span className="hidden xl:inline">{t('auth.logout', 'Log Out')}</span>
              </button>
            </div>
          ) : null}

          {/* Language Selector Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={toggleLangDropdown}
              className="h-9 px-2 sm:px-2.5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#121722] hover:bg-[#171D29] border border-[#222936] text-xs text-[#A7B0C0] hover:text-[#F8FAFC] shadow-sm transition-all font-medium shrink-0"
              title={t('header.changeLanguage', 'Change Language')}
            >
              <Globe className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
              <span className="hidden xl:inline font-semibold">
                {language === 'ta' ? 'தமிழ்' : 'English'}
              </span>
              <span className="xl:hidden font-semibold text-[11px]">
                {language === 'ta' ? 'தமிழ்' : 'EN'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#707A8C] shrink-0" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-24px)] bg-[#121722] border border-[#303848] rounded-2xl shadow-2xl p-1.5 z-50">
                <div className="px-2.5 py-1 text-[10px] uppercase font-bold text-[#707A8C] tracking-wider">
                  {t('header.changeLanguage', 'Select Language')}
                </div>
                {supportedLanguages.map((item) => {
                  const isSelected = language === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleLanguageSelect(item.code)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                        isSelected 
                          ? 'bg-[#8B5CF6]/15 text-[#A78BFA] font-semibold border border-[#8B5CF6]/40' 
                          : 'text-[#A7B0C0] hover:bg-[#171D29] hover:text-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.native}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-[#A78BFA]' : 'text-[#707A8C]'}`}>
                          ({item.label})
                        </span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Toggle */}
          <div className="relative shrink-0">
            <button
              onClick={toggleNotifDropdown}
              className="h-9 w-9 inline-flex items-center justify-center relative rounded-xl bg-[#121722] hover:bg-[#171D29] border border-[#222936] text-[#A7B0C0] hover:text-[#F8FAFC] shadow-sm transition-all shrink-0"
              title="Alerts & AI Insights"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#14B8A6] ring-2 ring-[#121722]"></span>
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-24px)] bg-[#121722] border border-[#303848] rounded-2xl shadow-2xl p-3 z-50 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-[#222936]">
                  <span className="text-xs font-bold text-[#F8FAFC]">
                    {language === 'ta' ? 'AI நுண்ணறிவு எச்சரிக்கைகள்' : 'AI Intelligence Alerts'}
                  </span>
                  <span className="text-[10px] text-[#14B8A6] font-semibold bg-[#14B8A6]/10 px-2 py-0.5 rounded-full border border-[#14B8A6]/20">2 New</span>
                </div>
                <div className="p-2.5 bg-amber-950/30 border border-amber-500/30 rounded-xl text-xs text-amber-200">
                  <div className="font-semibold text-amber-300">
                    {language === 'ta' ? 'பணப்புழக்க எச்சரிக்கை' : 'Cash Flow Runway Alert'}
                  </div>
                  <div className="text-amber-200/80 mt-0.5">
                    {language === 'ta' ? 'அடுத்த 45 நாட்களில் ₹3.2 இலட்சம் பணப் பற்றாக்குறை ஏற்பட வாய்ப்பு.' : 'Supplier payouts in 45 days may trigger ₹3.2L liquid buffer dip.'}
                  </div>
                </div>
                <div className="p-2.5 bg-violet-950/30 border border-violet-500/30 rounded-xl text-xs text-violet-200">
                  <div className="font-semibold text-violet-300">
                    {language === 'ta' ? 'CGTMSE கடன் பொருத்தம் கண்டறியப்பட்டது' : 'CGTMSE Loan Match Found'}
                  </div>
                  <div className="text-violet-200/80 mt-0.5">
                    {language === 'ta' ? 'PSB59 வழியாக ₹85 இலட்சம் வரை பிணையில்லா கடனுக்கு தகுதி உள்ளது.' : 'Eligible for ₹85 Lakhs collateral-free scheme via PSB59.'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Start MSME Onboarding CTA */}
          {isAuthenticated && (
            <button
              onClick={onStartOnboarding}
              className="hidden 2xl:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-[#121722] hover:bg-[#171D29] border border-[#222936] hover:border-[#303848] text-[#F8FAFC] text-xs font-semibold shadow-sm transition-all shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#8B5CF6] shrink-0" />
              <span>{t('header.startOnboarding', 'Set Up My Business')}</span>
            </button>
          )}

          {/* MSME Credit Passport Action CTA */}
          <button
            onClick={onOpenCreditPassport}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-2.5 xl:px-3.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-bold shadow-md shadow-[#8B5CF6]/25 transition-all hover:-translate-y-0.5 shrink-0"
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden md:inline">{t('header.openPassport', 'Credit Passport')}</span>
          </button>

          {/* Unauthenticated Auth Buttons */}
          {!isAuthenticated && (
            <div className="inline-flex items-center gap-1.5 shrink-0">
              <button
                onClick={onOpenLogin}
                className="h-9 px-2.5 sm:px-3.5 inline-flex items-center justify-center rounded-xl bg-[#121722] hover:bg-[#171D29] border border-[#222936] text-xs font-semibold text-[#F8FAFC] shadow-sm transition-all hover:border-[#303848] shrink-0"
              >
                {t('auth.signIn', 'Sign In')}
              </button>
              <button
                onClick={onOpenRegister}
                className="h-9 px-2.5 sm:px-3.5 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-bold shadow-md shadow-[#8B5CF6]/25 transition-all shrink-0"
              >
                <span className="hidden sm:inline">{t('auth.registerMsme', 'Register MSME')}</span>
                <span className="sm:hidden">{t('auth.register', 'Register')}</span>
              </button>
            </div>
          )}

          {!isAppMode ? (
            <button
              onClick={() => onToggleAppMode(true)}
              className="h-9 px-3 sm:px-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#14B8A6] hover:opacity-95 text-white text-xs font-bold shadow-md shadow-[#8B5CF6]/20 transition-all hover:-translate-y-0.5 shrink-0"
            >
              <span className="hidden sm:inline">{language === 'ta' ? 'பணியிடத்தை தொடங்கு' : 'Launch App'}</span>
              <span className="sm:hidden">{language === 'ta' ? 'பணியிடம்' : 'App'}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          ) : (
            <button
              onClick={() => onToggleAppMode(false)}
              className="h-9 px-2.5 sm:px-3 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#121722] hover:bg-[#171D29] border border-[#222936] text-[#A7B0C0] hover:text-[#F8FAFC] text-xs font-medium shadow-sm transition-all shrink-0"
            >
              <span className="hidden sm:inline">{t('nav.productTour', 'Home Tour')}</span>
              <span className="sm:hidden">{language === 'ta' ? 'முகப்பு' : 'Home'}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
