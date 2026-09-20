'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Terminal,
  Activity,
  Trash2,
  ShieldCheck,
  Radio,
  Lock,
  Bot,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogEntry {
  id: string;
  timestamp: string;
  stage: 'Stealth Handshake' | 'Consular Probe' | 'Slot Detection' | 'Reservation Hold';
  status: '200 OK' | 'Bypassed' | 'Holding' | 'Rotating';
  details: string;
  durationMs: number;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log_01',
    timestamp: '16:14:22.418',
    stage: 'Reservation Hold',
    status: 'Holding',
    details: 'Successfully locked appointment slot at Los Angeles (USA-LAX) for 2026-04-12 10:15 PST. 15-minute checkout lock active.',
    durationMs: 420,
  },
  {
    id: 'log_02',
    timestamp: '16:14:21.998',
    stage: 'Slot Detection',
    status: '200 OK',
    details: 'Consular probe detected 2 open appointment windows at Los Angeles (National Visa Category D). Dispatching form-fill daemon.',
    durationMs: 640,
  },
  {
    id: 'log_03',
    timestamp: '16:14:21.358',
    stage: 'Stealth Handshake',
    status: 'Bypassed',
    details: 'Cloudflare Turnstile token solved via headless Playwright in 392ms. TLS JA3 fingerprint matches Chrome 128 MacOS.',
    durationMs: 392,
  },
  {
    id: 'log_04',
    timestamp: '16:14:20.966',
    stage: 'Consular Probe',
    status: '200 OK',
    details: 'Polled usa.blsspainglobal.com/Global/account/getslots with sticky residential proxy (US-West-LA-04). HTTP 200.',
    durationMs: 610,
  },
  {
    id: 'log_05',
    timestamp: '16:14:18.420',
    stage: 'Consular Probe',
    status: '200 OK',
    details: 'Polled Miami Mission (USA-MIA) slot telemetry. 0 open slots returned. Backing off 850ms.',
    durationMs: 630,
  },
  {
    id: 'log_06',
    timestamp: '16:14:15.112',
    stage: 'Stealth Handshake',
    status: 'Rotating',
    details: 'Rotated residential proxy IP from US-East-NYC-01 to US-West-LA-02 after 100 consecutive requests. Zero Cloudflare bans.',
    durationMs: 15,
  },
];

interface ExecutionLogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecutionLogDrawer({ open, onOpenChange }: ExecutionLogDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>('All');

  const filteredLogs = logs.filter((l) => filter === 'All' || l.stage === filter);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 text-[var(--color-text-primary)]">
        <SheetHeader className="border-b border-[var(--color-border)] pb-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Terminal className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                Live Scraper Traces
              </span>
              <span className="text-xs text-emerald-600 font-mono font-bold">
                ● Polling Active
              </span>
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setLogs([])}
              className="h-7 text-xs text-[var(--color-text-muted)] hover:text-red-600 px-2"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              <span>Clear</span>
            </Button>
          </div>
          <SheetTitle className="text-lg font-bold">
            Real-Time Headless Scraper Event Log
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
            End-to-end telemetry traces capturing Turnstile bypass, sub-second consular probing, residential IP rotation, and 15-minute appointment hold locks.
          </SheetDescription>
        </SheetHeader>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-mono overflow-x-auto pb-1">
          {['All', 'Stealth Handshake', 'Consular Probe', 'Slot Detection', 'Reservation Hold'].map((stage) => (
            <button
              key={stage}
              onClick={() => setFilter(stage)}
              className={`px-2.5 py-1 rounded-md transition-all whitespace-nowrap ${
                filter === stage
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)]'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>

        {/* Log Entries List */}
        <div className="space-y-2.5 font-mono text-xs">
          {filteredLogs.length === 0 ? (
            <p className="text-[var(--color-text-muted)] italic text-center py-8">
              No log entries match the selected filter.
            </p>
          ) : (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[var(--color-text-primary)]">
                      [{log.stage}]
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded text-xs font-semibold ${
                        log.status === 'Holding' || log.status === '200 OK'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : log.status === 'Bypassed'
                          ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[var(--color-text-muted)] text-xs">
                    <span>{log.durationMs}ms</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {log.details}
                </p>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
