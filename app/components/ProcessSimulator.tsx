"use client";

import { useState, useEffect, useRef } from "react";
import Reveal from "./Reveal";

interface LogLine {
  time: string;
  text: string;
  type: "info" | "success" | "warning";
}

interface SimulatorTab {
  id: string;
  name: string;
  subtitle: string;
  logs: LogLine[];
  metrics: { label: string; value: string }[];
}

const simulatorTabs: SimulatorTab[] = [
  {
    id: "erp",
    name: "AdlER ERP Orchestration",
    subtitle: "Multi-Entity Ledger & Qatar VAT Audit",
    logs: [
      { time: "15:52:01", text: "Initializing corporate ledger consolidation across 12 GCC entities...", type: "info" },
      { time: "15:52:02", text: "Syncing multi-currency balances with Doha Bank API endpoints...", type: "info" },
      { time: "15:52:04", text: "Running compliance audit for Qatari Ministry of Finance VAT rules...", type: "info" },
      { time: "15:52:06", text: "Ledger reconciled. Outlier variance: 0.00%", type: "success" },
      { time: "15:52:07", text: "Generating Qatari VAT-201 return sheet: COMPLETED", type: "success" },
    ],
    metrics: [
      { label: "Entities Synced", value: "12 / 12" },
      { label: "Audit Speed", value: "84,200 txn/s" },
      { label: "Reconciliation", value: "100.00%" },
    ],
  },
  {
    id: "hcm",
    name: "AdlER HCM WPS Payroll",
    subtitle: "Wage Protection System & GCC Labor Laws",
    logs: [
      { time: "15:52:10", text: "Parsing employee attendance data from Doha & Mesaieed biometric gates...", type: "info" },
      { time: "15:52:12", text: "Applying local labor law restrictions (overtime caps, holiday multipliers)...", type: "info" },
      { time: "15:52:13", text: "Compiling Wage Protection System (WPS) bank transfer registry...", type: "info" },
      { time: "15:52:15", text: "Verifying credentials with QNB payroll API: SUCCESS", type: "success" },
      { time: "15:52:16", text: "WPS SIF file compiled for 14,028 active employees.", type: "success" },
    ],
    metrics: [
      { label: "Staff Processed", value: "14,028" },
      { label: "Bank Handshake", value: "0.4s (QNB)" },
      { label: "WPS Compliance", value: "100.00%" },
    ],
  },
  {
    id: "sitewatch",
    name: "AdlER IoT SiteWatch",
    subtitle: "Real-time Refinery Telemetry & Anomaly Scan",
    logs: [
      { time: "15:52:20", text: "Polling thermal sensors at Mesaieed Industrial Area refinery...", type: "info" },
      { time: "15:52:21", text: "Analyzing pressure readings: 4,200 points monitored...", type: "info" },
      { time: "15:52:22", text: "Warning: Zone 4 oil separator temperature rising (82°C)...", type: "warning" },
      { time: "15:52:24", text: "Compensating valve flow rate adjusted automatically (Delta: +12%)...", type: "success" },
      { time: "15:52:25", text: "Refinery telemetry stable. Zone 4 temperature resolved: 74°C.", type: "success" },
    ],
    metrics: [
      { label: "Active Sensors", value: "4,200" },
      { label: "Zone 4 Flow", value: "+12.4 L/s" },
      { label: "Telemetry Status", value: "NORMAL" },
    ],
  },
];

export default function ProcessSimulator() {
  const [activeTabId, setActiveTabId] = useState("erp");
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<LogLine[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  const activeTab = simulatorTabs.find((t) => t.id === activeTabId) || simulatorTabs[0];

  useEffect(() => {
    if (!running) return;

    let logTimeout: NodeJS.Timeout;

    // Simulate progress bar filling up
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    // Stagger printing logs line-by-line
    const printLogs = (index: number) => {
      if (index >= activeTab.logs.length) {
        setRunning(false);
        return;
      }

      setVisibleLogs((prev) => [...prev, activeTab.logs[index]]);
      
      logTimeout = setTimeout(() => {
        printLogs(index + 1);
      }, 900);
    };

    printLogs(0);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(logTimeout);
    };
  }, [running, activeTab.logs]);

  useEffect(() => {
    // Auto-scroll logs to bottom
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleLogs]);

  const triggerSimulation = () => {
    if (running) return;
    setProgress(0);
    setVisibleLogs([]);
    setRunning(true);
  };

  return (
    <section className="relative w-full bg-bg-base py-24">
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-12 z-10">
        
        {/* Header Title */}
        <div className="mb-16 text-center md:text-left">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-cyan">
              REAL-TIME ORCHESTRATION
            </span>
            <h2 className="mt-2 font-display text-4xl font-extrabold tracking-tight text-text-primary md:text-5xl">
              Simulate the AdlER OS
            </h2>
            <p className="mt-4 max-w-xl text-sm font-light text-text-secondary">
              Interact directly with our system modules. Trigger processes and audit live telemetry running on the GCC enterprise network.
            </p>
          </Reveal>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-divider bg-bg-surface p-6 md:p-8">
          
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {simulatorTabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setVisibleLogs([]);
                    setProgress(0);
                    setRunning(false);
                  }}
                  disabled={running}
                  className={`flex flex-col items-start p-5 border text-left transition-all duration-300 ${
                    isActive
                      ? "border-cyan bg-bg-raised shadow-[0_0_15px_rgba(0,194,212,0.1)]"
                      : "border-divider/60 hover:border-cobalt hover:bg-bg-raised/40 disabled:opacity-60"
                  }`}
                  data-interactive
                >
                  <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? "text-cyan" : "text-text-secondary"}`}>
                    {tab.name}
                  </span>
                  <span className="mt-1 text-xs font-light text-text-dim">
                    {tab.subtitle}
                  </span>
                </button>
              );
            })}

            {/* Run Button */}
            <button
              onClick={triggerSimulation}
              disabled={running}
              className={`mt-6 btn-sweep border border-cobalt bg-cobalt py-4 text-xs font-bold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-cyan hover:shadow-[0_0_15px_rgba(0,194,212,0.3)] disabled:opacity-50 disabled:cursor-not-allowed`}
              data-interactive
            >
              {running ? "Simulating..." : "Trigger Live Simulation"}
            </button>
          </div>

          {/* Right Column: Interactive Console & Logs */}
          <div className="lg:col-span-8 flex flex-col justify-between border border-divider bg-[#040A12] p-5 md:p-6 font-mono text-xs">
            {/* Console Header */}
            <div className="flex items-center justify-between border-b border-divider/40 pb-4 mb-4 select-none">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan animate-pulse" />
                <span className="text-text-secondary text-xs uppercase tracking-wider">
                  ADLER SUITE TELEMETRY - ACTIVE TERMINAL
                </span>
              </div>
              <span className="text-xs text-text-dim">
                PORT: SECURE-504
              </span>
            </div>

            {/* Logs Area */}
            <div className="flex-1 min-h-[220px] max-h-[300px] overflow-y-auto flex flex-col gap-2.5 pr-2">
              {visibleLogs.length === 0 && !running && (
                <div className="text-text-dim italic text-center py-12 select-none">
                  Ready. Click &quot;Trigger Live Simulation&quot; above to run diagnostics.
                </div>
              )}
              {visibleLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 leading-relaxed">
                  <span className="text-cyan font-semibold shrink-0">[{log.time}]</span>
                  <span
                    className={
                      log.type === "success"
                        ? "text-cyan"
                        : log.type === "warning"
                        ? "text-amber-400"
                        : "text-text-secondary"
                    }
                  >
                    {log.text}
                  </span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>

            {/* Metrics & Progress Footer */}
            <div className="border-t border-divider/40 pt-4 mt-6">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-text-dim uppercase tracking-wider">PROCESS PROGRESS</span>
                  <span className="text-cyan text-xs font-bold">{progress}%</span>
                </div>
                <div className="h-[2px] w-full bg-divider/60">
                  <div
                    className="h-full bg-cyan transition-all duration-100 ease-out shadow-[0_0_8px_#00C2D4]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                {activeTab.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col border-r border-divider/40 last:border-r-0">
                    <span className="text-xs text-text-dim uppercase tracking-wider">{m.label}</span>
                    <span className="text-text-primary text-sm font-bold mt-1 font-sans">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
