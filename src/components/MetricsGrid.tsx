'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShieldCheck,
  Cpu,
  ArrowUpRight,
  Zap,
  CheckCircle2,
  Lock,
  Radio,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

// Micro sparkline data for Card 1: Slot Detection Latency (ms)
const latencySparkline = [
  { tick: '1', value: 680 },
  { tick: '2', value: 650 },
  { tick: '3', value: 670 },
  { tick: '4', value: 630 },
  { tick: '5', value: 645 },
  { tick: '6', value: 620 },
  { tick: '7', value: 650 },
  { tick: '8', value: 640 },
];

// Micro sparkline data for Card 2: Stealth Bypass Pass-Rate (%)
const stealthSparkline = [
  { tick: '1', clean: 100 },
  { tick: '2', clean: 99.8 },
  { tick: '3', clean: 100 },
  { tick: '4', clean: 100 },
  { tick: '5', clean: 99.7 },
  { tick: '6', clean: 100 },
  { tick: '7', clean: 100 },
  { tick: '8', clean: 99.8 },
];

// Micro sparkline data for Card 3: Booking Flow Execution (seconds)
const executionSparkline = [
  { tick: '1', time: 2.3 },
  { tick: '2', time: 2.1 },
  { tick: '3', time: 2.0 },
  { tick: '4', time: 1.9 },
  { tick: '5', time: 1.85 },
  { tick: '6', time: 1.82 },
  { tick: '7', time: 1.80 },
  { tick: '8', time: 1.78 },
];

// Main Telemetry Stream Data
const mainTelemetryStream = [
  { time: '09:00', probes: 1420, latency: 610, blocked: 0 },
  { time: '10:00', probes: 1810, latency: 630, blocked: 0 },
  { time: '11:00', probes: 2120, latency: 650, blocked: 0 },
  { time: '12:00', probes: 2040, latency: 640, blocked: 0 },
  { time: '13:00', probes: 2390, latency: 620, blocked: 0 },
  { time: '14:00', probes: 2640, latency: 610, blocked: 0 },
  { time: '15:00', probes: 2410, latency: 635, blocked: 0 },
  { time: '16:00', probes: 2750, latency: 625, blocked: 0 },
  { time: '17:00', probes: 2580, latency: 640, blocked: 0 },
];

export function MetricsGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* 3 High-Density KPI Cards WITH DEDICATED SHADCN / RECHARTS CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: Slot Detection Latency */}
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
                Slot Detection Latency
              </span>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                Sub-Second Polling Engine
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px] font-mono shrink-0"
            >
              <Radio className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              Real-Time SSE
            </Badge>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                640ms
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                <ArrowUpRight className="h-3 w-3 mr-0.5" />
                Sub-Second
              </span>
            </div>

            {/* Embedded Micro AreaChart Sparkline */}
            <div className="h-12 w-full pt-1">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={latencySparkline} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
                    <defs>
                      <linearGradient id="card1Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] font-mono shadow-xs">
                              {payload[0].value}ms
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={1.5}
                      fill="url(#card1Grad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] font-mono border-t border-[var(--color-border)]/60 pt-2 flex items-center justify-between">
              <span>P99 Polling Interval: 1.2s</span>
              <span className="text-emerald-600 font-medium">0 Drop</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Stealth Bypass Rate */}
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
                Stealth Bypass Rate
              </span>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                TLS JA3/JA4 Fingerprint Evasion
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px] font-mono shrink-0"
            >
              <ShieldCheck className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />
              Playwright Stealth
            </Badge>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                99.8% Clean
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="h-3 w-3 mr-0.5" />
                Zero Bans
              </span>
            </div>

            {/* Embedded Micro BarChart Histogram */}
            <div className="h-12 w-full pt-1">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stealthSparkline} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] font-mono shadow-xs">
                              {payload[0].value}% clean
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="clean" fill="#10b981" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] font-mono border-t border-[var(--color-border)]/60 pt-2 flex items-center justify-between">
              <span>Zero Cloudflare Bans</span>
              <span className="text-emerald-600 font-medium">Turnstile Solved</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Booking Flow Execution */}
        <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between overflow-hidden">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
            <div className="space-y-0.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono">
                Booking Flow Execution
              </span>
              <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                Automated Checkout Daemon
              </div>
            </div>
            <Badge
              variant="outline"
              className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[10px] font-mono shrink-0"
            >
              <Zap className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400" />
              Headless Daemon
            </Badge>
          </CardHeader>
          <CardContent className="p-4 pt-1 space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                1.8s Avg
              </span>
              <span className="inline-flex items-center text-xs font-semibold text-teal-600 dark:text-teal-400 font-mono">
                <Clock className="h-3 w-3 mr-0.5" />
                Auto-Hold
              </span>
            </div>

            {/* Embedded Micro AreaChart Sparkline */}
            <div className="h-12 w-full pt-1">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={executionSparkline} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
                    <defs>
                      <linearGradient id="card3Grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0d9488" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#0d9488" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded bg-[var(--color-surface)] border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] font-mono shadow-xs">
                              {payload[0].value}s flow
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="time"
                      stroke="#0d9488"
                      strokeWidth={1.5}
                      fill="url(#card3Grad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <p className="text-[11px] text-[var(--color-text-muted)] font-mono border-t border-[var(--color-border)]/60 pt-2 flex items-center justify-between">
              <span>Auto Form-Fill & OTP Hook</span>
              <span className="text-teal-600 font-medium">15m Slot Hold</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Full-Width Telemetry & Latency Chart */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                Consular Slot Probing Telemetry & Latency Distribution
              </span>
              <Badge className="bg-emerald-600 text-white text-[10px] font-mono">
                Live SSE Stream
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Continuous sub-second polling across US mission jurisdictions with automated residential IP rotation
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Probes / hr
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-500"></span>
              Avg Probe Latency (640ms)
            </span>
          </div>
        </div>

        <div className="h-44 sm:h-52 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mainTelemetryStream} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProbes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2.5 shadow-md text-xs font-mono space-y-1">
                          <p className="font-bold text-[var(--color-text-primary)]">{payload[0].payload.time}</p>
                          <p className="text-emerald-600 dark:text-emerald-400 flex items-center justify-between gap-3">
                            <span>Probe Volume:</span>
                            <span className="font-bold">{payload[0].value?.toLocaleString()} checks</span>
                          </p>
                          <p className="text-teal-600 dark:text-teal-400 flex items-center justify-between gap-3">
                            <span>Latency:</span>
                            <span className="font-bold">{payload[0].payload.latency}ms</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="probes"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorProbes)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
