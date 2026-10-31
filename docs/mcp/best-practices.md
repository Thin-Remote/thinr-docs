---
title: MCP best practices
description: Run agents safely and effectively over your ThinRemote fleet.
---

# Best practices

## Safety

- **Keep tool-call confirmations on** for state-changing tools. Your MCP client asks before each call by default; that human-in-the-loop matters most for `thinr_resource_call` (commands, rollouts), `thinr_resource_delete`, and `thinr_resource_create` or `_update` on type `device_fs`.
- **Read the plan before confirming.** `exec` on several devices, playbook runs on several devices and rollouts answer the devices they would reach first, and only run when the call is repeated with `confirm: true`. Check that list before the assistant confirms.
- **Use a dedicated profile** for agent sessions, backed by a token with narrower permissions, and select it with `THINR_PROFILE` in the client config or the `profile` argument per call. Revoking that one token cuts the agent off without touching your own access.
- **Serve read-only when you only need answers.** `thinr mcp --read-only` registers a server that only describes, lists, reads and runs read-only actions: an assistant on it can diagnose but never change anything.
- **Prefer playbooks for changes at scale.** The `rollout` action of type `product_playbook` gives you check mode, batches and a failure kill-switch; a bare `exec` across the fleet has none of that.

## Effectiveness

- **Let the assistant describe first.** `thinr_resource_describe` with a type answers its ids, bodies, actions and ready-to-send examples; a call after that rarely fails.
- **Name the device or product in your prompt.** "Check the disk on store-14" beats "check disks" followed by a fleet-wide scan; the assistant passes `ids {"device": "store-14"}` and saves a discovery round-trip.
- **Search instead of listing everything.** `thinr_resource_list` type `device` takes `search` (id or name) and `filter` (product, asset group, labels), so "list the EU gateways" maps to one call instead of listing everything and filtering in context.
- **Fan out in one call, not loops.** `exec` with `product`, `group`, `devices` or `all` runs a command across the fleet with per-device results and a summary.
- **Validate playbooks before running them.** The `validate` action catches schema errors cheaply; then `run` with check mode against one device before any rollout.
- **History beats polling.** For "what happened overnight", `thinr_resource_list` type `bucket_data` over the monitoring bucket and type `alarm_instance` answer directly, without sampling devices one by one.

## Operating patterns that work well

- **Alarm triage**: "Anything firing? For each alarm, look at the device and tell me the likely cause." (`alarm_instance` → the device's `monitoring` resource → read-only diagnostics with `exec`.)
- **Incident drill-down**: "Why does store-14 keep restarting the app?" (logs via `exec`, config via `device_fs`, history via `bucket_data`.)
- **Capability building**: "Expose the battery level as a resource on every gateway" (a `product_script`, then a [dashboard metric and alarm](/device-agent/custom-scripts#a-worked-example) on top).
- **Staged change**: "Update nginx config on the canary, verify, then roll out" (a `product_playbook` run with check mode on one device, then its `rollout` action).
