---
title: Monitoring and alarms
description: What the agent collects, where it goes, and the default alarms it seeds.
---

# Monitoring and alarms

Monitoring works with zero configuration: the agent exposes a `monitoring` resource with a standard set of system metrics, and provisioning wires everything else (the product, the storage bucket, and a set of default alarm rules) so data starts flowing the moment the device connects.

## What the agent collects

| Group | Fields |
|-------|--------|
| CPU | `usage` (%), `load` (1m / 5m / 15m), `cores`, `temperature` (°C, when the device exposes a thermal sensor) |
| Memory | `total`, `available`, `usage` (%) |
| Swap | `total`, `free`, `usage` (%) |
| Disk | Per filesystem: `total`, `available`, `usage` (%) |
| Network | Aggregate across all non-loopback interfaces: `rx_bytes` / `tx_bytes` (totals), `rx_rate` / `tx_rate` (current throughput) |
| System | `hostname`, `os`, `kernel`, `architecture`, `uptime`, `processes` |
| Agent | `version` |

You can read a live sample at any time, without touching the stored data:

```bash
thinr device status <deviceId>          # connection stats + latest sample
thinr device resource <deviceId> monitoring
```

Which filesystems get monitored is remotely configurable: set a `config` property on the device with `{ "monitoring": { "disks": { "data": "/mnt/data" } } }` and the agent applies it live, with no restart. Device properties can be set from the web console or the MCP tools.

## Where the data goes

Metrics are persisted through the device's **product**: the default product profile defines a `monitoring` bucket that samples each device's `monitoring` resource **every 60 seconds**. Dashboards in the web console (per device and per fleet) and the default alarm rules all read from that bucket.

## Product bootstrap at install

This is set up automatically when a device is provisioned:

- If the account has **no ThinRemote product**, the installer creates one (id `thinremote`, name "ThinRemote") with the monitoring bucket already configured.
- If there is **exactly one**, the device is assigned to it.
- If there are **several**, the interactive installer asks; headless installs choose with `--product <id>`.

## Default alarm rules

Along with the product, provisioning seeds a set of account-level alarm rules. Seeding is idempotent: existing rules are never duplicated or overwritten, so your tuning survives re-installs.

| Rule | Triggers when | Checked |
|------|---------------|---------|
| High CPU | `cpu.usage` above 85% | 5-minute average, evaluated every minute |
| High Memory | memory usage above 80% | 5-minute average |
| High Disk Usage | root filesystem above 75% | 5-minute average |
| High Swap Usage | swap above 50% (devices with swap) | 5-minute average |
| High CPU Temperature | above 80°C (devices with a sensor) | 5-minute average |
| Missing Monitoring Data | an enabled device stops reporting metrics | higher severity: it usually means the device is down |

The rules ship with **no notification channels configured**; they raise alarm instances you can see in the web console until you wire email or webhook notifications to them.

To seed (or reset) the default rules without provisioning a device, for example when preparing a fresh instance, use [`thinr-agent bootstrap`](/device-agent/reference/cli-flags#bootstrap); `--force` recreates them from their defaults.

## Managing alarms

Tuning thresholds, creating your own rules, and configuring notifications are platform-side tasks, not agent ones: do it from the **web console** (Alarms section), or let an AI assistant manage them through the [MCP server](/mcp/overview), which exposes the full alarm rule and instance toolset. Custom metrics beyond the standard set are also possible: expose any value with a [custom script](./custom-scripts) and it becomes alarmable like any built-in metric.
