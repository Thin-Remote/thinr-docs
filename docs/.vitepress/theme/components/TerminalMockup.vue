<script setup>
// Terminal in the hero of the home page: a thinr session on the fleet of the
// landing scenario (edge-gw-017 at Pump station 4). An illustration, hidden
// from assistive technology; the cursor stops with prefers-reduced-motion
import { Sparkles } from 'lucide-vue-next';
</script>

<template>
  <div class="tdocs-term-wrap" aria-hidden="true">
    <div class="tdocs-term">
      <div class="tdocs-term-bar">
        <span class="tdocs-term-title">thinr · operator@workstation</span>
        <span class="tdocs-term-live"><i></i>3 online</span>
      </div>
      <div class="tdocs-term-body">
        <p><b>$</b> thinr device list --search edge-gw</p>
        <div class="tdocs-term-table">
          <span class="on">●</span><span>edge-gw-017</span><span>Pump station 4</span>
          <span class="on">●</span><span>edge-gw-018</span><span>Pump station 5</span>
          <span class="on">●</span><span>edge-gw-021</span><span>Reservoir 2</span>
          <span class="off">●</span><span>edge-gw-024</span><span>Booster 1</span>
        </div>
        <p><b>$</b> thinr device exec edge-gw-017 "uptime"</p>
        <p class="out">10:42:07 up 41 days, 3:12, load average: 0.08, 0.11</p>
        <p><b>$</b> thinr device console edge-gw-017</p>
        <p class="prompt">root@edge-gw-017:~# <i class="tdocs-term-cursor"></i></p>
      </div>
    </div>
    <div class="tdocs-toast">
      <span class="tdocs-toast-icon"><Sparkles :size="16" /></span>
      <span><b>AI assistant over MCP</b><small>thinr_resource_call · exec on edge-gw-017</small></span>
    </div>
  </div>
</template>

<style scoped>
.tdocs-term-wrap {
  position: relative;
}

.tdocs-term {
  border-radius: 16px;
  overflow: hidden;
  background: #0b1222;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1.6;
  color: #e2e8f0;
}

.tdocs-term-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  font-size: 0.72rem;
}

.tdocs-term-live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #34d399;
  font-weight: 600;
}

.tdocs-term-live i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
}

.tdocs-term-body {
  padding: 16px 18px 18px;
}

.tdocs-term-body p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tdocs-term-body p + p,
.tdocs-term-table + p {
  margin-top: 6px;
}

.tdocs-term-body b {
  margin-right: 6px;
  color: #6fb6ff;
  font-weight: 700;
}

.tdocs-term-body .out {
  color: #94a3b8;
}

.tdocs-term-body .prompt {
  color: #6fb6ff;
}

.tdocs-term-table {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 2px 12px;
  margin: 6px 0 4px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  color: #cbd5e1;
}

.tdocs-term-table span:nth-child(3n) {
  color: #94a3b8;
}

.tdocs-term-table .on {
  color: #34d399;
}

.tdocs-term-table .off {
  color: #64748b;
}

.tdocs-term-cursor {
  display: inline-block;
  width: 7px;
  height: 14px;
  vertical-align: -2px;
  background: #6fb6ff;
  animation: tdocs-blink 1s steps(1) infinite;
}

@keyframes tdocs-blink {
  50% {
    opacity: 0;
  }
}

.tdocs-toast {
  position: absolute;
  left: -36px;
  bottom: -44px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px 10px 10px;
  border-radius: 12px;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
  font-size: 13px;
  line-height: 1.5;
}

.tdocs-toast b {
  display: block;
  font-size: 13px;
}

.tdocs-toast small {
  color: #64748b;
  font-family: var(--font-mono);
  font-size: 11.5px;
}

.tdocs-toast-icon {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ecfdf5;
  color: #047857;
}

@media (prefers-reduced-motion: reduce) {
  .tdocs-term-cursor {
    animation: none;
  }
}
</style>
