---
title: Install the CLI
description: Install the thinr CLI on your workstation.
---

# Install the CLI

The CLI is distributed as an npm package and requires Node.js ≥ 18.

## Install

```bash
npm install -g @thinremote/thinr-cli
```

This puts `thinr` on your `PATH`. To upgrade later, run `npm update -g @thinremote/thinr-cli`.

::: tip Permission denied (`EACCES`) on the global install?
This means your npm global prefix is root-owned, which happens when Node was installed with the official macOS/Linux installer. The clean fixes are using a Node version manager (nvm, fnm, volta) or [moving the npm prefix to a user directory](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally); `sudo npm install -g` also works, but npm itself recommends the former. Homebrew and version-manager installs of Node don't have this problem.
:::

To install from source instead:

```bash
git clone https://github.com/Thin-Remote/thinr-cli
cd thinr-cli && npm install && npm link
```

## Authenticate

Run the CLI without arguments to start the first-time setup:

```bash
thinr
```

You'll be asked for the ThinRemote server and can authenticate using one of:

- OAuth 2.0 device flow (browser), the recommended option.
- Username and password.
- Pre-issued bearer token.

The profile is saved at `~/.config/thinr-cli/config.json` and marked as the default. Expired tokens are refreshed transparently when a refresh token is available.

Verify everything works:

```bash
thinr device list
```

## Multiple accounts and environments

The config file holds any number of named profiles, one per server or account. Add more with `thinr profile add <name>` and switch with `thinr profile use <name>`, or override per invocation with `--profile <name>` / the `THINR_PROFILE` environment variable. See the [`thinr profile` reference](/cli/reference/profile-commands).

## Troubleshooting certificates

When talking to a development server with a self-signed certificate, set:

```bash
THINR_INSECURE=1 thinr device list
```

`localhost` and `127.0.0.1` are always accepted without this flag; `THINR_INSECURE=1` extends the exception to any host. Don't use it against production servers.

## Next steps

- [Quick Start](/getting-started/quick-start): the full agent, CLI and MCP walkthrough
- [CLI workflows](/cli/ssh-and-console): consoles, exec, files, tunnels
- [MCP overview](/mcp/overview): let AI assistants drive your fleet through `thinr mcp`
