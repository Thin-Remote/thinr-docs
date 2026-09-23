---
title: Custom scripts
description: Turn your own scripts into callable device APIs, per device or fleet-wide.
---

# Custom scripts

Custom scripts turn anything your device can do into a **callable API resource**: a named operation with typed inputs and JSON output, invokable from the CLI, the web console, the REST API, or an AI assistant over MCP. No daemon to write, no endpoint to wire up; the platform does the plumbing.

There are two deployment patterns. Per-device scripts are great for experiments and device-specific tooling. Product scripts are the scalable pattern: define the operation once and every device of the product exposes it instantly.

## Per-device scripts

Drop an executable into the agent's scripts directory and it registers automatically as a resource, named after the file stem (`battery.sh` becomes the resource `battery`):

- System-wide: `/etc/thinr-agent/scripts/`
- User: `~/.config/thinr-agent/scripts/`

The contract is simple: answer `--describe` with your input/output schema, then read JSON on stdin and print JSON on stdout. The full protocol lives in the [custom scripts spec](/device-agent/reference/custom-scripts-spec).

The agent scans that directory when it starts. A script you add later is picked up by the agent's `$scripts/reload` resource: it rescans the directory, registers what is new, unregisters what is gone, and returns the resulting list. `$scripts/info` returns the current list without rescanning. Deploying over MCP takes effect immediately because `thinr_script_write` and `thinr_script_delete` call reload for you.

```bash
thinr device resource edge-gw-17            # the script shows up as a resource
thinr device resource edge-gw-17 battery    # call it
```

You don't need shell access to deploy one: an AI assistant connected over [MCP](/mcp/overview) can do the whole cycle remotely (write the file, make it executable, reload the registry) with the `thinr_script_write` tool.

## Fleet-wide: product scripts

Installing the same file on three hundred devices doesn't scale. **Product scripts** invert the model: the script is stored centrally in the product, and the platform registers an API resource (named after the script) that every device of the product exposes immediately. When called, the script executes on the target device through the agent's command resource, and its stdout comes back as the response.

What this buys you:

- **Zero per-device deployment.** New devices joining the product get the resource automatically.
- **One update, whole fleet.** Change the stored script and the next call anywhere runs the new version.
- **Typed inputs.** Declare the input schema at registration and the web console renders proper fields; callers get validation.
- **Everything composes.** The resource is callable per device, fan-out across the product, chartable as a [dashboard metric](/cli/reference/product-commands#dashboard-metrics), and alarmable like any built-in metric.

The MCP server orchestrates the whole installation as one idempotent operation (`thinr_product_script_write`): it uploads the script to the product's file storage, registers the typed API resource bound to it, and enables it for the fleet.

## A worked example

Say you run a fleet of vending machines and want the cash level as a first-class operation. Ask your assistant:

> Install a script called `cash-level` on the product `vending-machines`: it should read `/var/lib/vendor/cash.json` and return `{ "level": <number>, "currency": "<code>" }`.

The assistant writes the script and calls `thinr_product_script_write`. From that moment, every vending machine exposes `cash-level`:

```bash
# one machine
thinr device resource store-14 cash-level

# the whole fleet, one entry per device
thinr product resource vending-machines cash-level --json
```

And because it's a product API resource, you can put it on the fleet dashboard and alarm on it:

```bash
thinr product metric-set vending-machines cash-level \
  -r cash-level -f level -a sum --unit "EUR" -v kpi
```

That's the loop that makes the platform extensible: any value your machine can produce becomes a metric, an alarm source, and an AI-callable tool, defined once for the whole fleet.

## Security considerations

Scripts run with the agent's privileges (root on a system install), so treat script content like any other code you ship: review it, and prefer product scripts over ad-hoc per-device edits precisely because they give you one auditable definition. Calling a resource requires platform credentials with access to that device; the script itself adds no new network surface.
