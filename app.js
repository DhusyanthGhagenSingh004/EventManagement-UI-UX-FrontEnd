// Eventix Master Interactive Application Controller

// Initial Mock Event Database
let eventsData = [
  {
    id: 1,
    title: "Global AI Summit 2026",
    category: "Tech",
    price: 299,
    date: "Oct 24, 2026",
    location: "San Francisco, CA",
    organizer: "AI Visionary Group",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "The world's premier gathering for artificial intelligence researchers, founders, and investors.",
    ticketsSold: 840,
    status: "Published"
  },
  {
    id: 2,
    title: "Metropolitan Jazz Nights",
    category: "Music",
    price: 150,
    date: "Nov 12, 2026",
    location: "New York, NY",
    organizer: "Blue Note Productions",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    description: "An intimate evening of luxury outdoor jazz set against the iconic skyline.",
    ticketsSold: 420,
    status: "Published"
  },
  {
    id: 3,
    title: "Modern Visionary Gala",
    category: "Lifestyle",
    price: 450,
    date: "Dec 05, 2026",
    location: "Austin, TX",
    organizer: "Austin Art Collective",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    description: "Exclusive contemporary art auction, champagne reception, and networking night.",
    ticketsSold: 180,
    status: "Published"
  },
  {
    id: 4,
    title: "NextGen Web3 & Fintech Expo",
    category: "Tech",
    price: 199,
    date: "Jan 18, 2027",
    location: "San Francisco, CA",
    organizer: "Fintech Leaders Forum",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    description: "Discover decentralized financial systems, blockchain security, and digital assets.",
    ticketsSold: 310,
    status: "Published"
  },
  {
    id: 5,
    title: "Vanguard Design Festival",
    category: "Lifestyle",
    price: 120,
    date: "Feb 10, 2027",
    location: "London, UK",
    organizer: "Design Museum London",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    description: "Three days of UI/UX design workshops, spatial computing showcases, and keynote speeches.",
    ticketsSold: 92,
    status: "Draft"
  },
  {
    id: 6,
    title: "Global Founder Mastermind",
    category: "Business",
    price: 399,
    date: "Mar 04, 2027",
    location: "New York, NY",
    organizer: "Venture Catalyst Network",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    description: "High-level scaling strategies, fundraising pitch teardowns, and executive roundtables.",
    ticketsSold: 0,
    status: "Draft"
  }
];

// Current State Management
let selectedEventForBooking = null;
let currentTicketTier = "General";
let currentTicketPrice = 99;
let currentTicketQty = 1;
let currentUser = null; // { name, email, role }

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderLandingPageFeatured();
  renderExploreGrid(eventsData);
  renderDashboardEvents(eventsData);
  handleHashRouting();

  // Listen for hash changes
  window.addEventListener("hashchange", handleHashRouting);
});

// Toast Helper
function showToast(message, icon = "check_circle") {
  const toast = document.getElementById("toast-notification");
  const msgEl = document.getElementById("toast-message");
  const iconEl = document.getElementById("toast-icon");

  msgEl.innerText = message;
  iconEl.innerText = icon;

  toast.classList.remove("translate-y-20", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
  }, 3500);
}

// Router Navigation
function navigateTo(screenId) {
  const screens = document.querySelectorAll(".view-screen");
  screens.forEach(s => s.classList.remove("active"));

  const target = document.getElementById(`view-${screenId}`);
  if (target) {
    target.classList.add("active");
    window.location.hash = screenId;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update header navigation active styles
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    if (link.id === `nav-${screenId}`) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

function handleHashRouting() {
  const hash = window.location.hash.replace("#", "") || "landing";
  const validScreens = ["landing", "explore", "event-details", "dashboard", "features", "pricing", "about", "contact", "login", "signup"];
  if (validScreens.includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo("landing");
  }
}

// Landing Page Featured Events Renderer
function renderLandingPageFeatured() {
  const container = document.getElementById("landing-featured-grid");
  if (!container) return;

  const featured = eventsData.slice(0, 3);
  container.innerHTML = featured.map(ev => `
    <div class="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-outline-variant/20 flex flex-col justify-between">
      <div>
        <div class="h-56 overflow-hidden relative">
          <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${ev.image}" alt="${ev.title}"/>
          <span class="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-primary shadow-sm">${ev.category}</span>
        </div>
        <div class="p-6">
          <div class="flex items-center gap-4 text-xs font-medium text-on-surface-variant mb-3">
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">calendar_today</span> ${ev.date}</span>
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px] text-primary">location_on</span> ${ev.location}</span>
          </div>
          <h3 onclick="openEventDetails(${ev.id})" class="font-headline-md text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors cursor-pointer">${ev.title}</h3>
          <p class="text-xs text-on-surface-variant line-clamp-2 mb-4">${ev.description}</p>
        </div>
      </div>
      <div class="p-6 pt-0 border-t border-outline-variant/10 flex justify-between items-center mt-4">
        <div>
          <span class="text-xs text-on-surface-variant block">From</span>
          <span class="text-xl font-extrabold text-primary">$${ev.price}.00</span>
        </div>
        <button onclick="openTicketModal(${ev.id})" class="brand-gradient-bg text-white px-4 py-2.5 rounded-xl font-label-md text-xs font-bold shadow-md hover:scale-105 transition-transform flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">confirmation_number</span>
          <span>Book Ticket</span>
        </button>
      </div>
    </div>
  `).join("");
}

// Explore Events Filter & Grid Engine
function renderExploreGrid(events) {
  const grid = document.getElementById("explore-events-grid");
  const countEl = document.getElementById("explore-results-count");
  if (!grid) return;

  if (countEl) countEl.innerText = `Showing ${events.length} Event${events.length === 1 ? "" : "s"}`;

  if (events.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <span class="material-symbols-outlined text-5xl text-outline-variant mb-3">event_busy</span>
        <h3 class="font-bold text-lg text-on-surface">No matching events found</h3>
        <p class="text-xs text-on-surface-variant mt-1">Try resetting your category or price filters.</p>
        <button onclick="resetFilters()" class="mt-4 brand-gradient-bg text-white px-5 py-2 rounded-xl text-xs font-bold">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = events.map(ev => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-outline-variant/20 flex flex-col justify-between">
      <div>
        <div class="h-48 overflow-hidden relative">
          <img class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" src="${ev.image}" alt="${ev.title}"/>
          <span class="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-primary shadow-sm">${ev.category}</span>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-3 text-xs text-on-surface-variant mb-2">
            <span class="flex items-center gap-1"><span class="material-symbols-outlined text-xs text-primary">calendar_today</span> ${ev.date}</span>
          </div>
          <h3 onclick="openEventDetails(${ev.id})" class="font-bold text-base text-on-surface hover:text-primary transition-colors cursor-pointer mb-2">${ev.title}</h3>
          <p class="text-xs text-on-surface-variant flex items-center gap-1"><span class="material-symbols-outlined text-xs">location_on</span> ${ev.location}</p>
        </div>
      </div>
      <div class="p-5 pt-0 flex justify-between items-center border-t border-outline-variant/10 mt-3">
        <span class="font-extrabold text-lg text-primary">$${ev.price}</span>
        <button onclick="openTicketModal(${ev.id})" class="brand-gradient-bg text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:scale-105 transition-transform">Book Now</button>
      </div>
    </div>
  `).join("");
}

function applyFilters() {
  const query = document.getElementById("explore-search-input").value.toLowerCase();
  const selectedCat = document.querySelector('input[name="cat-filter"]:checked')?.value || "All";
  const maxPrice = parseInt(document.getElementById("price-slider").value) || 500;
  const location = document.getElementById("location-select").value;
  const sort = document.getElementById("sort-select").value;

  let filtered = eventsData.filter(ev => {
    const matchesQuery = ev.title.toLowerCase().includes(query) || ev.description.toLowerCase().includes(query) || ev.location.toLowerCase().includes(query);
    const matchesCat = selectedCat === "All" || ev.category.toLowerCase().includes(selectedCat.toLowerCase());
    const matchesPrice = ev.price <= maxPrice;
    const matchesLoc = location === "All" || ev.location.includes(location);

    return matchesQuery && matchesCat && matchesPrice && matchesLoc;
  });

  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);

  renderExploreGrid(filtered);
}

function updatePriceSlider(val) {
  document.getElementById("price-slider-val").innerText = `$${val}`;
  applyFilters();
}

function resetFilters() {
  document.getElementById("explore-search-input").value = "";
  document.querySelector('input[name="cat-filter"][value="All"]').checked = true;
  document.getElementById("price-slider").value = 500;
  document.getElementById("price-slider-val").innerText = "$500";
  document.getElementById("location-select").value = "All";
  document.getElementById("sort-select").value = "popular";
  renderExploreGrid(eventsData);
}

function filterCategoryAndNavigate(category) {
  navigateTo('explore');
  setTimeout(() => {
    const radio = document.querySelector(`input[name="cat-filter"][value="${category}"]`) || document.querySelector('input[name="cat-filter"][value="All"]');
    if (radio) radio.checked = true;
    applyFilters();
  }, 100);
}

function handleHeroSearch() {
  const query = document.getElementById("hero-search-query").value;
  navigateTo("explore");
  setTimeout(() => {
    document.getElementById("explore-search-input").value = query;
    applyFilters();
  }, 100);
}

// Single Event Details Page Engine
function openEventDetails(eventId) {
  const ev = eventsData.find(e => e.id === eventId);
  if (!ev) return;

  const container = document.getElementById("event-detail-content");
  container.innerHTML = `
    <div class="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-xl">
      <div class="relative h-80 md:h-96">
        <img class="w-full h-full object-cover" src="${ev.image}" alt="${ev.title}"/>
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div class="absolute bottom-8 left-8 right-8 text-white">
          <span class="px-3 py-1 bg-white/90 backdrop-blur text-primary font-bold text-xs rounded-full mb-3 inline-block">${ev.category}</span>
          <h1 class="font-display-lg text-3xl md:text-5xl font-extrabold leading-tight mb-2">${ev.title}</h1>
          <div class="flex flex-wrap gap-6 text-sm text-gray-200 mt-2">
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary">calendar_today</span> ${ev.date}</span>
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary">location_on</span> ${ev.location}</span>
            <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-primary">groups</span> Organized by ${ev.organizer}</span>
          </div>
        </div>
      </div>

      <div class="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h3 class="font-headline-md text-xl font-bold text-on-surface mb-3">About This Event</h3>
            <p class="text-on-surface-variant text-base leading-relaxed">${ev.description} Experience keynote presentations, exclusive networking sessions, and hands-on workshops guided by world-class leaders.</p>
          </div>

          <div>
            <h3 class="font-headline-md text-xl font-bold text-on-surface mb-3">Event Agenda</h3>
            <div class="space-y-3">
              <div class="p-4 bg-surface rounded-xl border border-outline-variant/20 flex justify-between items-center">
                <div>
                  <span class="text-xs font-bold text-primary">09:00 AM - 10:30 AM</span>
                  <h4 class="font-bold text-sm text-on-surface mt-0.5">Opening Keynote & Future Roadmap</h4>
                </div>
                <span class="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">Main Stage</span>
              </div>
              <div class="p-4 bg-surface rounded-xl border border-outline-variant/20 flex justify-between items-center">
                <div>
                  <span class="text-xs font-bold text-primary">11:00 AM - 01:00 PM</span>
                  <h4 class="font-bold text-sm text-on-surface mt-0.5">Panels & Interactive Workshops</h4>
                </div>
                <span class="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full font-bold">Hall B</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-surface p-6 rounded-2xl border border-outline-variant/30 h-fit space-y-6">
          <div class="flex justify-between items-center">
            <span class="text-sm font-bold text-on-surface-variant">Ticket Price</span>
            <span class="text-3xl font-extrabold text-primary">$${ev.price}.00</span>
          </div>
          <button onclick="openTicketModal(${ev.id})" class="w-full brand-gradient-bg text-white py-4 rounded-xl font-label-md font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
            Book Ticket Now
          </button>
          <div class="text-xs text-on-surface-variant space-y-2 pt-4 border-t border-outline-variant/20">
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-green-600">verified</span> Instant QR Ticket Delivery</div>
            <div class="flex items-center gap-2"><span class="material-symbols-outlined text-green-600">published_with_changes</span> 100% Refundable up to 7 days prior</div>
          </div>
        </div>
      </div>
    </div>
  `;

  navigateTo("event-details");
}

// Ticket Checkout Modal Engine
function openTicketModal(eventId) {
  const ev = eventsData.find(e => e.id === eventId);
  if (!ev) return;

  selectedEventForBooking = ev;
  currentTicketTier = "General";
  currentTicketPrice = ev.price;
  currentTicketQty = 1;

  document.getElementById("modal-event-title").innerText = ev.title;
  document.getElementById("modal-event-date").innerText = `${ev.date} • ${ev.location}`;
  
  selectTicketTier("General", ev.price);

  document.getElementById("ticket-modal").classList.remove("hidden");
}

function closeTicketModal() {
  document.getElementById("ticket-modal").classList.add("hidden");
}

function selectTicketTier(tierName, price) {
  currentTicketTier = tierName;
  currentTicketPrice = price;

  document.querySelectorAll(".ticket-tier-option").forEach(el => el.classList.remove("selected", "border-primary", "bg-primary/5"));

  if (tierName === "General") {
    const el = document.getElementById("tier-general");
    if (el) el.classList.add("selected", "border-primary", "bg-primary/5");
  } else {
    const el = document.getElementById("tier-vip");
    if (el) el.classList.add("selected", "border-primary", "bg-primary/5");
  }

  updateTicketTotal();
}

function adjustQuantity(delta) {
  currentTicketQty = Math.max(1, currentTicketQty + delta);
  document.getElementById("ticket-qty-display").innerText = currentTicketQty;
  updateTicketTotal();
}

function updateTicketTotal() {
  const total = currentTicketPrice * currentTicketQty;
  document.getElementById("ticket-total-display").innerText = `$${total}.00`;
}

function confirmTicketCheckout() {
  if (!selectedEventForBooking) return;

  selectedEventForBooking.ticketsSold += currentTicketQty;
  
  // Update UI Stats
  const statCount = document.getElementById("stat-tickets-count");
  if (statCount) {
    const curr = parseInt(statCount.innerText.replace(",", "")) || 1842;
    statCount.innerText = (curr + currentTicketQty).toLocaleString();
  }

  closeTicketModal();
  showToast(`Successfully booked ${currentTicketQty} ${currentTicketTier} Ticket(s) for ${selectedEventForBooking.title}!`);
  renderDashboardEvents(eventsData);
}

// Organizer Dashboard Engine
function renderDashboardEvents(events) {
  const tbody = document.getElementById("dashboard-events-tbody");
  if (!tbody) return;

  tbody.innerHTML = events.map(ev => `
    <tr class="hover:bg-surface-container/50 transition-colors">
      <td class="p-4 pl-6 font-bold text-on-surface flex items-center gap-3">
        <img class="w-10 h-10 rounded-lg object-cover" src="${ev.image}" alt="${ev.title}"/>
        <span>${ev.title}</span>
      </td>
      <td class="p-4 text-on-surface-variant font-medium">${ev.category}</td>
      <td class="p-4 text-on-surface-variant">${ev.date}</td>
      <td class="p-4 font-bold text-on-surface">${ev.ticketsSold}</td>
      <td class="p-4 font-bold text-primary">$${(ev.ticketsSold * ev.price).toLocaleString()}</td>
      <td class="p-4">
        <span class="px-3 py-1 rounded-full text-xs font-bold ${ev.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">${ev.status}</span>
      </td>
      <td class="p-4 pr-6 text-right space-x-2">
        <button onclick="openEventDetails(${ev.id})" class="text-xs text-primary font-bold hover:underline">View</button>
        <button onclick="toggleEventStatus(${ev.id})" class="text-xs text-on-surface-variant hover:text-on-surface">Toggle Status</button>
      </td>
    </tr>
  `).join("");
}

function filterDashboardEvents() {
  const q = document.getElementById("dashboard-search-event").value.toLowerCase();
  const filtered = eventsData.filter(e => e.title.toLowerCase().includes(q) || e.category.toLowerCase().includes(q));
  renderDashboardEvents(filtered);
}

function toggleEventStatus(id) {
  const ev = eventsData.find(e => e.id === id);
  if (!ev) return;
  ev.status = ev.status === "Published" ? "Draft" : "Published";
  renderDashboardEvents(eventsData);
  showToast(`Updated status for "${ev.title}" to ${ev.status}`);
}

function openCreateEventModal() {
  document.getElementById("create-event-modal").classList.remove("hidden");
}

function closeCreateEventModal() {
  document.getElementById("create-event-modal").classList.add("hidden");
}

function handleCreateEventSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("new-event-title").value;
  const category = document.getElementById("new-event-category").value;
  const price = parseInt(document.getElementById("new-event-price").value) || 99;
  const location = document.getElementById("new-event-location").value;

  const newEv = {
    id: eventsData.length + 1,
    title,
    category,
    price,
    date: "Dec 15, 2026",
    location,
    organizer: currentUser ? currentUser.name : "Organizer",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
    description: `Official ${category} event hosted in ${location}. Registration is now open.`,
    ticketsSold: 0,
    status: "Published"
  };

  eventsData.unshift(newEv);
  closeCreateEventModal();
  renderLandingPageFeatured();
  renderExploreGrid(eventsData);
  renderDashboardEvents(eventsData);

  showToast(`Published new event: "${title}"!`);
}

// Pricing Calculator Toggle
function setBillingCycle(cycle) {
  const btnMonthly = document.getElementById("toggle-monthly");
  const btnAnnual = document.getElementById("toggle-annual");
  const priceProVal = document.getElementById("price-pro-val");

  if (cycle === "annual") {
    btnAnnual.className = "px-5 py-2 rounded-full font-label-md text-sm font-bold bg-white text-primary shadow-sm transition-all flex items-center gap-1";
    btnMonthly.className = "px-5 py-2 rounded-full font-label-md text-sm font-bold text-on-surface-variant hover:text-primary transition-all";
    if (priceProVal) priceProVal.innerText = "$39";
  } else {
    btnMonthly.className = "px-5 py-2 rounded-full font-label-md text-sm font-bold bg-white text-primary shadow-sm transition-all";
    btnAnnual.className = "px-5 py-2 rounded-full font-label-md text-sm font-bold text-on-surface-variant hover:text-primary transition-all flex items-center gap-1";
    if (priceProVal) priceProVal.innerText = "$49";
  }
}

// Form Handlers
function handleContactSubmit(e) {
  e.preventDefault();
  showToast("Support message sent! We will respond within 2 hours.");
  e.target.reset();
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  currentUser = { name: email.split("@")[0], email, role: "Organizer" };
  updateAuthUI();
  showToast(`Welcome back, ${currentUser.name}!`);
  navigateTo("dashboard");
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const role = document.getElementById("signup-role").value;
  currentUser = { name, email, role };
  updateAuthUI();
  showToast(`Account created! Welcome to Eventix, ${name}.`);
  navigateTo("dashboard");
}

function logoutUser() {
  currentUser = null;
  updateAuthUI();
  showToast("Logged out successfully.");
  navigateTo("landing");
}

function updateAuthUI() {
  const loggedOutGroup = document.getElementById("auth-buttons-logged-out");
  const loggedInGroup = document.getElementById("auth-buttons-logged-in");
  const displayName = document.getElementById("user-display-name");

  if (currentUser) {
    if (loggedOutGroup) loggedOutGroup.classList.add("hidden");
    if (loggedInGroup) loggedInGroup.classList.remove("hidden");
    if (displayName) displayName.innerText = currentUser.name;
  } else {
    if (loggedOutGroup) loggedOutGroup.classList.remove("hidden");
    if (loggedInGroup) loggedInGroup.classList.add("hidden");
  }
}
