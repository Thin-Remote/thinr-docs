---
title: MCP best practices
description: Run agents safely and effectively over your ThinRemote fleet.
---

# Best practices

## Safety

- **Keep tool-call confirmations on** for state-changing tools. Your MCP client asks before each call by default; that human-in-the-loop matters most for `thinr_exec`, `thinr_rm`, `thinr_device_delete`, `thinr_product_delete` and playbook rollouts.
- **Use a dedicated profile** for agent sessions, backed by a token with narrower permissions, and select it with `THINR_PROFILE` in the client config or the `profile` argument per call. Revoking that one token cuts the agent off without touching your own access.
- **Let exploration be read-mostly.** Discovery, monitoring, `thinr_bucket_read`, properties and resource listings answer most diagnostic questions without changing anything; a good prompt pattern is "diagnose first, propose the fix, wait for my go".
- **Prefer playbooks for changes at scale.** `thinr_product_playbook_rollout` gives you check mode, batches and a failure kill-switch; an agent looping `thinr_exec` over devices has none of that.

## Effectiveness

- **Name the device or product in your prompt.** "Check the disk on store-14" beats "check disks" followed by a fleet-wide scan; the assistant passes `device` per call and saves a discovery round-trip.
- **Use the regex query.** `thinr_devices` filters by id and name, so "list the EU gateways" maps to one call instead of listing everything and filtering in context.
- **Reach for fan-out tools, not loops.** `thinr_product_exec` runs a command across the product in one call with per-device results; the same goes for `thinr_product_write` for files.
- **Validate playbooks before running them.** `thinr_playbook_validate` catches schema errors cheaply; then run with check mode against one device before any rollout.
- **History beats polling.** For "what happened overnight", `thinr_bucket_read` over the monitoring bucket and `thinr_alarm_instances` answer directly, without sampling devices one by one.

## Operating patterns that work well

- **Alarm triage**: "Anything firing? For each alarm, look at the device and tell me the likely cause." (`thinr_alarm_instances` → `thinr_monitoring` → `thinr_exec` read-only diagnostics.)
- **Incident drill-down**: "Why does store-14 keep restarting the app?" (logs via exec, config via `thinr_read`, history via `thinr_bucket_read`.)
- **Capability building**: "Expose the battery level as a resource on every gateway" (`thinr_product_script_write`, then a [dashboard metric and alarm](/device-agent/custom-scripts#a-worked-example) on top).
- **Staged change**: "Update nginx config on the canary, verify, then roll out" (playbook with check mode on one device, then `thinr_product_playbook_rollout`).
