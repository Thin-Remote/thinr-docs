---
title: File management
description: Read, write, list and move files on remote devices.
---

# File management

Every filesystem operation is available from the CLI, as MCP tools for AI assistants, and as a visual explorer in the web console. The agent serves the device's filesystem bounded by its user's OS permissions; see the [filesystem feature](/device-agent/filesystem).

## Transfers

```bash
thinr device push <deviceId> ./config.yaml /etc/app/    # upload (trailing / keeps the name)
thinr device pull <deviceId> /var/log/app.log ./        # download
```

Use `push`/`pull` for real files. For quick inline content, skip the temp file:

```bash
thinr device read <deviceId> /etc/hostname               # print to stdout (alias: cat)
echo "$CONFIG" | thinr device write <deviceId> /etc/app/env   # write from stdin or an argument
```

## Browsing and managing

```bash
thinr device ls <deviceId> /etc/app                      # -a includes dotfiles
thinr device mkdir <deviceId> /opt/app/releases
thinr device mv <deviceId> /opt/app/current /opt/app/previous -f
thinr device rm <deviceId> /tmp/build --no-recursive    # recursive by default
```

All accept `--json` for scripting. Full flags in the [`thinr device` reference](/cli/reference/device-commands#files).

## Fleet-wide transfers

Deploy the same file to every active device of a product, in parallel:

```bash
thinr product push edge-gateways ./config.yaml /etc/app/config.yaml -c 10
```

`-g` scopes by group, `--fail-fast` stops dequeueing on the first failure, and JSON mode reports per-device results. For transfers that need logic around them (back up the old file, restart the service, verify), use a [playbook](/cli/reference/playbook-commands).

## Permissions and ownership

Operations run as the agent's user: on a system install that's root, so transferred files land owned by root with default permissions. If your application needs different ownership or modes, follow up with an exec:

```bash
thinr device exec <deviceId> "chown app:app /etc/app/config.yaml && chmod 640 /etc/app/config.yaml"
```

## From AI assistants

The same operations are MCP tools: `thinr_push`, `thinr_pull`, `thinr_read`, `thinr_write`, `thinr_ls`, `thinr_mkdir`, `thinr_rm`, `thinr_mv`. "Pull the nginx config from store-14 and explain it" is a one-liner for a connected assistant; see [Drive your fleet with AI](/getting-started/ai-assistant).

## From the web console

The web console ships a visual filesystem explorer for browsing, uploading, downloading, and editing files with no SFTP setup.
