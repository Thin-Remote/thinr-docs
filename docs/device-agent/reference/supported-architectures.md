---
title: Supported architectures
description: CPU architectures with prebuilt agent binaries.
---

# Supported architectures

Binaries are published per architecture as `thinr-agent.<suffix>`. The installer maps `uname -m` to the right one automatically (including endianness and FPU detection for MIPS), so the suffix only matters when downloading by hand.

| Architecture | Linux | macOS | Binary suffix |
|---|---|---|---|
| `x86_64` / `amd64` | ✅ | ✅ | `x86_64-linux-musl` / `x86_64-darwin` |
| `aarch64` / `arm64` | ✅ | ✅ | `aarch64-linux-musl` / `arm64-darwin` |
| `armv7` / `armhf` | ✅ | – | `armv7-linux-musleabihf` |
| `armv6` (Pi Zero) | ✅ | – | `armv6-linux-musleabihf` |
| `armv5l` | ✅ | – | `armv5l-linux-musleabi` |
| `i686` | ✅ | – | `i686-linux-musl` |
| `i386` | ✅ | – | `i386-linux-musl` |
| `mips` (big-endian) | ✅ | – | `mips-linux-musl` |
| `mipsel` (little-endian) | ✅ | – | `mipsel-linux-musl` |
| `mipsel-sf` (soft-float) | ✅ | – | `mipsel-linux-muslsf` |
| `mips64` | ✅ | – | `mips64-linux-musl` |
| `mips64el` | ✅ | – | `mips64el-linux-musl` |
| `powerpc` | ✅ | – | `powerpc-linux-musl` |
| `powerpc64le` | ✅ | – | `powerpc64le-linux-musl` |
| `riscv32` | ✅ | – | `riscv32-linux-musl` |
| `riscv64` | ✅ | – | `riscv64-linux-musl` |

## Kernel and libc

- Linux kernel 2.6 or newer.
- Statically linked against musl libc: one self-contained binary, no runtime dependencies, runs on virtually any distribution.
- macOS 15.0 (Sequoia) or newer, Intel and Apple Silicon.

## Manual download

Each binary is available per [channel or pinned version](/device-agent/channels):

```
https://get.thinremote.io/binaries/<channel-or-version>/thinr-agent.<suffix>
```

Missing a platform? [Open an issue](https://github.com/Thin-Remote/thinr-agent/issues): the cross-compilation toolchain builds from a single matrix, so adding targets is cheap.
