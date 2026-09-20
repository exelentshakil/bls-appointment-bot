'use client';

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Terminal, Copy, Check, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { siteConfig, type TableRow as RowType } from '@/config/site';

export function DataTableSection() {
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null);
  const [copied, setCopied] = useState(false);

  const getStatusBadge = (status: RowType['status']) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center rounded-[4px] bg-emerald-50 dark:bg-emerald-950/40 text-[#057A55] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[11px] font-mono font-semibold">
            Verified Open
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center rounded-[4px] bg-[#533AFD]/10 dark:bg-[#7A68FF]/20 text-[#533AFD] dark:text-[#7A68FF] border border-[#533AFD]/20 dark:border-[#7A68FF]/30 px-2 py-0.5 text-[11px] font-mono font-semibold">
            Sub-Sec Probe
          </span>
        );
      case 'queued':
        return (
          <span className="inline-flex items-center rounded-[4px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 text-[11px] font-mono font-semibold">
            Queued
          </span>
        );
      case 'flagged':
        return (
          <span className="inline-flex items-center rounded-[4px] bg-[#FFE0EF] dark:bg-[#FFE0EF]/15 text-[#84194D] dark:text-[#FFC7E2] border border-[#FFC7E2] dark:border-[#FFC7E2]/30 px-2 py-0.5 text-[11px] font-mono font-semibold">
            Intercepted
          </span>
        );
    }
  };

  const handleCopy = (data: Record<string, unknown>) => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xs">
      <div className="p-4 sm:p-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-[4px] bg-[#533AFD]/10 text-[#533AFD] dark:bg-[#7A68FF]/20 dark:text-[#7A68FF] border border-[#533AFD]/20 px-2 py-0.5 text-[11px] font-mono font-semibold">
                {siteConfig.table.badge}
              </span>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                {siteConfig.table.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              {siteConfig.table.description}
            </p>
          </div>
          <div className="text-xs font-mono text-[var(--color-text-muted)]">
            Click any row to inspect deep schema
          </div>
        </div>
      </div>

      <div className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[var(--color-panel-subtle)]">
              <TableRow className="border-b border-[var(--color-border)] hover:bg-transparent">
                {siteConfig.table.columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] font-mono py-3 px-4"
                  >
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {siteConfig.table.rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => setSelectedRow(row)}
                  className="border-b border-[var(--color-border)]/60 cursor-pointer hover:bg-[var(--color-panel-subtle)]/70 transition-colors"
                >
                  <TableCell className="font-mono text-xs font-semibold text-[var(--color-text-primary)] py-3 px-4">
                    {row.id}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <div className="font-medium text-xs text-[var(--color-text-primary)]">
                      {row.entityName}
                    </div>
                    <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
                      {row.updatedAt}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-[var(--color-text-secondary)] py-3 px-4">
                    {row.category}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    {getStatusBadge(row.status)}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-[#533AFD] dark:text-[#7A68FF] font-medium py-3 px-4">
                    {row.latency}
                  </TableCell>
                  <TableCell className="py-3 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRow(row);
                      }}
                      className="h-7 text-xs font-mono text-[#533AFD] dark:text-[#7A68FF] hover:text-[#432DE0] hover:bg-[#533AFD]/10 p-1 px-2.5 rounded-[4px]"
                    >
                      Inspect
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Slide-Out Inspection Sheet */}
      <Sheet open={!!selectedRow} onOpenChange={(open) => !open && setSelectedRow(null)}>
        <SheetContent className="w-full sm:max-w-xl bg-[var(--color-surface)] border-l border-[var(--color-border)] p-6 overflow-y-auto">
          {selectedRow && (
            <div className="space-y-6">
              <SheetHeader className="text-left space-y-2 border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[4px] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
                    {selectedRow.id}
                  </span>
                  {getStatusBadge(selectedRow.status)}
                </div>
                <SheetTitle className="text-lg font-bold text-[var(--color-text-primary)]">
                  {selectedRow.entityName}
                </SheetTitle>
                <SheetDescription className="text-xs text-[var(--color-text-secondary)]">
                  Consular mission jurisdiction telemetry, polling interval, and automated slot reservation lock status.
                </SheetDescription>
              </SheetHeader>

              {/* Key Values Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Visa Category</div>
                  <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{selectedRow.category}</div>
                </div>
                <div className="p-3 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Probe Latency</div>
                  <div className="font-mono font-semibold text-[#533AFD] dark:text-[#7A68FF] mt-0.5">{selectedRow.latency}</div>
                </div>
                <div className="p-3 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Last Polled</div>
                  <div className="font-mono text-[var(--color-text-secondary)] mt-0.5">{selectedRow.updatedAt}</div>
                </div>
                <div className="p-3 rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)]">
                  <div className="text-[10px] text-[var(--color-text-muted)] font-mono uppercase">Residential Proxy</div>
                  <div className="font-mono text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">Active (0 Rate Limits)</div>
                </div>
              </div>

              {/* Raw JSON Inspector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-[#533AFD] dark:text-[#7A68FF]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] font-mono">
                      Deep Diagnostic Payload
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(selectedRow.payload)}
                    className="h-7 text-xs font-mono rounded-[4px]"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3 w-3 mr-1 text-emerald-600" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3 mr-1" />
                        Copy Payload
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-[4px] border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 overflow-x-auto max-h-72 text-xs font-mono text-[var(--color-text-primary)]">
                  <pre>{JSON.stringify(selectedRow.payload, null, 2)}</pre>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
