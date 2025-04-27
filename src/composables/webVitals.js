// src/composables/metrics.js
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals'

/**
 * Injects a single Web Vitals HUD into the page.
 * Safe to call multiple times—will only render once.
 */
export function initWebVitals() {
  // 1) If we already injected, bail out
  if (document.getElementById('wv-container')) return

  // 2) Create the HUD container
  const container = document.createElement('div')
  container.id = 'wv-container'
  container.style.cssText = `
    position: fixed;
    top: 10px; right: 10px;
    background: #fff;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-family: monospace;
    font-size: 13px;
    z-index: 10000;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  `

  // 3) Platform line
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)
  const platEl = document.createElement('div')
  platEl.style.marginBottom = '4px'
  platEl.textContent = `🖥 Platform: ${isMobile ? 'Mobile' : 'Desktop'}`
  container.append(platEl)

  // 4) Browser line
  const ua = navigator.userAgent
  let browser = 'Unknown'
  if (ua.includes('YaBrowser')) browser = 'Yandex'
  else if (ua.includes('Edg')) browser = 'Edge'
  else if (ua.includes('OPR') || ua.includes('Opera')) browser = 'Opera'
  else if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari'
  else if (ua.includes('Chrome')) browser = 'Chrome'

  const browEl = document.createElement('div')
  browEl.style.marginBottom = '8px'
  browEl.style.fontWeight = 'bold'
  browEl.textContent = `🧭 Browser: ${browser}`
  container.append(browEl)

  // 5) Append HUD to body
  document.body.append(container)

  // 6) Helpers for formatting + coloring
  const thresholds = {
    bad: { LCP: 4000, FCP: 3000, TTFB: 600, INP: 500, CLS: 0.2 },
    warning: { LCP: 2500, FCP: 1800, TTFB: 300, INP: 200, CLS: 0.1 }
  }

  function formatValue(name, value) {
    if (value == null) return '–'
    if (name === 'CLS') return value.toFixed(3)
    return Math.round(value) + 'ms'
  }

  function getColor(name, value) {
    if (value >= thresholds.bad[name]) return 'red'
    if (value >= thresholds.warning[name]) return 'orange'
    return 'green'
  }

  function renderMetric({ name, value }) {
    const elId = `wv-${name}`
    let el = document.getElementById(elId)
    if (!el) {
      el = document.createElement('div')
      el.id = elId
      el.style.marginBottom = '4px'
      container.append(el)
    }
    const txt = formatValue(name, value)
    const color = getColor(name, value)
    el.innerHTML = `<strong style="color:${color}">${name}:</strong> ${txt}`
  }

  // 7) Hook up Web Vitals listeners (will call renderMetric on each)
  onCLS(renderMetric)
  onINP(renderMetric)
  onLCP(renderMetric)
  onFCP(renderMetric)
  onTTFB(renderMetric)
}
