/* ============================================================
   Contador GTA VI · Uruguay
   Para cambiar la fecha, editá solo CONFIG.
   ============================================================ */

const CONFIG = {
  // Medianoche local en Uruguay (UTC-3, sin horario de verano)
  targetISO: "2026-11-19T00:00:00-03:00",
  dateLabel: "Jueves 19 de noviembre de 2026",
  tzLabel: "00:00 · hora de Uruguay",
};

const TARGET = new Date(CONFIG.targetISO).getTime();

const $ = (id) => document.getElementById(id);
const els = {
  app: $("app"),
  days: $("days"),
  hours: $("hours"),
  minutes: $("minutes"),
  seconds: $("seconds"),
  dateLabel: $("dateLabel"),
  tzLabel: $("tzLabel"),
};

const pad = (n) => String(n).padStart(2, "0");

function render() {
  const diff = TARGET - Date.now();

  if (diff <= 0) {
    els.app.classList.add("is-released");
    return false;
  }

  const total = Math.floor(diff / 1000);
  els.days.textContent = Math.floor(total / 86400);
  els.hours.textContent = pad(Math.floor((total % 86400) / 3600));
  els.minutes.textContent = pad(Math.floor((total % 3600) / 60));
  els.seconds.textContent = pad(total % 60);
  return true;
}

let timer = null;

function start() {
  els.dateLabel.textContent = CONFIG.dateLabel;
  els.tzLabel.textContent = CONFIG.tzLabel;

  if (!render()) return;

  // Se alinea al inicio de cada segundo real para que no se "salte" ningún número
  const loop = () => {
    if (!render()) return;
    timer = setTimeout(loop, 1000 - (Date.now() % 1000));
  };
  timer = setTimeout(loop, 1000 - (Date.now() % 1000));
}

// Al volver a abrir la app desde el inicio del iPhone, se recalcula al instante
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") render();
});

start();

/* ---------- Service worker (modo offline) ---------- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
