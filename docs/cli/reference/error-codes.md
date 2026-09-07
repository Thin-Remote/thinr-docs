---
title: Error codes
description: Error code contract emitted by the CLI in JSON mode.
---

# Error codes

In JSON mode, failures carry a stable `error.code` (see [JSON envelope](./json-envelope)):

| Code | Meaning |
|------|---------|
| `not_configured` | CLI has no saved profile; run `thinr` to set up. |
| `not_found` | Device, property, resource, or profile not found. |
| `unauthorized` | Token expired or insufficient permissions. |
| `server_error` | Non-success HTTP response from the server. |
| `network_error` | No response from the server. |
| `input_error` | Bad or missing CLI argument. |
| `invalid_args` | Invalid argument combination (e.g. mutually exclusive flags). |
| `timeout` | Command timed out on the device (`exec`). |
| `cancelled` | User interrupted with Ctrl+C. |
| `needs_confirm` | Operation refused without confirmation in a non-interactive shell; pass `-y, --yes`. |
| `already_exists` | Profile or resource already exists. |
| `error` | Fallback for anything uncategorized. |

## Process exit codes

| Exit code | Meaning |
|-----------|---------|
| `0` | Success. |
| `1` | Failure of any kind (the JSON envelope or stderr carries the detail). |
| `130` | Interrupted with Ctrl+C. |
| *(remote)* | `device exec` exits with the remote command's exit code. |

Fan-out commands (`thinr product …`) exit `0` even when individual devices fail. Detect partial failures via `summary.failed` / `results[].ok` in the JSON output.
