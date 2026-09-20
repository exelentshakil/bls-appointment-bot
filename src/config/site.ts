/**
 * BLS SlotRunner Engine Cockpit Configuration Hub
 * Central Schema & Data Provider for BLS Appointment Automation.
 */

export interface NavItem {
  id: string;
  label: string;
}

export interface MetricItem {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'neutral' | 'down';
  subtext: string;
  badge: string;
}

export interface TableRow {
  id: string;
  entityName: string;
  category: string;
  status: 'active' | 'verified' | 'queued' | 'flagged';
  latency: string;
  provider: string;
  updatedAt: string;
  payload: Record<string, unknown>;
}

export interface SiteConfig {
  slug: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  archetype: 'stripe' | 'linear' | 'notion' | 'lovable' | 'bloomberg' | 'apple';
  primaryNav: NavItem[];
  metrics: MetricItem[];
  workflow: {
    badge: string;
    title: string;
    description: string;
    inputLabel: string;
    inputPlaceholder: string;
    defaultInput: string;
    buttonLabel: string;
    sampleResponse: Record<string, unknown>;
  };
  table: {
    badge: string;
    title: string;
    description: string;
    columns: { key: string; label: string }[];
    rows: TableRow[];
  };
}

export const siteConfig: SiteConfig = {
  slug: 'bls-appointment-bot',
  name: 'BLS SlotRunner',
  badge: 'v2.4 Stealth Headless Core',
  tagline: 'Autonomous Appointment Booking & Anti-Detection Engine for BLS Spain Global',
  description: 'Production-grade headless automation architecture engineered with Playwright stealth fingerprints, Cloudflare Turnstile token handling, automated OTP/session persistence, and sub-second slot reservation.',
  archetype: 'linear',
  primaryNav: [
    { id: 'cockpit', label: 'Slot Telemetry' },
    { id: 'pipeline', label: 'Headless Flow Runner' },
    { id: 'records', label: 'Active Center Monitors' },
  ],
  metrics: [
    {
      id: 'slot_latency',
      title: 'Slot Detection Latency',
      value: '640ms',
      change: 'Sub-Second Polling',
      trend: 'up',
      subtext: 'P99 Polling Interval: 1.2s',
      badge: 'Real-Time SSE',
    },
    {
      id: 'anti_detection',
      title: 'Stealth Bypass Rate',
      value: '99.8% Clean',
      change: 'Zero Cloudflare Bans',
      trend: 'up',
      subtext: 'TLS JA3/JA4 Fingerprint Evasion',
      badge: 'Playwright Stealth',
    },
    {
      id: 'booking_flow',
      title: 'Booking Flow Execution',
      value: '1.8s Avg',
      change: 'Automated Checkout',
      trend: 'neutral',
      subtext: 'Auto Form-Fill & OTP Hook',
      badge: 'Headless Daemon',
    },
  ],
  workflow: {
    badge: 'Step 1 • Playwright Headless Simulation',
    title: 'BLS Appointment Sniping & Headless Booking Pipeline',
    description: 'Simulate automated session handshake, Cloudflare Turnstile bypass, slot availability probing, and instant applicant reservation payload.',
    inputLabel: 'Target BLS Mission Center, Visa Category & Applicant Configuration',
    inputPlaceholder: 'Enter center jurisdiction, visa subtype, and applicant profile for headless booking test...',
    defaultInput: 'Center: BLS Los Angeles (USA) • Category: National Visa / Student (Long Term) • Earliest Slot Target: Nov 2026 • Applicant: Elliot Vance (Passport: A92817402, Tel: +1-310-555-0182) • Session Strategy: Headless Chromium with TLS JA3/JA4 fingerprint rotation and residential proxy pool.',
    buttonLabel: 'Execute Headless Slot Probe',
    sampleResponse: {
      session_status: 'AUTHENTICATED_AND_ACTIVE',
      target_center: 'BLS Spain Los Angeles (USA)',
      visa_category: 'National Visa / Student (Long Term)',
      anti_bot_telemetry: {
        engine: 'Playwright Stealth Chromium Daemon',
        cloudflare_turnstile: 'BYPASSED_IN_410MS',
        tls_fingerprint: 'JA3/JA4 Chrome 128 MacOS Spoof',
        residential_ip_rotation: 'ACTIVE (US-West-LosAngeles)',
        session_cookie_ttl: '3540s Remaining',
      },
      slot_probe_result: {
        status: 'AVAILABLE_SLOT_DETECTED',
        slot_id: 'BLS-LA-20261114-0930',
        appointment_date: '2026-11-14',
        appointment_time: '09:30 AM PST',
        biometric_desk: 'Desk 04 (Express Tier)',
        reservation_lock_status: 'LOCKED (Hold 15 mins)',
      },
      automated_booking_payload: {
        applicant_name: 'Elliot Vance',
        passport_token: 'SHA256:8f2a...19e0 (Encrypted)',
        otp_verification_flow: 'Webhook / IMAP Listener Hook Ready',
        booking_reference: 'BLS-SPA-USA-8492019',
        execution_time_ms: 1840,
      },
    },
  },
  table: {
    badge: 'Real-Time Mission Monitors',
    title: 'Active BLS Consular Appointment Monitoring Queue',
    description: 'Live multi-center daemon monitoring appointment availability with automated slot sniping and anti-bot health checks.',
    columns: [
      { key: 'id', label: 'Monitor ID' },
      { key: 'entityName', label: 'BLS Consular Center' },
      { key: 'category', label: 'Visa Subtype' },
      { key: 'status', label: 'Slot Status' },
      { key: 'latency', label: 'Probe Latency' },
      { key: 'action', label: 'Inspection' },
    ],
    rows: [
      {
        id: 'MON-1042',
        entityName: 'BLS Spain Los Angeles, CA',
        category: 'National Visa (Study/Work)',
        status: 'verified',
        latency: '512ms',
        provider: 'Playwright Stealth Core',
        updatedAt: 'Just now',
        payload: {
          center_code: 'USA-LAX-01',
          jurisdiction: 'California, Arizona, Nevada',
          active_target_date: '2026-11-14',
          slot_availability: '1 Slot Open (09:30 AM PST)',
          anti_detection_score: '100% Clean (Zero Challenge)',
          proxy_region: 'Los Angeles Residential Pool',
          last_probe_timestamp: new Date().toISOString(),
          auto_book_rule: 'Auto-Trigger Enabled (Instant Lock)',
        },
      },
      {
        id: 'MON-1041',
        entityName: 'BLS Spain Miami, FL',
        category: 'Schengen Tourist & Business',
        status: 'active',
        latency: '480ms',
        provider: 'Headless Chromium Daemon',
        updatedAt: '1 min ago',
        payload: {
          center_code: 'USA-MIA-02',
          jurisdiction: 'Florida, Georgia, South Carolina',
          active_target_date: 'Scanning Nov 2026 window',
          slot_availability: 'Monitoring (Next drop in ~4 mins)',
          anti_detection_score: '99.8% Clean',
          proxy_region: 'Miami Residential Pool',
          last_probe_timestamp: new Date().toISOString(),
          auto_book_rule: 'Queued for slot drop',
        },
      },
      {
        id: 'MON-1040',
        entityName: 'BLS Spain New York, NY',
        category: 'Non-Lucrative Residence Visa',
        status: 'verified',
        latency: '620ms',
        provider: 'TLS Fingerprint Rotator',
        updatedAt: '3 mins ago',
        payload: {
          center_code: 'USA-NYC-01',
          jurisdiction: 'New York, New Jersey, Connecticut',
          active_target_date: '2026-11-20',
          slot_availability: '2 Slots Open (11:00 AM & 02:15 PM EST)',
          anti_detection_score: '100% Clean',
          proxy_region: 'New York Tier-1 Static IP',
          last_probe_timestamp: new Date().toISOString(),
          auto_book_rule: 'Hold pending applicant confirmation',
        },
      },
      {
        id: 'MON-1039',
        entityName: 'BLS Spain San Francisco, CA',
        category: 'Golden Visa / Investor',
        status: 'queued',
        latency: '390ms',
        provider: 'Residential Proxy Gateway',
        updatedAt: '5 mins ago',
        payload: {
          center_code: 'USA-SFO-01',
          jurisdiction: 'Northern California, Oregon, Washington',
          active_target_date: 'Scanning Dec 2026 window',
          slot_availability: 'Standby mode (Interval: 1.5s)',
          anti_detection_score: '100% Clean',
          proxy_region: 'San Jose Residential Node',
          last_probe_timestamp: new Date().toISOString(),
          auto_book_rule: 'Active Daemon',
        },
      },
      {
        id: 'MON-1038',
        entityName: 'BLS Spain Washington, DC',
        category: 'Family Reunification',
        status: 'flagged',
        latency: '1,140ms',
        provider: 'Turnstile Solver Hook',
        updatedAt: '8 mins ago',
        payload: {
          center_code: 'USA-WAS-01',
          jurisdiction: 'District of Columbia, Maryland, Virginia',
          active_target_date: 'Scanning Nov 2026 window',
          slot_availability: 'Rate Limit Warning Solved',
          anti_detection_score: 'Turnstile Challenge Solved in 980ms',
          proxy_region: 'Ashburn Residential Node',
          last_probe_timestamp: new Date().toISOString(),
          auto_book_rule: 'IP rotated & session refreshed',
        },
      },
    ],
  },
};
