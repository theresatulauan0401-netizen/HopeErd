// ---------- Who is signed in? (set by the sign-in screen in script.js) ----------
const user = JSON.parse(sessionStorage.getItem("hopeUser") || localStorage.getItem("hopeUser") || "null");
if (!user) location.href = "index.html#signin";
const isAdmin = user && (user.role === "Admin" || user.role === "Superadmin");

document.getElementById("role").textContent = user ? user.role : "";
document.getElementById("uname").textContent = user ? user.name : "";
document.getElementById("out").onclick = () => {
  sessionStorage.removeItem("hopeUser"); localStorage.removeItem("hopeUser");
  location.href = "index.html#signin";
};
// standard users can look but not change anything
if (!isAdmin) document.querySelectorAll(".admin-only").forEach(el => el.hidden = true);

// ---------- Sample data (saved in this browser so changes survive a refresh) ----------
const SEED = [
  { no: "C-001", name: "Acme Corporation", address: "123 Main St, Metro City", terms: "Net 30", contact: "Dana Whitfield", email: "dana.whitfield@acme-corp.com", phone: "(555) 014-2201", status: "Active", created: "2026-10-01" },
  { no: "C-002", name: "Globex Industries", address: "456 Oak Ave, Harbor Town", terms: "Net 45", contact: "Marcus Lee", email: "marcus.lee@globex.com", phone: "(555) 014-3310", status: "Active", created: "2026-10-01" },
  { no: "C-003", name: "Initech LLC", address: "78 Park Rd, Metro City", terms: "COD", contact: "Priya Nair", email: "priya.nair@initech.com", phone: "(555) 014-4422", status: "Active", created: "2026-10-02" },
  { no: "C-004", name: "Umbrella Trading", address: "9 Dock St, Harbor Town", terms: "Net 15", contact: "Ben Carter", email: "ben.carter@umbrella.com", phone: "(555) 014-5533", status: "Inactive", created: "2026-10-02" },
  { no: "C-005", name: "Stark Enterprises", address: "1 Tower Ave, Metro City", terms: "Net 15", contact: "Pepper Lane", email: "pepper.lane@stark-ent.com", phone: "(555) 014-6641", status: "Active", created: "2026-10-03" },
];
const SALES = { "C-001": [{ no: "T-001", date: "2026-10-01", emp: "E-002 — Juan Reyes", total: "$234.50", status: "Active" }] };

let customers;
try { customers = JSON.parse(localStorage.getItem("hopeCustomers")) || SEED; } catch { customers = SEED; }
const save = () => { try { localStorage.setItem("hopeCustomers", JSON.stringify(customers)); } catch {} };

const $ = id => document.getElementById(id);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function toast(msg) { const t = $("toast"); t.textContent = msg; t.classList.add("show"); setTimeout(() => t.classList.remove("show"), 3500); }

// ---------- Router: #list, #view/C-001, #add, #edit/C-002 ----------
function route() {
  const [page, id] = (location.hash.replace("#", "") || "list").split("/");
  ["listView", "detailView", "formView"].forEach(v => $(v).hidden = true);
  const c = customers.find(x => x.no === id);
  if ((page === "add" || page === "edit") && !isAdmin) return (location.hash = "#list");
  if (page === "view" && c) { showDetail(c); }
  else if (page === "add") { showForm(null); }
  else if (page === "edit" && c) { showForm(c); }
  else { showList(); }
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);

// ---------- List: search, filters, sort ----------
function showList() {
  $("listView").hidden = false;
  $("crumb").textContent = "Customers"; $("pageTitle").textContent = "Customers";
  const q = $("q").value.trim().toLowerCase(), st = $("fStatus").value, tm = $("fTerms").value, sort = $("fSort").value;
  let list = customers.filter(c =>
    (isAdmin ? (st === "All" || c.status === st) : c.status === "Active") &&   // standard users only see Active
    (tm === "All" || c.terms === tm) &&
    (!q || [c.name, c.no, c.contact].some(v => v.toLowerCase().includes(q))));
  list.sort((a, b) => sort === "za" ? b.name.localeCompare(a.name) : sort === "no" ? a.no.localeCompare(b.no) : a.name.localeCompare(b.name));

  $("rows").innerHTML = list.map(c => `<tr>
    <td>${esc(c.no)}</td>
    <td><b>${esc(c.name)}</b><small>${esc(c.email)}</small></td>
    <td>${esc(c.contact)}</td><td>${esc(c.phone)}</td><td>${esc(c.terms)}</td>
    <td><span class="tag ${c.status}">${c.status}</span></td>
    <td><a class="btn btn-light sm" href="#view/${c.no}">View</a>
        ${isAdmin ? `<a class="btn btn-light sm" href="#edit/${c.no}">Edit</a>` : ""}</td></tr>`).join("");
  $("empty").hidden = list.length > 0;
  $("countText").textContent = `Showing ${list.length} customer${list.length === 1 ? "" : "s"}`;
  $("clear").hidden = !(q || tm !== "All" || (isAdmin && st !== "Active"));
}
["q", "fStatus", "fTerms", "fSort"].forEach(id => $(id).addEventListener("input", showList));
$("clear").onclick = () => { $("q").value = ""; $("fStatus").value = "Active"; $("fTerms").value = "All"; showList(); };

// ---------- Details (with delete confirmation) ----------
function showDetail(c) {
  $("detailView").hidden = false;
  $("crumb").textContent = `Customers › ${c.no}`; $("pageTitle").textContent = "Customer Details";
  const sales = SALES[c.no] || [];
  $("detailView").innerHTML = `
    <a class="back" href="#list">← Back to customers</a>
    <div class="head"><div><h2>${esc(c.name)} <span class="tag ${c.status}">${c.status}</span></h2>
      <p class="sub">Customer ${c.no} · Created ${c.created}</p></div>
      ${isAdmin ? `<div><a class="btn btn-light" href="#edit/${c.no}">Edit</a> <button class="btn danger" id="delBtn">Delete</button></div>` : ""}</div>
    <div id="confirmBox"></div>
    <div class="panel"><h3>Customer information</h3>
      <dl class="kv"><dt>Customer no.</dt><dd>${esc(c.no)}</dd><dt>Customer name</dt><dd>${esc(c.name)}</dd>
      <dt>Address</dt><dd>${esc(c.address) || "—"}</dd><dt>Payment terms</dt><dd>${esc(c.terms) || "—"}</dd></dl>
      <h3>Contact details</h3>
      <dl class="kv"><dt>Contact person</dt><dd>${esc(c.contact) || "—"}</dd><dt>Email</dt><dd>${esc(c.email) || "—"}</dd><dt>Phone</dt><dd>${esc(c.phone) || "—"}</dd></dl>
      <h3>Sales to this customer</h3>
      ${sales.length ? `<div class="table-wrap"><table><thead><tr><th>Trans no.</th><th>Date</th><th>Employee</th><th>Total</th><th>Status</th></tr></thead><tbody>
        ${sales.map(s => `<tr><td>${s.no}</td><td>${s.date}</td><td>${s.emp}</td><td>${s.total}</td><td>${s.status}</td></tr>`).join("")}</tbody></table></div>`
        : `<p class="sub">No sales recorded for this customer yet.</p>`}
    </div>`;
  const del = $("delBtn");
  if (del) del.onclick = () => {
    $("confirmBox").innerHTML = `<div class="confirm"><b>Delete ${esc(c.name)}?</b><p>This removes the customer from the list. This cannot be undone.</p>
      <button class="btn danger" id="yes">Yes, delete</button><button class="btn btn-light" id="no">Cancel</button></div>`;
    $("no").onclick = () => $("confirmBox").innerHTML = "";
    $("yes").onclick = () => { customers = customers.filter(x => x.no !== c.no); save(); location.hash = "#list"; toast(`${c.name} was deleted.`); };
  };
}

// ---------- Add / Edit form ----------
let editing = null;
function showForm(c) {
  editing = c; $("formView").hidden = false;
  const nextNo = "C-" + String(Math.max(0, ...customers.map(x => +x.no.slice(2))) + 1).padStart(3, "0");
  $("crumb").textContent = c ? `Customers › Edit ${c.no}` : "Customers › Add Customer";
  $("pageTitle").textContent = c ? "Edit Customer" : "Add Customer";
  $("formTitle").textContent = c ? "Edit Customer" : "Add Customer";
  $("formSub").textContent = c ? `${c.no} · ${c.name} · Update the details below.` : "Enter the customer’s details. Fields marked * are required.";
  $("fNo").value = c ? c.no : `${nextNo} (assigned automatically)`;
  $("noHint").textContent = c ? "Cannot be changed" : "Generated when you save";
  $("fName").value = c?.name || ""; $("fAddr").value = c?.address || ""; $("fPay").value = c?.terms || "";
  $("fContact").value = c?.contact || ""; $("fPhone").value = c?.phone || ""; $("fEmail").value = c?.email || ""; $("fStat").value = c?.status || "Active";
  $("nameErr").textContent = $("emailErr").textContent = "";
  $("custForm").dataset.next = nextNo;
}
$("custForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("fName").value.trim(), email = $("fEmail").value.trim();
  $("nameErr").textContent = name ? "" : "Customer name is required.";
  $("emailErr").textContent = !email || emailOk(email) ? "" : "Enter a valid email address";
  if (!name || (email && !emailOk(email))) return;
  const data = { name, address: $("fAddr").value.trim(), terms: $("fPay").value, contact: $("fContact").value.trim(), phone: $("fPhone").value.trim(), email, status: $("fStat").value };
  if (editing) Object.assign(editing, data);
  else customers.push({ no: $("custForm").dataset.next, created: new Date().toISOString().slice(0, 10), ...data });
  save(); location.hash = "#list";
  toast(editing ? `${name} was updated.` : `${name} was added.`);
});

route();
