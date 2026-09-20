'use client';

import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Cpu,
  CheckCircle2,
  Terminal,
  Globe,
  Radio,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AiGovernanceDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AiGovernanceDrawer({ open, onOpenChange }: AiGovernanceDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 text-[var(--color-text-primary)]">
        <SheetHeader className="border-b border-[var(--color-border)] pb-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              Playwright Stealth & Evasion
            </span>
            <Badge variant="outline" className="text-xs font-mono">
              Headless Core
            </Badge>
          </div>
          <SheetTitle className="text-lg font-bold">
            Headless Bot Architecture & Anti-Detection Blueprint
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
            Production-grade automation engineered for zero-ban interaction with the BLS Spain Global booking portal.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 text-xs font-sans">
          {/* Pillar 1 */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>1. Stealth Browser Fingerprint Evasion</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Standard Selenium/Playwright instances leak automation flags. We strip <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-[var(--color-border)]">navigator.webdriver</code>, inject realistic WebGL vendor/renderer hashes, and spoof MacOS Chrome 128 TLS JA3 signatures.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Zero Cloudflare Bot Challenge Intercepts</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Globe className="h-4 w-4 text-teal-600" />
              <span>2. Residential Proxy & IP Rotation</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              High-frequency polling triggers IP rate limits. The daemon routes requests through a sticky residential proxy pool matching the consular jurisdiction (e.g. Los Angeles IP for LA mission, Miami IP for Florida).
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-teal-600 dark:text-teal-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Sticky Session Cookies with 60-min TTL</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Radio className="h-4 w-4 text-indigo-600" />
              <span>3. Sub-Second Slot Sniping & Hold</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              When BLS drops appointment batches, slots vanish in under 30 seconds. The poller detects open calendar slots in under 800ms and immediately dispatches the applicant reservation hold.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>15-Minute Reservation Lock Triggered</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[var(--color-text-primary)]">
              <Terminal className="h-4 w-4 text-slate-700 dark:text-slate-300" />
              <span>4. Standalone Executable Packaging</span>
            </div>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              Packaged via PyInstaller into a standalone executable (Windows <code className="font-mono bg-white dark:bg-slate-800 px-1 py-0.5 rounded border border-[var(--color-border)]">.exe</code> or MacOS binary) requiring zero Python installation on the client machine.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Single-File Double-Click Execution</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
