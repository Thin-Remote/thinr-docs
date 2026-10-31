---
title: MCP tool catalog
description: The eight tools of the ThinRemote MCP server, the resource types they reach and the actions each type runs.
---

# Tool catalog

The server exposes **eight tools**. Every operation goes through one of them: what changes from call to call is the resource **type** (a device, a file on a device, a product playbook, a bucket's time series…), the **ids** that locate the record, and for actions, the **action** name.

| Tool | What it does |
|------|--------------|
| **`thinr_resource_describe`** | Without arguments: every type with its operations and actions, example calls, and the guide to the platform's concepts. With a `type`: its ids, filters, bodies, actions, permissions and ready-to-send examples. Agents call it first. |
| **`thinr_resource_list`** | List the records of a type, in pages of 50 (`count`, `index`), with `search` by id or name and a `filter` (product, asset group, labels, any field of the record). |
| **`thinr_resource_get`** | Read one record. |
| **`thinr_resource_create`** | Create a record from `body`. Also writes data: samples to a bucket, files to a storage or to a device. |
| **`thinr_resource_update`** | Update a record; fields left out are kept. Property values are replaced unless `merge: true`. |
| **`thinr_resource_delete`** | Delete a record (immediate and permanent). |
| **`thinr_resource_clone`** | Copy a record under a new id. |
| **`thinr_resource_call`** | Run an action: anything that is not create, read, update or delete (run a command, call a device resource, roll out a playbook…). |

## Arguments

- **`type`**: the resource type, e.g. `"device"`, `"device_fs"`, `"product_playbook"`.
- **`ids`**: the record and its parents, one key per level: `{"device": "gw_1"}`, `{"device": "gw_1", "property": "firmware"}`, `{"device": "gw_1", "path": "/etc/hosts"}`. Leave out the record's own id to list a collection. The records the tools answer carry their `ids`, so an agent passes them back as they are.
- **`body`**: the record to create or update, or the input of an action.
- **`action`** (on `thinr_resource_call`): the action to run, e.g. `"exec"`.
- **`user`** and **`profile`**, on every tool: act on another account (admin impersonation) or on another configured environment for that one call. `thinr_resource_list` type `"profile"` lists the profiles.

## ThinRemote types

These types and actions come from the ThinRemote agent running on the devices.

| Type | ids | Operations and actions |
|------|-----|------------------------|
| `device` | `device` | Action **`exec`**: run a shell command, with its output and exit code. On one device (`ids.device`) or on several in parallel (no ids; `body.devices`, `body.product` with an optional `body.group`, or `body.all: true`). Action **`agent_update`**: check (`{"action": "check"}`) or apply (`{"action": "apply", "channel": "latest"}`) an [agent update](/device-agent/agent-updates). Action **`agent_install`**: the one-line install command for a new machine. |
| `device_fs` | `device`, `path` | The device's [filesystem](/device-agent/filesystem): list a folder, read, write and delete files; actions `move`, `push` and `pull` (copy files between the machine running the MCP server and the device). |
| `device_script` | `device`, `script` | [Custom scripts](/device-agent/custom-scripts) installed on one device. Writing one installs it, makes it executable and reloads the agent's registry: `battery.sh` becomes the resource `battery`. |
| `product_script` | `product`, `script` | [Fleet-wide scripts](/device-agent/custom-scripts#fleet-wide-product-scripts): stored once in the product's storage and run by every device as a product API resource. Creating one sets up the storage, the resource and the product code in one call. |
| `product_playbook` | `product`, `playbook` | [Playbooks](/cli/reference/playbook-commands) stored on a product. Actions `validate`, `run` (one device, a list, a group or the whole product, with dry-run and check modes) and `rollout` (in batches, with a failure threshold). |

Two product properties configure the CLI's terminal dashboard and are written as regular `product_property` records: **`logs`** (the [log sources](/cli/reference/product-commands#logs), `{sources, default}`) and **`dashboard_metrics`** (the [dashboard metrics](/cli/reference/product-commands#dashboard-metrics), the whole array). Both are checked before they are saved, and `thinr_resource_describe` type `"product_property"` shows their shape.

## Platform types

The rest of the account is reachable the same way. The most used:

- **Devices**: `device`, and its children `device_property`, `device_resource` (the live API of a connected device: list it, run one with action `call`; the agent's `monitoring` resource gives the live metrics), `device_token`, `device_bucket`, `device_service`.
- **Products**: `product`, `product_property`, and the profile its devices get: `product_profile_api` (action `call` runs a resource across the product), `product_profile_bucket`, `product_profile_property`, `product_profile_autoprovision`, `product_profile_flow`, `product_profile_code`.
- **Data**: `bucket`, `bucket_data` (the time series: list reads it, create writes samples, e.g. the monitoring history), `storage` and `storage_file`.
- **Alarms**: `alarm_rule` and `alarm_instance` (update one to acknowledge, shelve or clear it).
- **Access**: `token`, `asset_type`, `asset_group`, `project`, `role`, `claim`.
- **Guides**: `doc` (the platform's concepts, product code, the custom scripts contract…) and `profile` (this CLI's environments).

`thinr_resource_describe` without arguments lists every type, administration ones included (users, hosts, domains), with its operations and actions.

## Examples

```json
{"tool": "thinr_resource_list", "arguments": {"type": "device", "search": "edge-gw"}}
{"tool": "thinr_resource_call", "arguments": {"type": "device", "action": "exec", "ids": {"device": "gw_1"}, "body": {"command": "uptime"}}}
{"tool": "thinr_resource_call", "arguments": {"type": "device", "action": "exec", "body": {"command": "df -h /", "product": "gateways"}}}
{"tool": "thinr_resource_get", "arguments": {"type": "device_fs", "ids": {"device": "gw_1", "path": "/etc/hosts"}}}
{"tool": "thinr_resource_create", "arguments": {"type": "device_fs", "ids": {"device": "gw_1", "path": "/tmp/app.conf"}, "body": {"content": "port=8080\n"}}}
{"tool": "thinr_resource_call", "arguments": {"type": "device_resource", "action": "call", "ids": {"device": "gw_1", "resource": "monitoring"}}}
{"tool": "thinr_resource_update", "arguments": {"type": "device_property", "ids": {"device": "gw_1", "property": "setpoint"}, "body": {"value": {"target": 21.5}}}}
{"tool": "thinr_resource_call", "arguments": {"type": "product_playbook", "action": "run", "ids": {"product": "gateways", "playbook": "app-config"}, "body": {"device": "gw_1", "check": true}}}
```

## Calls that ask first

Some actions reach many devices at once. `exec` on several devices, a playbook `run` on several devices and a playbook `rollout` first answer the devices they would reach, without running anything. They run when the call is repeated with `confirm: true` in the body, or, in clients that support it, after the server asks you directly. The same goes for other high-impact actions of the platform (replacing a whole product profile, restarting a host).

## Read-only mode

`thinr mcp --read-only` (or `THINR_MCP_READ_ONLY=1` in the client's environment) serves only what reads: `describe`, `list`, `get` and the read-only actions. Use it for assistants that should diagnose but never change anything.

```bash
claude mcp add thinr-ro -s user -- thinr mcp --read-only
```

## Seeing the live schemas

This page is the map; the source of truth is the server itself. Ask your assistant to call `thinr_resource_describe` for a type before using it: the answer includes the schemas of this server's API and examples ready to send.
