// ---------- Data: the six modules shown on the landing page and dashboard ----------
const MODULES = [
  { icon: "👥", name: "Customers", desc: "Contacts & payment terms" },
  { icon: "📦", name: "Products", desc: "Catalogue & price history" },
  { icon: "💼", name: "Human Resources", desc: "Employees, jobs, departments" },
  { icon: "🛒", name: "Sales", desc: "Transactions & payments" },
  { icon: "📊", name: "Reports", desc: "Seven read-only reports" },
  { icon: "🛡️", name: "User Management", desc: "Accounts, roles & rights" },
];

function renderModules(containerId) {
  document.getElementById(containerId).innerHTML = MODULES.map(m =>
    `<div class="mod"><div class="ico">${m.icon}</div><b>${m.name}</b><small>${m.desc}</small></div>`
  ).join("");
}
renderModules("moduleGridPreview");
renderModules("moduleGrid");

// ---------- Simple "router": show the section that matches the URL hash ----------
const VIEWS = ["home", "signin", "register", "reset", "sent", "dashboard"];

function showView() {
  let name = location.hash.replace("#", "") || "home";
  if (!VIEWS.includes(name)) name = "home";
  // the dashboard needs a signed-in user
  if (name === "dashboard" && !sessionStorage.getItem("hopeUser") && !localStorage.getItem("hopeUser")) {
    name = "signin";
  }
  VIEWS.forEach(v => document.getElementById(v).classList.toggle("active", v === name));
  if (name === "dashboard") fillDashboard();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", showView);
window.addEventListener("load", showView);

// ---------- Helpers ----------
const emailOk = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function setError(inputId, errId, message) {
  const input = document.getElementById(inputId);
  const err = document.getElementById(errId);
  err.textContent = message || "";
  input.classList.toggle("invalid", Boolean(message));
  return !message;
}

// show / hide password (the eye buttons)
document.querySelectorAll(".eye").forEach(btn => {
  btn.addEventListener("click", () => {
    const input = document.getElementById(btn.dataset.target);
    const hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    btn.setAttribute("aria-label", hidden ? "Hide password" : "Show password");
  });
});

// ---------- Sign in ----------
function signIn(user) {
  // Prototype only: this stores the user in the browser. A real login must check a server.
  const store = document.getElementById("remember").checked ? localStorage : sessionStorage;
  store.setItem("hopeUser", JSON.stringify(user));
  location.hash = "#dashboard";
}

document.getElementById("signinForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("siEmail").value.trim();
  const pass = document.getElementById("siPass").value;
  const a = setError("siEmail", "siEmailErr", emailOk(email) ? "" : "Enter a valid email address");
  const b = setError("siPass", "siPassErr", pass ? "" : "Enter your password");
  if (a && b) signIn({ role: "User", name: email.split("@")[0] });
});

// prototype shortcut buttons: Superadmin / Admin / User
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => signIn({ role: chip.dataset.role, name: chip.dataset.name }));
});

// ---------- Register ----------
document.getElementById("registerForm").addEventListener("submit", e => {
  e.preventDefault();
  const first = document.getElementById("rgFirst").value.trim();
  const email = document.getElementById("rgEmail").value.trim();
  const pass = document.getElementById("rgPass").value;
  const confirm = document.getElementById("rgConfirm").value;

  const mailGood = setError("rgEmail", "rgEmailErr", emailOk(email) ? "" : "Enter a valid email address");
  let msg = "";
  if (!first || !document.getElementById("rgLast").value.trim()) msg = "Please enter your first and last name.";
  else if (pass.length < 8) msg = "Password must be at least 8 characters.";
  else if (pass !== confirm) msg = "Passwords do not match.";
  document.getElementById("rgErr").textContent = msg;

  if (mailGood && !msg) {
    // new accounts always get the default User role
    sessionStorage.setItem("hopeUser", JSON.stringify({ role: "User", name: first }));
    location.hash = "#dashboard";
  }
});

// ---------- Reset password ----------
document.getElementById("resetForm").addEventListener("submit", e => {
  e.preventDefault();
  const email = document.getElementById("rsEmail").value.trim();
  if (setError("rsEmail", "rsErr", emailOk(email) ? "" : "Enter a valid email address")) {
    document.getElementById("sentEmail").textContent = email;
    location.hash = "#sent";
  }
});

// ---------- Google button (placeholder) ----------
["googleBtn", "googleBtn2"].forEach(id =>
  document.getElementById(id).addEventListener("click", () =>
    alert("Google sign-in will be connected when the backend is ready."))
);

// ---------- Dashboard ----------
function fillDashboard() {
  const user = JSON.parse(sessionStorage.getItem("hopeUser") || localStorage.getItem("hopeUser"));
  document.getElementById("dashRole").textContent = user.role;
  document.getElementById("dashName").textContent = user.name;
  document.getElementById("dashWelcome").textContent = `Welcome back, ${user.name.split(" ")[0]}!`;
}

document.getElementById("signOut").addEventListener("click", () => {
  sessionStorage.removeItem("hopeUser");
  localStorage.removeItem("hopeUser");
  location.hash = "#signin";
});
