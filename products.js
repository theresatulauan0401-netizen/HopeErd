// ---------- Signed-in user (set by the sign-in screen) ----------
const user = JSON.parse(sessionStorage.getItem("hopeUser") || localStorage.getItem("hopeUser") || "null");
if (!user) location.href = "index.html#signin";
const isAdmin = user && (user.role === "Admin" || user.role === "Superadmin");
document.getElementById("role").textContent = user ? user.role : "";
document.getElementById("uname").textContent = user ? user.name : "";
document.getElementById("out").onclick = () => {
  sessionStorage.removeItem("hopeUser"); localStorage.removeItem("hopeUser");
  location.href = "index.html#signin";
};
if (!isAdmin) document.querySelectorAll(".admin-only").forEach(el => el.hidden = true);

// ---------- Sample data: each product keeps its own price history ----------
const SEED = [
  { code: "P-001", name: "Industrial Widget A", sku: "IW-A100", category: "Hardware", unit: "pcs", status: "Active",
    prices: [{ date: "2025-03-01", price: 12.5, by: "system" }, { date: "2026-01-01", price: 13.75, by: "system" }] },
  { code: "P-002", name: "Steel Bracket Heavy", sku: "SB-H200", category: "Hardware", unit: "pcs", status: "Active",
    prices: [{ date: "2025-05-01", price: 48.5, by: "system" }] },
  { code: "P-003", name: "Lubricant Oil 5L", sku: "LO-5L300", category: "Consumables", unit: "can", status: "Active",
    prices: [{ date: "2024-09-01", price: 24, by: "system" }, { date: "2025-06-01", price: 26.5, by: "system" },
             { date: "2026-02-01", price: 28, by: "system" }, { date: "2026-12-01", price: 30, by: "user1" }] },
  { code: "P-004", name: "Safety Gloves XL", sku: "SG-XL400", category: "Safety Gear", unit: "pair", status: "Inactive", prices: [] },
  { code: "P-005", name: "Copper Wire 2.5mm", sku: "CW-25500", category: "Electrical", unit: "meter", status: "Active",
    prices: [{ date: "2025-08-01", price: 2.35, by: "system" }] },
];
let products;
try { products = JSON.parse(localStorage.getItem("hopeProducts")) || SEED; } catch { products = SEED; }
const save = () => { try { localStorage.setItem("hopeProducts", JSON.stringify(products)); } catch {} };

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const money = n => "$" + Number(n).toFixed(2);
const today = new Date().toISOString().slice(0, 10);
const toast = msg => { const t = $("toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 3500); };

// ---------- Price history helpers ----------
const sorted = p => [...p.prices].sort((a, b) => b.date.localeCompare(a.date));                 // newest first
const current = p => sorted(p).find(x => x.date <= today) || null;                              // latest price already in effect
const upcoming = p => [...p.prices].filter(x => x.date > today).sort((a, b) => a.date.localeCompare(b.date))[0] || null;
const priceOf = p => (current(p) ? current(p).price : null);

// ---------- Router: #list, #view/P-003, #add, #edit/P-003 ----------
function route() {
  const [page, id] = (location.hash.replace("#", "") || "list").split("/");
  ["listView", "detailView", "formView"].forEach(v => $(v).hidden = true);
  const p = products.find(x => x.code === id);
  if ((page === "add" || page === "edit") && !isAdmin) return (location.hash = "#list");
  if (page === "view" && p) showDetail(p);
  else if (page === "add") showForm(null);
  else if (page === "edit" && p) showForm(p);
  else showList();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

// ---------- List ----------
function showList() {
  $("listView").hidden = false;
  $("crumb").textContent = "Products"; $("pageTitle").textContent = "Products";
  const q = $("q").value.trim().toLowerCase(), cat = $("fCat").value, st = $("fStatus").value, sort = $("fSort").value;
  const list = products.filter(p =>
    (isAdmin ? (st === "All" || p.status === st) : p.status === "Active") &&   // standard users only see Active
    (cat === "All" || p.category === cat) &&
    (!q || [p.name, p.code, p.sku].some(v => v.toLowerCase().includes(q))));
  const val = p => priceOf(p) ?? -1;
  list.sort((a, b) => sort === "za" ? b.name.localeCompare(a.name) : sort === "lo" ? val(a) - val(b) : sort === "hi" ? val(b) - val(a) : a.name.localeCompare(b.name));

  $("rows").innerHTML = list.map(p => `<tr>
    <td><b>${esc(p.name)}</b><small>${p.code}</small></td><td>${esc(p.sku)}</td><td>${esc(p.category)}</td>
    <td>${priceOf(p) === null ? "—" : money(priceOf(p))}</td><td>${esc(p.unit)}</td>
    <td><span class="tag ${p.status}">${p.status}</span></td>
    <td>${p.status === "Inactive" && isAdmin
      ? `<button class="btn btn-light sm" data-restore="${p.code}">Restore</button>`
      : `<a class="btn btn-light sm" href="#view/${p.code}">View</a> ${isAdmin ? `<a class="btn btn-light sm" href="#edit/${p.code}">Edit</a>` : ""}`}</td></tr>`).join("");
  $("empty").hidden = list.length > 0;
  $("emptyTitle").textContent = q ? `No products match “${q}”` : "No products found";
  $("countText").textContent = `Showing ${list.length} of ${products.length} products`;
  $("clear").hidden = !(q || cat !== "All" || st !== "All");
}
["q", "fCat", "fStatus", "fSort"].forEach(id => $(id).addEventListener("input", showList));
$("clear").onclick = () => { $("q").value = ""; $("fCat").value = "All"; $("fStatus").value = "All"; showList(); };
$("rows").addEventListener("click", e => {
  const code = e.target.dataset.restore; if (!code) return;
  const p = products.find(x => x.code === code); p.status = "Active"; save(); showList(); toast(`${p.name} was restored.`);
});

// ---------- Details + price history ----------
function showDetail(p, editDate) {
  $("detailView").hidden = false;
  $("crumb").textContent = `Products › ${p.code}`; $("pageTitle").textContent = "Product Details";
  const cur = current(p), nxt = upcoming(p), hist = sorted(p), asc = [...p.prices].sort((a, b) => a.date.localeCompare(b.date));
  const max = Math.max(...asc.map(x => x.price), 1);

  const rows = hist.map(h => {
    const prev = asc[asc.findIndex(x => x.date === h.date) - 1];
    const diff = prev ? h.price - prev.price : 0;
    const change = !prev ? `<span class="tag Initial">Initial price</span>`
      : `<span class="tag ${diff >= 0 ? "Up" : "Down"}">${diff >= 0 ? "▲ +" : "▼ −"}$${Math.abs(diff).toFixed(2)} (${(diff / prev.price * 100).toFixed(1)}%)</span>`;
    const status = h.date > today ? "Scheduled" : (cur && h.date === cur.date ? "Current" : "Superseded");
    return `<tr><td>${h.date}</td><td class="num">${prev ? money(prev.price) : "—"}</td><td class="num"><b>${money(h.price)}</b></td>
      <td>${change}</td><td><span class="tag ${status}">${status}</span></td><td>${esc(h.by)}</td>
      <td>${isAdmin ? `<button class="btn btn-light sm" data-edit="${h.date}">Edit</button>` : ""}</td></tr>`;
  }).join("");

  $("detailView").innerHTML = `
    <a class="back" href="#list">← Back to products</a>
    <div class="head"><div><h2>${esc(p.name)} <span class="tag ${p.status}">${p.status}</span></h2>
      <p class="sub">${p.code} · SKU ${esc(p.sku)} · ${esc(p.category)}</p></div>
      ${isAdmin ? `<div><a class="btn btn-light" href="#edit/${p.code}">Edit</a> <button class="btn danger" id="delBtn">Delete</button></div>` : ""}</div>
    <div id="confirmBox"></div>
    <div class="cols">
      <div class="card2"><small class="hint">Current price</small>
        <div class="price-big">${cur ? money(cur.price) : "—"}</div>
        <small class="hint">${cur ? `per ${esc(p.unit)} · effective since ${cur.date}` : "No price in effect yet"}</small>
        ${nxt ? `<div class="next">Next: ${money(nxt.price)} on ${nxt.date}</div>` : ""}</div>
      <div class="card2"><h3>Product information</h3>
        <dl class="kv"><dt>Product code</dt><dd>${p.code}</dd><dt>SKU</dt><dd>${esc(p.sku)}</dd><dt>Category</dt><dd>${esc(p.category)}</dd><dt>Unit</dt><dd>${esc(p.unit)}</dd></dl></div>
      <div class="card2"><h3>Price trend</h3>
        ${asc.length ? `<div class="bars">${asc.map(x => `<div class="${x.date > today ? "sched" : ""}"><i style="height:${Math.round(x.price / max * 90)}px"></i>${money(x.price)}</div>`).join("")}</div>
        <small class="hint">${asc[0].date} → ${asc[asc.length - 1].date}${nxt ? " (scheduled in amber)" : ""}</small>` : `<p class="sub">No prices yet.</p>`}</div>
    </div>
    <div class="card2">
      <div class="history-head"><h3>Price history</h3>${isAdmin ? `<button class="btn btn-dark" id="addPrice">+ Add Price</button>` : ""}</div>
      <div id="priceBox"></div>
      ${hist.length ? `<div class="table-wrap"><table><thead><tr><th>Effective date</th><th class="num">Previous</th><th class="num">New price</th><th>Change</th><th>Status</th><th>Updated by</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table></div>`
        : `<p class="sub">No price history yet. Add a price to get started.</p>`}
    </div>`;

  const del = $("delBtn");
  if (del) del.onclick = () => {
    $("confirmBox").innerHTML = `<div class="confirm"><b>Delete ${esc(p.name)}?</b><p>This removes the product and its price history. This cannot be undone.</p>
      <button class="btn danger" id="yes">Yes, delete</button><button class="btn btn-light" id="no">Cancel</button></div>`;
    $("no").onclick = () => $("confirmBox").innerHTML = "";
    $("yes").onclick = () => { products = products.filter(x => x.code !== p.code); save(); location.hash = "#list"; toast(`${p.name} was deleted.`); };
  };
  if (isAdmin) {
    $("addPrice").onclick = () => priceForm(p, null);
    $("detailView").querySelectorAll("[data-edit]").forEach(b => b.onclick = () => priceForm(p, b.dataset.edit));
  }
}

// small form to add or edit one price row
function priceForm(p, date) {
  const row = date ? p.prices.find(x => x.date === date) : null;
  $("priceBox").innerHTML = `<form class="price-form" id="pf" novalidate>
    <b>${row ? "Edit" : "Add"} Price — ${p.code}</b>
    <p class="error summary" id="pfSum"></p>
    <div class="two"><div><label for="pfDate">Effective date *</label><input id="pfDate" type="date" value="${row ? row.date : ""}"><p class="error" id="pfDateErr"></p></div>
    <div><label for="pfPrice">New price (USD) *</label><input id="pfPrice" type="number" step="0.01" value="${row ? row.price : ""}" placeholder="0.00"><p class="error" id="pfPriceErr"></p></div></div>
    <div class="actions"><button class="btn btn-dark" type="submit">Save Price</button><button class="btn btn-light" type="button" id="pfCancel">Cancel</button></div></form>`;
  $("pfCancel").onclick = () => $("priceBox").innerHTML = "";
  $("pf").onsubmit = e => {
    e.preventDefault();
    const d = $("pfDate").value, v = parseFloat($("pfPrice").value);
    const dup = p.prices.find(x => x.date === d && x !== row);
    const dErr = !d ? "Choose an effective date." : dup ? `A price is already set for ${d}. Edit it or choose another date.` : "";
    const pErr = !(v > 0) ? "Price must be greater than 0.00." : "";
    $("pfDateErr").textContent = dErr; $("pfPriceErr").textContent = pErr;
    const n = [dErr, pErr].filter(Boolean).length;
    $("pfSum").textContent = n ? `Please fix ${n} field${n > 1 ? "s" : ""} before saving.` : "";
    if (n) return;
    if (row) { row.date = d; row.price = v; row.by = user.name + " · " + today; }
    else p.prices.push({ date: d, price: v, by: user.name + " · " + today });
    save(); showDetail(p); toast("Price saved.");
  };
}

// ---------- Add / Edit product ----------
let editing = null;
function showForm(p) {
  editing = p; $("formView").hidden = false;
  const next = "P-" + String(Math.max(0, ...products.map(x => +x.code.slice(2))) + 1).padStart(3, "0");
  $("crumb").textContent = p ? `Products › Edit ${p.code}` : "Products › Add Product";
  $("pageTitle").textContent = $("formTitle").textContent = p ? "Edit Product" : "Add Product";
  $("formSub").textContent = p ? `${p.code} · ${p.name} · Update the details below.` : "Create a catalogue item. Fields marked * are required.";
  $("fCode").value = p ? p.code : `${next} (auto)`; $("prodForm").dataset.next = next;
  $("fName").value = p?.name || ""; $("fSku").value = p?.sku || ""; $("fCat2").value = p?.category || ""; $("fUnit").value = p?.unit || "";
  $("fStat").value = p?.status || "Active"; $("fPrice").value = ""; $("fDate").value = today;
  $("newPrice").hidden = Boolean(p); $("editPrice").hidden = !p;
  if (p) { $("curPrice").textContent = priceOf(p) === null ? "—" : money(priceOf(p)); $("manage").href = `#view/${p.code}`; }
  ["nameErr", "skuErr", "catErr", "unitErr", "priceErr", "summary"].forEach(id => $(id).textContent = "");
}
function skuError() {
  const sku = $("fSku").value.trim();
  if (!sku) return "Enter a SKU.";
  const other = products.find(x => x.sku.toLowerCase() === sku.toLowerCase() && x !== editing);
  return other ? `SKU ${sku} is already used by ${other.code}. Enter a unique SKU.` : "";
}
$("fSku").addEventListener("blur", () => { if ($("fSku").value.trim()) $("skuErr").textContent = skuError(); });

$("prodForm").addEventListener("submit", e => {
  e.preventDefault();
  const errs = {
    nameErr: $("fName").value.trim() ? "" : "Enter the product name.",
    skuErr: skuError(),
    catErr: $("fCat2").value ? "" : "Choose a category.",
    unitErr: $("fUnit").value ? "" : "Choose a unit.",
    priceErr: !editing && $("fPrice").value !== "" && !(parseFloat($("fPrice").value) > 0) ? "Price must be greater than 0.00." : "",
  };
  Object.entries(errs).forEach(([id, msg]) => $(id).textContent = msg);
  const n = Object.values(errs).filter(Boolean).length;
  $("summary").textContent = n ? `Please fix ${n} field${n > 1 ? "s" : ""} before saving.` : "";
  if (n) return;

  const data = { name: $("fName").value.trim(), sku: $("fSku").value.trim(), category: $("fCat2").value, unit: $("fUnit").value, status: $("fStat").value };
  if (editing) Object.assign(editing, data);
  else {
    const prices = [], v = parseFloat($("fPrice").value);
    if (v > 0) prices.push({ date: $("fDate").value || today, price: v, by: user.name + " · " + today });
    products.push({ code: $("prodForm").dataset.next, ...data, prices });
  }
  save(); location.hash = "#list"; toast(editing ? `${data.name} was updated.` : `${data.name} was added.`);
});

route();
