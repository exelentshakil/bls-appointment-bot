'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  Activity,
  Terminal,
  ShieldCheck,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Search,
  SlidersHorizontal,
  Bot,
  Radio,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { siteConfig } from '@/config/site';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  // Distinct premium icons for each navigation destination
  const getNavIcon = (id: string, className: string = 'h-3.5 w-3.5') => {
    switch (id) {
      case 'cockpit':
        return <Activity className={`${className} text-emerald-500`} />;
      case 'pipeline':
        return <Bot className={`${className} text-teal-500`} />;
      case 'records':
        return <Globe2 className={`${className} text-indigo-500`} />;
      default:
        return <Activity className={`${className} text-emerald-500`} />;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Left Cluster: Brand Anchor + Hairline Divider + Integrated Primary Nav */}
        <div className="flex items-center gap-2.5 sm:gap-3 xl:gap-4 shrink-0 min-w-0">
          {/* Brand Logo Lockup */}
          <button
            onClick={() => onNavigate(siteConfig.primaryNav[0]?.id || 'cockpit')}
            className="group flex items-center gap-2 text-left transition-opacity hover:opacity-90 shrink-0"
            aria-label="Return to top"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 via-teal-600 to-slate-900 text-white shadow-xs font-bold shrink-0 border border-emerald-400/30">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.name}
              </span>
              <span className="hidden sm:inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                {siteConfig.badge}
              </span>
            </div>
          </button>

          {/* Hairline Structural Divider */}
          <div className="hidden lg:block h-4 w-px bg-[var(--color-border)] mx-1 shrink-0" />

          {/* Primary Navigation - Desktop Tabs with Distinct Icons */}
          <nav className="hidden lg:flex items-center gap-1 shrink-0">
            {siteConfig.primaryNav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 h-8 inline-flex items-center gap-1.5 text-[13px] font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] font-semibold shadow-2xs border border-[var(--color-border)]'
                      : 'border border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)]/70'
                  }`}
                >
                  {getNavIcon(item.id, 'h-3.5 w-3.5')}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Cluster: Quick Search + Diagnostics + CTA + Theme */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-2 sm:ml-4 lg:ml-6">
          {/* Quick Search ⌘K Button */}
          <button
            onClick={onOpenCommandMenu}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-panel-subtle)] px-2 sm:px-2.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-slate-400 transition-colors shadow-2xs whitespace-nowrap shrink-0"
            title="Quick Navigation Palette (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0" />
            <span className="hidden sm:inline font-medium whitespace-nowrap">Search</span>
            <kbd className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-1 sm:px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[var(--color-text-muted)] shrink-0">
              ⌘K
            </kbd>
          </button>

          {/* Bot Architecture Diagnostics Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:inline-flex h-8 items-center gap-1.5 text-xs font-medium border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-panel-subtle)] px-2.5 whitespace-nowrap shadow-2xs shrink-0"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--color-text-muted)] shrink-0" />
                <span className="whitespace-nowrap">Bot Architecture</span>
                <ChevronDown className="h-3 w-3 opacity-60 ml-0.5 shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 bg-[var(--color-surface)] border border-[var(--color-border)] p-1.5 shadow-lg">
              <DropdownMenuItem
                onClick={onOpenChaosModal}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Zap className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Anti-Bot & Proxy Resilience</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Test Cloudflare bypass, IP ban recovery & backoff</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onOpenGovernanceDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <ShieldCheck className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Stealth Evasion Blueprint</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Playwright flags, TLS JA3 & OTP persistence</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onOpenLogsDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Terminal className="h-4 w-4 mt-0.5 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-[var(--color-text-primary)]">Consular Polling Event Traces</div>
                  <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Real-time HTTP & headless browser events</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Action CTA: Test Slot Probe */}
          <Button
            size="sm"
            onClick={() => onNavigate('pipeline')}
            className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs whitespace-nowrap shrink-0 px-2.5 sm:px-3"
          >
            <Radio className="h-3.5 w-3.5 mr-1 text-emerald-200 shrink-0" />
            <span className="whitespace-nowrap">Test Probe</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 p-0 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-panel-subtle)] shadow-2xs shrink-0"
            aria-label="Toggle theme"
          >
            <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation with DISTINCT Icons */}
      <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-panel-subtle)] py-1.5 px-3 overflow-x-auto no-scrollbar flex items-center gap-1.5 flex-nowrap">
        {siteConfig.primaryNav.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface)]/80'
              }`}
            >
              {getNavIcon(item.id, isActive ? 'h-3 w-3 text-white' : 'h-3 w-3')}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
