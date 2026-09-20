'use client';

import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { siteConfig } from '@/config/site';

const telemetryStream = [
  { time: '09:00', ops: 3820, latency: 14.1 },
  { time: '10:00', ops: 4210, latency: 13.8 },
  { time: '11:00', ops: 5120, latency: 14.6 },
  { time: '12:00', ops: 5040, latency: 14.2 },
  { time: '13:00', ops: 5690, latency: 13.9 },
  { time: '14:00', ops: 6240, latency: 13.5 },
  { time: '15:00', ops: 5910, latency: 13.8 },
  { time: '16:00', ops: 6450, latency: 13.2 },
  { time: '17:00', ops: 6180, latency: 13.6 },
];

export function MetricsGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icons = [Activity, ShieldCheck, Cpu];

  return (
    <div className="w-full space-y-4">
      {/* 3 High-Density KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {siteConfig.metrics.map((metric, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <Card
              key={metric.id}
              className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs flex flex-col justify-between"
            >
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                  {metric.title}
                </span>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 text-[11px] font-mono"
                >
                  <Icon className="h-3 w-3 mr-1 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  {metric.badge}
                </Badge>
              </CardHeader>
              <CardContent className="p-4 pt-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
                    {metric.value}
                  </span>
                  <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                    <ArrowUpRight className="h-3 w-3 mr-0.5 shrink-0" />
                    {metric.change}
                  </span>
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono border-t border-[var(--color-border)]/60 pt-2">
                  {metric.subtext}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Streamlined Ingestion & Latency Telemetry Chart */}
      <Card className="border-[var(--color-border)] bg-[var(--color-surface)] shadow-xs p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-[var(--color-text-primary)]">
                Telemetry & Throughput Engine
              </span>
              <Badge className="bg-emerald-600 text-white text-[10px] font-mono">
                Live Stream
              </Badge>
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
              Sub-50ms pipeline processing with automated zero-drop backpressure
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              Ops / hr
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-500"></span>
              P99 Latency (13.5ms)
            </span>
          </div>
        </div>

        <div className="h-44 w-full">
          {mounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryStream} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOps" x1="0" y1="0" x2="0" y2="1">
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
                        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2 shadow-md text-xs font-mono">
                          <p className="font-bold text-[var(--color-text-primary)]">{payload[0].payload.time}</p>
                          <p className="text-emerald-600 dark:text-emerald-400">
                            Volume: {payload[0].value?.toLocaleString()} ops
                          </p>
                          <p className="text-teal-600 dark:text-teal-400">
                            P99: {payload[0].payload.latency}ms
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ops"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorOps)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
