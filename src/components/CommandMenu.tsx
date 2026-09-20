'use client';

import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Compass,
  Activity,
  Bot,
  Globe2,
  Zap,
  ShieldCheck,
  Terminal,
  Building2,
  Radio,
  CheckCircle2,
} from 'lucide-react';

interface CommandMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenChaos: () => void;
  onOpenGovernance: () => void;
  onOpenLogs: () => void;
  onNavigate?: (sectionId: string) => void;
}

export function CommandMenu({
  open,
  onOpenChange,
  onOpenChaos,
  onOpenGovernance,
  onOpenLogs,
  onNavigate,
}: CommandMenuProps) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, onOpenChange]);

  const handleNavigate = (id: string) => {
    onOpenChange(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-4 text-[var(--color-text-primary)] rounded-[6px] shadow-lg">
        <DialogHeader className="border-b border-[var(--color-border)] pb-2 mb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <Compass className="h-4 w-4 text-[#533AFD] dark:text-[#7A68FF]" />
              Command Palette (⌘K)
            </DialogTitle>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              ESC to close
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
          {/* Section Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              Jump to Architecture Cockpit
            </h4>
            <div className="space-y-1">
              {[
                { id: 'cockpit', label: 'Slot Telemetry & Latency Metrics', icon: Activity, tag: 'SSE Stream' },
                { id: 'pipeline', label: 'Headless Flow Runner & Consular Probe', icon: Bot, tag: '3-Stage Engine' },
                { id: 'records', label: 'Active Consular Center Monitors & Slot State', icon: Globe2, tag: '5 Jurisdictions' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full flex items-center justify-between p-2 rounded-[4px] hover:bg-[var(--color-panel-subtle)] text-xs text-left transition-colors"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Icon className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
                      {item.label}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Consular Mission Jumps */}
          <div className="border-t border-[var(--color-border)] pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              Consular Jurisdiction Quick-Select
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                { name: 'Los Angeles (USA-LAX)', status: '2 Open Slots', active: true },
                { name: 'Miami (USA-MIA)', status: 'Sub-second probe', active: false },
                { name: 'New York (USA-NYC)', status: 'Sub-second probe', active: false },
                { name: 'San Francisco (USA-SFO)', status: 'Sub-second probe', active: false },
              ].map((center) => (
                <button
                  key={center.name}
                  onClick={() => handleNavigate('records')}
                  className="flex items-center justify-between p-2 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:bg-[var(--color-surface)] text-xs text-left transition-colors"
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <Building2 className="h-3 w-3 text-[#533AFD] dark:text-[#7A68FF] shrink-0" />
                    <span className="truncate">{center.name}</span>
                  </span>
                  <span className={`text-[10px] font-mono shrink-0 ${center.active ? 'text-emerald-600 font-bold' : 'text-[var(--color-text-muted)]'}`}>
                    {center.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Direct Simulator & Audit Actions */}
          <div className="border-t border-[var(--color-border)] pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] font-mono mb-2">
              Bot Diagnostics & Resilience Audits
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenChaos();
                }}
                className="w-full flex items-center gap-2 p-2 rounded-[4px] hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-xs text-left text-amber-700 dark:text-amber-400 transition-colors"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Launch Cloudflare & Rate-Limit Chaos Simulator</span>
              </button>

              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenGovernance();
                }}
                className="w-full flex items-center gap-2 p-2 rounded-[4px] hover:bg-[#533AFD]/10 text-xs text-left text-[#533AFD] dark:text-[#7A68FF] transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Inspect Stealth Browser & Anti-Bot Evasion Architecture</span>
              </button>

              <button
                onClick={() => {
                  onOpenChange(false);
                  onOpenLogs();
                }}
                className="w-full flex items-center gap-2 p-2 rounded-[4px] hover:bg-[var(--color-panel-subtle)] text-xs text-left text-[var(--color-text-primary)] transition-colors"
              >
                <Terminal className="h-3.5 w-3.5" />
                <span>Open Real-Time Headless Scraper Event Logs</span>
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
