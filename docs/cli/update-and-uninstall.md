---
title: Update and uninstall the CLI
description: Move the CLI to a new version, switch release channels, or remove it cleanly.
---

# Update and uninstall the CLI

The CLI is an npm package, so both operations are npm operations. Nothing here touches your devices or the agents running on them.

## Update

```bash
npm install -g @thinremote/thinr-cli@latest
```

`npm update -g` also works, but pinning `@latest` is the reliable form: npm's update rules for global packages depend on the range recorded at install time. Check what you ended up with:

```bash
thinr --version                              # what you have
npm view @thinremote/thinr-cli version       # what is published
```

### Release channels

Stable releases publish under the `latest` tag. Pre-release builds from the development branch publish under `develop`, as `X.Y.Z-alpha.N`:

```bash
npm install -g @thinremote/thinr-cli@develop   # pre-release
npm install -g @thinremote/thinr-cli@latest    # back to stable
```

The CLI and the agent version independently: they speak the platform API, not each other, so you can update either on its own. Newer CLI features may depend on a recent agent, though, and the CLI says so when a device's agent is too old to serve a request.

## Uninstall

```bash
npm uninstall -g @thinremote/thinr-cli
```

That removes the `thinr` command and leaves your profiles behind, which is what you want when reinstalling. To remove them too, including the stored credentials:

```bash
rm -rf ~/.config/thinr-cli
```

That directory holds `config.json` with one entry per profile: server, username and the access token the CLI authenticates with. Deleting it signs you out everywhere the CLI was used on this machine, and the next `thinr` run starts the setup from scratch.

::: tip Permission errors
If npm refuses with `EACCES`, your global prefix is root-owned. The same options as at install time apply: a Node version manager, [moving the npm prefix](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally), or `sudo` as a last resort. Use the same one you installed with, or npm will not find the package to remove.
:::

Removing the CLI does not remove anything from your account, and does not stop or uninstall any agent. For that, see [uninstalling the agent](/device-agent/uninstall).

## Related

- [Install the CLI](/cli/install)
- [Agent updates](/device-agent/agent-updates): updating the agent on one device or a whole fleet
