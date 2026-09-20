'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Radio,
  Lock,
  ArrowRight,
  Bot,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';

export function HeroWorkflowEngine() {
  const [inputText, setInputText] = useState(siteConfig.workflow.defaultInput);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [copied, setCopied] = useState(false);

  // 3-Stage Progress Telemetry
  const [stepStatus, setStepStatus] = useState<{
    stealth: string;
    probe: string;
    checkout: string;
  }>({
    stealth: 'Stealth Fingerprint Active (JA3/JA4)',
    probe: 'Awaiting Trigger • usa.blsspainglobal.com',
    checkout: 'Reservation Daemon Armed',
  });

  const handleExecute = async () => {
    setLoading(true);
    setResult(null);

    // Step 1: Stealth Handshake & Cloudflare Bypass
    setStepStatus({
      stealth: 'Solving Cloudflare Turnstile token in headless browser...',
      probe: 'Waiting for session cookie validation...',
      checkout: 'Hold lock on standby',
    });

    await new Promise((r) => setTimeout(r, 650));

    // Step 2: Consular Slot Probe
    setStepStatus({
      stealth: 'Turnstile Solved (392ms) • TLS Fingerprint Match',
      probe: 'Probing BLS Los Angeles slot availability API...',
      checkout: 'Acquiring reservation token',
    });

    await new Promise((r) => setTimeout(r, 600));

    // Step 3: Form-Fill & Hold Lock
    setStepStatus({
      stealth: 'Turnstile Solved (392ms) • TLS Fingerprint Match',
      probe: '2 Slots Detected (2026-11-14 @ 09:30 AM PST)',
      checkout: 'Slot Locked • 15-Minute Reservation Hold Active',
    });

    setResult(siteConfig.workflow.sampleResponse);
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
      <div className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-[4px] bg-[#533AFD]/10 text-[#533AFD] dark:bg-[#7A68FF]/20 dark:text-[#7A68FF] border border-[#533AFD]/20 px-2 py-0.5 text-[11px] font-mono font-semibold">
                {siteConfig.workflow.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.workflow.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              {siteConfig.workflow.description}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-[4px] border border-emerald-200 dark:border-emerald-800 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Headless Daemon Online</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Input Form Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
              {siteConfig.workflow.inputLabel}
            </label>
            <button
              onClick={() => setInputText(siteConfig.workflow.defaultInput)}
              className="text-xs text-[#533AFD] dark:text-[#7A68FF] hover:underline font-mono"
            >
              Reset Sample Profile
            </button>
          </div>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="text-xs sm:text-sm font-mono resize-none border-[var(--color-border)] bg-[var(--color-panel-subtle)] focus:border-[#533AFD] focus:ring-2 focus:ring-[#533AFD]/20 rounded-[4px]"
            placeholder={siteConfig.workflow.inputPlaceholder}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Automated Cloudflare Turnstile token resolution, TLS fingerprint rotation, and slot reservation hold.
            </span>
            <Button
              onClick={handleExecute}
              disabled={loading}
              className="h-9 px-4 text-xs font-semibold bg-[#533AFD] hover:bg-[#432DE0] text-white shadow-xs shrink-0 rounded-[4px]"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Running Headless Flow...
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-1.5 text-white" />
                  {siteConfig.workflow.buttonLabel}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 3-Step Headless Architecture Pipeline Telemetry */}
        <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 sm:p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono mb-2.5">
            Headless Booking Execution Pipeline
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            {/* Stage 1 */}
            <div className="flex items-center gap-2 rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-[#533AFD] dark:text-[#7A68FF] shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 1 • Stealth Handshake</div>
                <div className="font-semibold text-[#533AFD] dark:text-[#7A68FF] truncate">{stepStatus.stealth}</div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-center gap-2 rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <Radio className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 2 • Consular Slot Probe</div>
                <div className="font-semibold text-[var(--color-text-primary)] truncate">{stepStatus.probe}</div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-center gap-2 rounded-[4px] bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 3 • Form-Fill & Hold</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">{stepStatus.checkout}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Structured JSON Output Box */}
        {result && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  Verified Headless Booking Output (Structured Payload)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs font-mono text-[var(--color-text-secondary)] rounded-[4px]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 mr-1 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy JSON
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 overflow-x-auto max-h-80 text-xs font-mono text-[var(--color-text-primary)]">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
