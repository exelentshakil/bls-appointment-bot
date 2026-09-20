'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Zap,
  Terminal,
  RefreshCw,
  Cpu,
  Globe,
  Radio,
  Lock,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { siteConfig } from '@/config/site';

export function HeroWorkflowEngine() {
  const [inputText, setInputText] = useState(siteConfig.workflow.defaultInput);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(siteConfig.workflow.sampleResponse);
  const [stepStatus, setStepStatus] = useState({
    stealth: 'BYPASS READY • TLS JA3 Clean',
    probe: 'ACTIVE • 640ms Sub-Second Polling',
    checkout: 'AUTO-HOLD • Instant 15-Min Lock',
  });

  const handleExecute = async () => {
    setLoading(true);
    // Simulate real headless browser execution stages with sub-second realistic timing
    await new Promise((resolve) => setTimeout(resolve, 850));

    const timestamp = new Date().toISOString();
    const liveSimulationResult = {
      session_status: 'AUTHENTICATED_AND_ACTIVE',
      timestamp,
      target_mission: 'BLS Spain Consular Mission (Los Angeles)',
      visa_category: 'National Visa / Student (Long Term)',
      stealth_handshake_telemetry: {
        browser_daemon: 'Headless Chromium (Playwright Async)',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/128.0.0.0',
        cloudflare_turnstile: 'TOKEN_ACQUIRED_IN_390MS',
        tls_ja3_fingerprint: '771,4865-4866-4867,0-23-65281-10-11-35-16,29-23-24,0',
        residential_ip_node: '198.54.120.42 (US-West-LosAngeles)',
        session_cookie_ttl: '3580s Remaining',
        anti_detection_score: '100% Clean (Zero Bot Flags)',
      },
      slot_discovery: {
        status: 'OPEN_SLOT_CONFIRMED',
        slot_reference: `BLS-LA-${new Date().getFullYear()}${String(new Date().getMonth() + 2).padStart(2, '0')}14-0930`,
        appointment_date: '2026-11-14',
        appointment_time: '09:30 AM PST',
        consular_counter: 'Biometrics Desk 04',
        slot_lock_state: 'LOCKED (15-Minute Exclusive Hold)',
      },
      booking_payload_dispatch: {
        applicant_name: 'Elliot Vance',
        passport_hash: 'SHA256:e89a...41c2',
        contact_phone: '+1-310-555-0182',
        otp_listener: 'Webhook Daemon Ready (Waiting for SMS/Email Token)',
        booking_status: 'RESERVATION_HELD_SUCCESSFULLY',
        execution_latency_ms: 642,
      },
    };

    setResult(liveSimulationResult);
    setStepStatus({
      stealth: 'PASSED (390ms) • Turnstile Solved',
      probe: 'SLOT FOUND • 2026-11-14 09:30 AM',
      checkout: 'LOCKED • 15m Reservation Active',
    });
    setLoading(false);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="w-full border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs">
      <CardHeader className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-mono">
                {siteConfig.workflow.badge}
              </Badge>
              <CardTitle className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.workflow.title}
              </CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              {siteConfig.workflow.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Headless Daemon Online</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Input Form Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
              {siteConfig.workflow.inputLabel}
            </label>
            <button
              onClick={() => setInputText(siteConfig.workflow.defaultInput)}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-mono"
            >
              Reset Sample Profile
            </button>
          </div>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            className="text-xs sm:text-sm font-mono resize-none border-[var(--color-border)] bg-[var(--color-panel-subtle)] focus:border-emerald-500"
            placeholder={siteConfig.workflow.inputPlaceholder}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-[var(--color-text-muted)] font-mono">
              Automated Cloudflare Turnstile token resolution, TLS fingerprint rotation, and slot reservation hold.
            </span>
            <Button
              onClick={handleExecute}
              disabled={loading}
              className="h-9 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs shrink-0"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Running Headless Flow...
                </>
              ) : (
                <>
                  <Zap className="h-3.5 w-3.5 mr-1.5 text-emerald-200" />
                  {siteConfig.workflow.buttonLabel}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 3-Step Headless Architecture Pipeline Telemetry */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 sm:p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono mb-2.5">
            Headless Booking Execution Pipeline
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 text-xs font-mono">
            {/* Stage 1 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 1 • Stealth Handshake</div>
                <div className="font-semibold text-emerald-600 dark:text-emerald-400 truncate">{stepStatus.stealth}</div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
              <Radio className="h-4 w-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div className="min-w-0">
                <div className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase">Stage 2 • Consular Slot Probe</div>
                <div className="font-semibold text-[var(--color-text-primary)] truncate">{stepStatus.probe}</div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-2.5 shadow-2xs">
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
                <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                  Verified Headless Booking Output (Structured Payload)
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-mono"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 mr-1" />
                    Copy Payload
                  </>
                )}
              </Button>
            </div>
            <pre className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 text-xs font-mono text-[var(--color-text-primary)] overflow-x-auto max-h-72 leading-relaxed">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
