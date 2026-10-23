// 动态库筛选：方向/细分（多选芯片）+ 主体/期次/标记（下拉）+ 关键词，状态写入 URL hash 便于分享
(() => {
  const list = document.getElementById("lib");
  const countEl = document.getElementById("f-count");
  if (!list || !countEl) return;

  const items = Array.from(list.children);
  const state = { dir: new Set(), cat: new Set(), ent: "", ed: "", flag: "", q: "" };

  const sel = {
    ent: document.getElementById("f-ent"),
    ed: document.getElementById("f-ed"),
    flag: document.getElementById("f-flag"),
    q: document.getElementById("f-q"),
  };

  const has = (value, needle) => (value || "").split("|").includes(needle);

  function apply() {
    let shown = 0;
    const q = state.q.trim().toLowerCase();
    for (const el of items) {
      const d = el.dataset;
      let ok = true;
      for (const v of state.dir) if (!has(d.dir, v)) { ok = false; break; }
      if (ok) for (const v of state.cat) if (!has(d.cat, v)) { ok = false; break; }
      if (ok && state.ent) ok = has(d.ent, state.ent);
      if (ok && state.ed) ok = d.ed === state.ed;
      if (ok && state.flag) ok = has(d.flag, state.flag);
      if (ok && q) ok = el.textContent.toLowerCase().includes(q);
      el.hidden = !ok;
      if (ok) shown++;
    }
    const active = state.dir.size || state.cat.size || state.ent || state.ed || state.flag || q;
    countEl.textContent = active
      ? `命中 ${shown} / ${items.length} 条`
      : `共 ${items.length} 条动态`;
    writeHash();
  }

  function readHash() {
    const raw = location.hash.replace(/^#/, "");
    if (!raw) return;
    for (const part of raw.split("&")) {
      const [k, v] = part.split("=");
      if (!v) continue;
      const val = decodeURIComponent(v);
      if (k === "dir" || k === "cat") {
        state[k].add(val);
      } else if (k === "q") {
        state.q = val;
      } else if (sel[k]) {
        state[k] = val;
      }
    }
  }

  function writeHash() {
    const parts = [];
    for (const v of state.dir) parts.push("dir=" + encodeURIComponent(v));
    for (const v of state.cat) parts.push("cat=" + encodeURIComponent(v));
    for (const k of ["ent", "ed", "flag", "q"]) if (state[k]) parts.push(k + "=" + encodeURIComponent(state[k]));
    const hash = parts.join("&");
    history.replaceState(null, "", hash ? "#" + hash : location.pathname);
  }

  function syncChips(group) {
    document.querySelectorAll(`.chips[data-group="${group}"] .chip`).forEach((chip) => {
      const v = chip.dataset.value;
      const on = v === "" ? state[group].size === 0 : state[group].has(v);
      chip.classList.toggle("is-active", on);
    });
  }

  for (const group of ["dir", "cat"]) {
    document.querySelectorAll(`.chips[data-group="${group}"] .chip`).forEach((chip) => {
      chip.addEventListener("click", () => {
        const v = chip.dataset.value;
        if (v === "") state[group].clear();
        else if (state[group].has(v)) state[group].delete(v);
        else state[group].add(v);
        syncChips(group);
        apply();
      });
    });
  }

  for (const k of ["ent", "ed", "flag"]) {
    if (!sel[k]) continue;
    sel[k].value = state[k];
    sel[k].addEventListener("change", () => {
      state[k] = sel[k].value;
      apply();
    });
  }

  if (sel.q) {
    sel.q.value = state.q;
    sel.q.addEventListener("input", () => {
      state.q = sel.q.value;
      apply();
    });
  }

  const reset = document.getElementById("f-reset");
  if (reset) {
    reset.addEventListener("click", () => {
      state.dir.clear();
      state.cat.clear();
      state.ent = state.ed = state.flag = state.q = "";
      for (const k of ["ent", "ed", "flag"]) if (sel[k]) sel[k].value = "";
      if (sel.q) sel.q.value = "";
      syncChips("dir");
      syncChips("cat");
      apply();
    });
  }

  readHash();
  for (const k of ["ent", "ed", "flag"]) if (sel[k]) sel[k].value = state[k];
  if (sel.q) sel.q.value = state.q;
  syncChips("dir");
  syncChips("cat");
  apply();
})();
