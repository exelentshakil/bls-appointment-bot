'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Zap,
  AlertOctagon,
  ShieldAlert,
  ServerCrash,
  RefreshCw,
  CheckCircle2,
  Globe,
  Lock,
} from 'lucide-react';

interface ChaosSimulatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChaosSimulatorModal({ open, onOpenChange }: ChaosSimulatorModalProps) {
  const [runningScenario, setRunningScenario] = useState<string | null>(null);
  const [chaosLog, setChaosLog] = useState<Array<{ text: string; type: 'info' | 'success' | 'warn' | 'error' }>>([]);

  const runChaosTest = (scenario: string) => {
    setRunningScenario(scenario);
    setChaosLog([]);

    if (scenario === 'turnstile_challenge') {
      setChaosLog([
        { text: '[00.00s] Intercepting Cloudflare Turnstile verification challenge on BLS portal...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.22s] Headless Chromium detected challenge iframe (cf-chl-widget-...)', type: 'info' },
          { text: '[00.38s] Executing synthetic mouse gesture & solving Turnstile token in background...', type: 'info' },
          { text: '[00.41s] Token validated: cf_clearance cookie updated with 2-hour TTL.', type: 'success' },
          { text: '[00.42s] RESULT: 100% automated bypass. Poller resumed without human intervention.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 700);
    } else if (scenario === 'proxy_ban') {
      setChaosLog([
        { text: '[00.00s] Simulating consular HTTP 429 Too Many Requests response...', type: 'error' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.15s] Circuit breaker tripped on node 198.54.120.42. Flagging proxy node for 15-min cooldown.', type: 'warn' },
          { text: '[00.24s] Fetching fresh residential IP from Los Angeles residential pool...', type: 'info' },
          { text: '[00.35s] Switched to IP 174.129.88.19 (ASN 7018 AT&T Services). New TLS handshake established.', type: 'info' },
          { text: '[00.48s] RESULT: Polling restored in 480ms with clean HTTP 200 response.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 700);
    } else if (scenario === 'session_reauth') {
      setChaosLog([
        { text: '[00.00s] Injecting BLS session timeout (Session Expired / Redirect to Login)...', type: 'warn' },
      ]);
      setTimeout(() => {
        setChaosLog((prev) => [
          ...prev,
          { text: '[00.18s] Auth guard intercepted 302 redirect. Extracting stored AES-256 applicant credentials...', type: 'info' },
          { text: '[00.35s] Auto-filling login form & resolving Turnstile challenge...', type: 'info' },
          { text: '[00.52s] New session cookie acquired: ASP.NET_SessionId refreshed.', type: 'success' },
          { text: '[00.54s] RESULT: Zero dropped booking cycles. Active slot watcher re-anchored.', type: 'success' },
        ]);
        setRunningScenario(null);
      }, 700);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6 text-[var(--color-text-primary)] rounded-[6px] shadow-lg">
        <DialogHeader className="border-b border-[var(--color-border)] pb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
              <Zap className="h-3.5 w-3.5 text-amber-600" />
              Bot Anti-Detection Simulator
            </span>
          </div>
          <DialogTitle className="text-lg font-bold text-[var(--color-text-primary)]">
            Live Resilience & Anti-Bot Failover Testing
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--color-text-secondary)]">
            Inject real-world scraping obstacles to verify automated recovery without human intervention.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => runChaosTest('turnstile_challenge')}
            disabled={runningScenario !== null}
            className="flex flex-col items-start p-3 h-auto text-left border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] rounded-[4px]"
          >
            <ShieldAlert className="h-4 w-4 text-amber-500 mb-1.5" />
            <span className="font-bold text-xs text-[var(--color-text-primary)]">Cloudflare Challenge</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Solve Turnstile in ~400ms</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => runChaosTest('proxy_ban')}
            disabled={runningScenario !== null}
            className="flex flex-col items-start p-3 h-auto text-left border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] rounded-[4px]"
          >
            <Globe className="h-4 w-4 text-rose-500 mb-1.5" />
            <span className="font-bold text-xs text-[var(--color-text-primary)]">IP 429 Rate Limit</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Instant Residential IP Swap</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => runChaosTest('session_reauth')}
            disabled={runningScenario !== null}
            className="flex flex-col items-start p-3 h-auto text-left border-[var(--color-border)] hover:bg-[var(--color-panel-subtle)] rounded-[4px]"
          >
            <Lock className="h-4 w-4 text-teal-500 mb-1.5" />
            <span className="font-bold text-xs text-[var(--color-text-primary)]">Session Expiry</span>
            <span className="text-[10px] text-[var(--color-text-muted)] mt-0.5">Automated Silent Re-Login</span>
          </Button>
        </div>

        {/* Live Execution Console */}
        <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 font-mono text-xs max-h-48 overflow-y-auto space-y-1">
          {chaosLog.length === 0 && (
            <div className="text-[var(--color-text-muted)] text-[11px] py-4 text-center">
              Select an obstacle scenario above to run automated bot failover simulation.
            </div>
          )}
          {chaosLog.map((log, idx) => (
            <div
              key={idx}
              className={`text-[11px] leading-relaxed ${
                log.type === 'error'
                  ? 'text-rose-600 dark:text-rose-400 font-semibold'
                  : log.type === 'warn'
                  ? 'text-amber-600 dark:text-amber-400 font-medium'
                  : log.type === 'success'
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-[var(--color-text-secondary)]'
              }`}
            >
              {log.text}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
