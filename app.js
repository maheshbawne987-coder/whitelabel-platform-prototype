/**
 * OMNITENANT PLATFORM - CORE CONTROLLER
 * Full-stack multi-tenant dynamic branding, role-based access filtering,
 * interactive API playground, Web Audio synthesizer, and 8-second auto-demo.
 */

// ============================================================================
// 1. TENANT DEFINITIONS & BRAND CONFIGURATIONS
// ============================================================================
const TENANTS = {
  acme: {
    id: 'acme',
    name: 'Acme Industrial',
    portalTag: 'ENTERPRISE SUPPLY & LOGISTICS',
    heroTag: 'ACME HEAVY INDUSTRIES SUITE',
    tagline: 'Heavy Industry Logistics & Enterprise Supply Engine',
    subtitle: 'Cryptographic group filtering, zero-trust partner segregation, and real-time ERP sync for heavy equipment fleets.',
    tokenPrefix: 'acme_sec_live_',
    primaryColor: '#0f172a',
    accentColor: '#f97316',
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>`
  },
  zenith: {
    id: 'zenith',
    name: 'Zenith Health & Bio',
    portalTag: 'CLINICAL GENOMICS ENGINE',
    heroTag: 'ZENITH BIO-INFORMATICS PORTAL',
    tagline: 'Next-Gen Clinical Trials & Bio-Informatics Portal',
    subtitle: 'HIPAA-grade multi-tenant clinical trials matrix, drug-target binding assay repository, and automated FDA submission pipeline.',
    tokenPrefix: 'zenith_sec_live_',
    primaryColor: '#022c22',
    accentColor: '#10b981',
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`
  },
  nexus: {
    id: 'nexus',
    name: 'Nexus AI Systems',
    portalTag: 'NEURAL MESH COMPUTE',
    heroTag: 'NEXUS COGNITIVE CLUSTER',
    tagline: 'Autonomous Agent Clusters & Neural Mesh Compute',
    subtitle: 'Ultra-low-latency distributed GPU clusters, sovereign model weights vault, and autonomous agent coordination bus.',
    tokenPrefix: 'nexus_sec_live_',
    primaryColor: '#1e1b4b',
    accentColor: '#8b5cf6',
    logoSvg: `<svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>`
  }
};

// ============================================================================
// 2. SEED CATALOG DATA (Multi-Tenant with Strict Group Access Levels)
// ============================================================================
const DEFAULT_CATALOG = [
  // --- ACME INDUSTRIAL ---
  {
    id: 'acme-01',
    tenant: 'acme',
    title: 'Standard Hydraulic Pump Assembly (SKU-H900)',
    group: 'public',
    category: 'Heavy Machinery Hardware',
    description: 'Commercial-grade hydraulic pump assembly with open CAD blueprints, public maintenance checklists, and global distributor stock tables.',
    tags: ['Public Spec', 'ISO-9001', 'Heavy Duty'],
    specs: { Clearance: 'Unrestricted', Latency: '4ms', Protocol: 'REST / Modbus' },
    createdAt: '2026-10-15'
  },
  {
    id: 'acme-02',
    tenant: 'acme',
    title: 'Global Multi-Modal Logistics Route Optimizer API',
    group: 'partner',
    category: 'Supply Chain Intelligence',
    description: 'Autonomous dispatch and route optimization algorithm with preferential bulk carrier pricing for certified strategic logistics partners.',
    tags: ['Partner Tier', 'Sub-Second', 'Bulk Freight'],
    specs: { Clearance: 'Strategic Partner', Latency: '12ms', Protocol: 'gRPC / WebSocket' },
    createdAt: '2026-10-18'
  },
  {
    id: 'acme-03',
    tenant: 'acme',
    title: 'ITAR-Restricted Turbine Core Schematics (Project TITAN)',
    group: 'confidential',
    category: 'Defense & Aerospace',
    description: 'Classified military-grade thermal turbine schematics with proprietary tungsten-carbide metallurgy logs. Export strictly regulated under ITAR.',
    tags: ['Confidential', 'ITAR Level 3', 'Executive Only'],
    specs: { Clearance: 'Superadmin Required', Latency: 'Air-Gapped', Protocol: 'mTLS Encrypted' },
    createdAt: '2026-10-22'
  },
  {
    id: 'acme-04',
    tenant: 'acme',
    title: 'Autonomous AGV Telemetry Stream (Plant 04)',
    group: 'partner',
    category: 'Robotics Telemetry',
    description: 'High-frequency telemetry pipeline tracking 240 autonomous mobile robots navigating automated fulfillment centers in real time.',
    tags: ['Partner Tier', 'IoT Fleet', 'MQTT'],
    specs: { Clearance: 'Strategic Partner', Latency: '8ms', Protocol: 'MQTT / Kafka' },
    createdAt: '2026-10-20'
  },

  // --- ZENITH HEALTH & BIO ---
  {
    id: 'zenith-01',
    tenant: 'zenith',
    title: 'Public Clinical Study Cohort Outcomes (Phase I/II)',
    group: 'public',
    category: 'Clinical Trial Registry',
    description: 'De-identified aggregate efficacy reports, cohort demographics, and Kaplan-Meier overall survival metrics approved for academic publishing.',
    tags: ['Public Trial', 'IRB Approved', 'Academic'],
    specs: { Clearance: 'Unrestricted', Latency: '6ms', Protocol: 'HL7 FHIR v4' },
    createdAt: '2026-10-12'
  },
  {
    id: 'zenith-02',
    tenant: 'zenith',
    title: 'Target Molecule Ligand Binding Assay Repository',
    group: 'partner',
    category: 'Drug Discovery Library',
    description: 'High-throughput affinity binding matrices and cryo-EM structural resolution models for co-development pharmaceutical consortium partners.',
    tags: ['Partner Tier', 'Cryo-EM', 'Binding Kd'],
    specs: { Clearance: 'Bio-Pharma Partner', Latency: '15ms', Protocol: 'REST / Arrow' },
    createdAt: '2026-10-19'
  },
  {
    id: 'zenith-03',
    tenant: 'zenith',
    title: 'HIPAA-Protected Germline CRISPR Sequencing Logs',
    group: 'confidential',
    category: 'Patient Phenotype Vault',
    description: 'Raw high-depth FASTQ genomic sequencing datasets and clinical case logs under strict HIPAA Title II and European GDPR health safeguards.',
    tags: ['Confidential', 'HIPAA Strict', 'Germline'],
    specs: { Clearance: 'Superadmin Only', Latency: 'Zero-Knowledge', Protocol: 'Enclave SGX' },
    createdAt: '2026-10-25'
  },
  {
    id: 'zenith-04',
    tenant: 'zenith',
    title: 'Multi-Omics Comparative Cohort Benchmark v3',
    group: 'partner',
    category: 'Bio-Informatics',
    description: 'Integrated RNA-seq expression profiles and epigenetic methylation markers across 10,000 multi-ethnic oncology patient profiles.',
    tags: ['Partner Tier', 'Multi-Omics', 'RNA-Seq'],
    specs: { Clearance: 'Bio-Pharma Partner', Latency: '11ms', Protocol: 'GraphQL' },
    createdAt: '2026-10-24'
  },

  // --- NEXUS AI SYSTEMS ---
  {
    id: 'nexus-01',
    tenant: 'nexus',
    title: 'Open Synthetic Reasoning Benchmark Suite (MMLU-Pro)',
    group: 'public',
    category: 'Model Benchmarking',
    description: 'Public test harnesses, multi-turn reasoning evaluation datasets, and leaderboards across open foundation models.',
    tags: ['Open Benchmark', 'Leaderboard', 'MMLU'],
    specs: { Clearance: 'Unrestricted', Latency: '2ms', Protocol: 'HTTP / JSON' },
    createdAt: '2026-10-14'
  },
  {
    id: 'nexus-02',
    tenant: 'nexus',
    title: 'Sub-Millisecond VIP GPU Inference Gateway (H100)',
    group: 'partner',
    category: 'Cluster Compute',
    description: 'Guaranteed QoS reserved compute nodes with prioritized KV-cache retention and dedicated NVLink tensor routing for enterprise partners.',
    tags: ['Partner Tier', 'H100 NVLink', 'P99 < 12ms'],
    specs: { Clearance: 'Strategic Partner', Latency: '0.8ms', Protocol: 'HTTP/2 Streaming' },
    createdAt: '2026-10-21'
  },
  {
    id: 'nexus-03',
    tenant: 'nexus',
    title: 'Self-Evolving Autonomous Agent Core Weights (v9.4)',
    group: 'confidential',
    category: 'Foundation Model Vault',
    description: 'Top-secret unaligned cognitive architecture model weights with direct multi-modal tool execution primitives and executive kill-switch keys.',
    tags: ['Confidential', 'Core Weights', 'Red-Team Sealed'],
    specs: { Clearance: 'Superadmin Level 5', Latency: 'Hardware Vault', Protocol: 'HSM Crypt' },
    createdAt: '2026-10-26'
  },
  {
    id: 'nexus-04',
    tenant: 'nexus',
    title: 'Domain-Specialized Financial & Legal LoRA Adapters',
    group: 'partner',
    category: 'Enterprise Tuning',
    description: 'Curated rank-64 low-rank adaptation matrices trained on proprietary SEC filings and bilateral cross-border derivative contracts.',
    tags: ['Partner Tier', 'LoRA Rank 64', 'Quantized'],
    specs: { Clearance: 'Strategic Partner', Latency: '3ms', Protocol: 'SafeTensors' },
    createdAt: '2026-10-23'
  }
];

// ============================================================================
// 3. APPLICATION STATE
// ============================================================================
const state = {
  currentTenant: 'acme',
  currentRole: 'superadmin', // 'superadmin' | 'vip' | 'standard'
  filterGroup: 'all',        // 'all' | 'public' | 'partner' | 'confidential'
  searchQuery: '',
  hideRestricted: false,
  soundEnabled: true,
  isAutoDemoRunning: false,
  backendMode: 'standalone', // 'standalone' | 'online'
  backendUrl: 'http://localhost:8000',
  catalog: []
};

// ============================================================================
// 4. WEB AUDIO SYNTHESIZER (ZERO EXTERNAL ASSETS)
// ============================================================================
class SynthAudio {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  play(type) {
    if (!state.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'click') {
        // High crisp subtle pip
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'tenantSwitch') {
        // Futuristic whoosh shimmer sweep
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.16);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'roleChange') {
        // Smooth two-tone chord
        [440, 660].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.03);
          gain.gain.setValueAtTime(0.09, now + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.03 + 0.12);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.03);
          osc.stop(now + idx * 0.03 + 0.12);
        });
      } else if (type === 'apiPing') {
        // Processing pulse
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        // Bright major triad arpeggio (C5 -> E5 -> G5)
        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.09, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + idx * 0.05 + 0.2);
        });
      } else if (type === 'denied') {
        // Warning buzz (double short low tone)
        [180, 150].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.06, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.07);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.07);
        });
      } else if (type === 'demoFanfare') {
        // 5-note celebratory arpeggio
        const fanfare = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        fanfare.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.1, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.35);
        });
      }
    } catch (e) {
      // Audio context error fallback silently
    }
  }
}

const sound = new SynthAudio();

// ============================================================================
// 5. DOM ELEMENTS
// ============================================================================
const dom = {
  body: document.body,
  tenantSelect: document.getElementById('tenantSelect'),
  roleSelect: document.getElementById('roleSelect'),
  brandContainer: document.getElementById('brandContainer'),
  brandLogoWrapper: document.getElementById('brandLogoWrapper'),
  brandName: document.getElementById('brandName'),
  brandPortalTag: document.getElementById('brandPortalTag'),
  heroTenantTag: document.getElementById('heroTenantTag'),
  heroRolePill: document.getElementById('heroRolePill'),
  heroRoleName: document.getElementById('heroRoleName'),
  heroTitle: document.getElementById('heroTitle'),
  heroSubtitle: document.getElementById('heroSubtitle'),
  roleNoticeBanner: document.getElementById('roleNoticeBanner'),
  itemsGrid: document.getElementById('itemsGrid'),
  emptyState: document.getElementById('emptyState'),
  searchInput: document.getElementById('searchInput'),
  btnClearSearch: document.getElementById('btnClearSearch'),
  filterChips: document.querySelectorAll('.chip'),
  toggleHideRestricted: document.getElementById('toggleHideRestricted'),
  btnCreateItem: document.getElementById('btnCreateItem'),
  btnAutoDemo: document.getElementById('btnAutoDemo'),
  btnToggleSound: document.getElementById('btnToggleSound'),
  soundIcon: document.getElementById('soundIcon'),
  backendStatusPill: document.getElementById('backendStatusPill'),
  backendStatusLabel: document.getElementById('backendStatusLabel'),
  demoProgressBar: document.getElementById('demoProgressBar'),
  demoProgressFill: document.getElementById('demoProgressFill'),
  metricTotal: document.getElementById('metricTotal'),
  metricAccessible: document.getElementById('metricAccessible'),
  metricRestricted: document.getElementById('metricRestricted'),
  metricLatency: document.getElementById('metricLatency'),
  countAll: document.getElementById('countAll'),
  countPublic: document.getElementById('countPublic'),
  countPartner: document.getElementById('countPartner'),
  countConfidential: document.getElementById('countConfidential'),
  
  // API Drawer
  apiDrawer: document.getElementById('apiDrawer'),
  drawerBackdrop: document.getElementById('drawerBackdrop'),
  btnToggleApiDrawer: document.getElementById('btnToggleApiDrawer'),
  btnCloseApiDrawer: document.getElementById('btnCloseApiDrawer'),
  apiBearerToken: document.getElementById('apiBearerToken'),
  btnCopyToken: document.getElementById('btnCopyToken'),
  btnGenNewToken: document.getElementById('btnGenNewToken'),
  tokenRoleScope: document.getElementById('tokenRoleScope'),
  tokenTenantScope: document.getElementById('tokenTenantScope'),
  apiMethod: document.getElementById('apiMethod'),
  apiGroupParam: document.getElementById('apiGroupParam'),
  apiEndpointUrl: document.getElementById('apiEndpointUrl'),
  btnSendApiRequest: document.getElementById('btnSendApiRequest'),
  btnCopyCurl: document.getElementById('btnCopyCurl'),
  apiSpinner: document.getElementById('apiSpinner'),
  apiStatusPill: document.getElementById('apiStatusPill'),
  apiLatencyPill: document.getElementById('apiLatencyPill'),
  apiJsonViewer: document.getElementById('apiJsonViewer'),
  curlCommandPreview: document.getElementById('curlCommandPreview'),

  // Modal
  createItemModal: document.getElementById('createItemModal'),
  btnCloseCreateModal: document.getElementById('btnCloseCreateModal'),
  btnCancelCreate: document.getElementById('btnCancelCreate'),
  createItemForm: document.getElementById('createItemForm'),
  newItemTenant: document.getElementById('newItemTenant'),
  newItemTitle: document.getElementById('newItemTitle'),
  newItemGroup: document.getElementById('newItemGroup'),
  newItemCategory: document.getElementById('newItemCategory'),
  newItemDescription: document.getElementById('newItemDescription'),
  newItemTags: document.getElementById('newItemTags'),
  
  toastContainer: document.getElementById('toastContainer')
};

// ============================================================================
// 6. INITIALIZATION & STORAGE
// ============================================================================
function initApp() {
  loadStoredData();
  applyTenantTheme(state.currentTenant, false);
  applyRolePermissions(state.currentRole, false);
  checkBackendHealth();
  updateApiPlaygroundInputs();
  bindEventListeners();
  renderCatalog();
}

function loadStoredData() {
  const localCatalog = localStorage.getItem('omni_catalog_v1');
  if (localCatalog) {
    try {
      state.catalog = JSON.parse(localCatalog);
    } catch (e) {
      state.catalog = [...DEFAULT_CATALOG];
    }
  } else {
    state.catalog = [...DEFAULT_CATALOG];
    persistCatalog();
  }

  const storedSound = localStorage.getItem('omni_sound_enabled');
  if (storedSound !== null) {
    state.soundEnabled = storedSound === 'true';
    dom.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  }
}

function persistCatalog() {
  localStorage.setItem('omni_catalog_v1', JSON.stringify(state.catalog));
}

// ============================================================================
// 7. MULTI-TENANT DYNAMIC RE-THEMING
// ============================================================================
function applyTenantTheme(tenantId, playSound = true) {
  const tenant = TENANTS[tenantId] || TENANTS.acme;
  state.currentTenant = tenant.id;

  // 1. Immediately update CSS variable host attribute on <body>
  dom.body.setAttribute('data-tenant', tenant.id);
  dom.tenantSelect.value = tenant.id;

  // 2. Update brand identity & text in real-time without page reload
  dom.brandName.textContent = tenant.name;
  dom.brandPortalTag.textContent = tenant.portalTag;
  dom.brandLogoWrapper.innerHTML = tenant.logoSvg;
  dom.heroTenantTag.textContent = tenant.heroTag;
  dom.heroTitle.textContent = tenant.tagline;
  dom.heroSubtitle.textContent = tenant.subtitle;

  // 3. Update token scopes in API Drawer
  dom.tokenTenantScope.textContent = tenant.id;
  generateBearerToken();
  updateApiEndpointDisplay();

  if (playSound) {
    sound.play('tenantSwitch');
    showToast(`🏢 Switched to tenant: ${tenant.name}`, 'success');
  }

  renderCatalog();
}

// ============================================================================
// 8. ROLE-BASED ACCESS CONTROL (SUPERADMIN vs VIP vs STANDARD)
// ============================================================================
function applyRolePermissions(role, playSound = true) {
  state.currentRole = role;
  dom.body.setAttribute('data-role', role);
  dom.roleSelect.value = role;

  // Update Hero Role Pill
  const roleDisplayNames = {
    superadmin: 'Platform Superadmin (Clearance: Full)',
    vip: 'VIP / Strategic Partner Tier',
    standard: 'Standard Client Tier (Restricted)'
  };
  dom.heroRoleName.textContent = roleDisplayNames[role] || role;

  // Render role notice banner explaining permissions clearly
  renderRoleNoticeBanner(role);

  // Update Admin Create Button visibility/disabled state
  if (role === 'superadmin') {
    dom.btnCreateItem.style.display = 'inline-flex';
    dom.btnCreateItem.removeAttribute('disabled');
  } else {
    dom.btnCreateItem.style.display = 'none';
  }

  // Update Token Role Scope in API Playground
  dom.tokenRoleScope.textContent = role;
  generateBearerToken();
  updateApiEndpointDisplay();

  if (playSound) {
    sound.play('roleChange');
    showToast(`🛡️ Active Role: ${role.toUpperCase()}`, 'warning');
  }

  renderCatalog();
}

function renderRoleNoticeBanner(role) {
  dom.roleNoticeBanner.className = `role-notice-banner ${role}`;
  if (role === 'superadmin') {
    dom.roleNoticeBanner.innerHTML = `
      <div>
        <strong>🛡️ Platform Superadmin Mode Active:</strong> You possess unrestricted root clearance. You can inspect all catalog items (Public, Partner, Confidential), inline reassign item group access levels, and publish new multi-tenant resources.
      </div>
      <span class="active-role-pill"><strong>UNRESTRICTED</strong></span>
    `;
  } else if (role === 'vip') {
    dom.roleNoticeBanner.innerHTML = `
      <div>
        <strong>⭐ VIP / Strategic Partner Tier Active:</strong> You have authorized clearance for Public and Strategic Partner resources. Confidential executive items remain securely encrypted behind Level 3 clearance locks.
      </div>
      <span class="active-role-pill"><strong>TIER 2 ACCESS</strong></span>
    `;
  } else {
    dom.roleNoticeBanner.innerHTML = `
      <div>
        <strong>👤 Standard Client Tier Active:</strong> You are browsing public catalog resources. Strategic partner datasets and internal schematics are restricted. Upgrade your tier to unlock partner APIs.
      </div>
      <span class="active-role-pill"><strong>TIER 1 (PUBLIC ONLY)</strong></span>
    `;
  }
}

// Checks if current user role can access the item's group
function isItemAccessible(itemGroup, userRole) {
  if (userRole === 'superadmin') return true;
  if (userRole === 'vip') {
    return itemGroup === 'public' || itemGroup === 'partner';
  }
  if (userRole === 'standard') {
    return itemGroup === 'public';
  }
  return false;
}

// ============================================================================
// 9. CATALOG RENDERING & GROUP ITEM FILTERING
// ============================================================================
function renderCatalog() {
  const query = state.searchQuery.trim().toLowerCase();
  
  // Filter by active tenant
  let tenantItems = state.catalog.filter(item => item.tenant === state.currentTenant);

  // Compute counts for the active tenant
  const totalCount = tenantItems.length;
  const publicCount = tenantItems.filter(i => i.group === 'public').length;
  const partnerCount = tenantItems.filter(i => i.group === 'partner').length;
  const confCount = tenantItems.filter(i => i.group === 'confidential').length;

  dom.countAll.textContent = totalCount;
  dom.countPublic.textContent = publicCount;
  dom.countPartner.textContent = partnerCount;
  dom.countConfidential.textContent = confCount;

  // Filter by Group Chip
  if (state.filterGroup !== 'all') {
    tenantItems = tenantItems.filter(item => item.group === state.filterGroup);
  }

  // Filter by Search Query
  if (query) {
    tenantItems = tenantItems.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchCat = item.category.toLowerCase().includes(query);
      const matchTags = item.tags.some(t => t.toLowerCase().includes(query));
      return matchTitle || matchDesc || matchCat || matchTags;
    });
  }

  // Calculate accessibility metrics
  let accessibleCount = 0;
  let restrictedCount = 0;

  tenantItems.forEach(item => {
    if (isItemAccessible(item.group, state.currentRole)) {
      accessibleCount++;
    } else {
      restrictedCount++;
    }
  });

  dom.metricTotal.textContent = totalCount;
  dom.metricAccessible.textContent = accessibleCount;
  dom.metricRestricted.textContent = restrictedCount;

  // Optional: Hide locked items if toggle enabled
  let displayItems = tenantItems;
  if (state.hideRestricted) {
    displayItems = tenantItems.filter(item => isItemAccessible(item.group, state.currentRole));
  }

  // Render Grid
  dom.itemsGrid.innerHTML = '';
  if (displayItems.length === 0) {
    dom.emptyState.style.display = 'block';
  } else {
    dom.emptyState.style.display = 'none';
    displayItems.forEach(item => {
      const card = createItemCardElement(item);
      dom.itemsGrid.appendChild(card);
    });
  }
}

function createItemCardElement(item) {
  const card = document.createElement('article');
  card.className = 'item-card';
  card.setAttribute('data-id', item.id);
  card.setAttribute('data-group', item.group);

  const isAccessible = isItemAccessible(item.group, state.currentRole);

  // Group Badge Formatting
  const badgeMeta = {
    public: { label: '🌐 PUBLIC', class: 'public' },
    partner: { label: '⭐ PARTNER ONLY', class: 'partner' },
    confidential: { label: '🔒 CONFIDENTIAL', class: 'confidential' }
  }[item.group] || { label: item.group.toUpperCase(), class: 'public' };

  // Generate Specs HTML
  let specsHtml = '';
  if (item.specs) {
    specsHtml = `
      <div class="item-specs">
        ${Object.entries(item.specs).map(([k, v]) => `
          <div class="spec-entry">
            <span class="spec-k">${escapeHtml(k)}</span>
            <span class="spec-v">${escapeHtml(v)}</span>
          </div>
        `).join('')}
      </div>
    `;
  }

  // Generate Tags HTML
  let tagsHtml = '';
  if (item.tags && item.tags.length > 0) {
    tagsHtml = `
      <div class="item-tags">
        ${item.tags.map(t => `<span class="tag-pill">#${escapeHtml(t)}</span>`).join('')}
      </div>
    `;
  }

  // Superadmin Inline Controls
  let adminFooterHtml = '';
  if (state.currentRole === 'superadmin') {
    adminFooterHtml = `
      <div class="item-card-footer">
        <div class="admin-group-assigner">
          <label for="assignGroup-${item.id}">Access Tier:</label>
          <select class="admin-group-select" id="assignGroup-${item.id}" data-item-id="${item.id}">
            <option value="public" ${item.group === 'public' ? 'selected' : ''}>Public</option>
            <option value="partner" ${item.group === 'partner' ? 'selected' : ''}>Partner VIP</option>
            <option value="confidential" ${item.group === 'confidential' ? 'selected' : ''}>Confidential</option>
          </select>
        </div>
        <button class="btn-card-delete" data-delete-id="${item.id}" title="Delete Item">
          <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    `;
  }

  // Lock Overlay (When unauthorized tier views restricted items)
  let lockOverlayHtml = '';
  if (!isAccessible) {
    const isVipRestricted = state.currentRole === 'vip' && item.group === 'confidential';
    const title = isVipRestricted ? 'Executive Level 3 Required' : 'Strategic Partner Tier Required';
    const message = isVipRestricted 
      ? 'This resource is sealed under executive protocol. Submit an escalation request for elevated clearance.'
      : 'This resource is reserved for Strategic Partners. Upgrade tier to inspect specs and run telemetry.';
    const actionLabel = isVipRestricted ? 'Request Access Escalation' : 'Simulate Tier Upgrade';

    lockOverlayHtml = `
      <div class="card-lock-overlay">
        <div class="lock-shield-icon">🔒</div>
        <h4 class="lock-overlay-title">${title}</h4>
        <p class="lock-overlay-msg">${message}</p>
        <button class="btn-request-access" data-action="${isVipRestricted ? 'escalate' : 'upgrade'}" data-item-id="${item.id}">
          ${actionLabel}
        </button>
      </div>
    `;
  }

  card.innerHTML = `
    ${lockOverlayHtml}
    <div class="item-card-header">
      <span class="access-badge ${badgeMeta.class}">${badgeMeta.label}</span>
      <span class="item-category-tag">${escapeHtml(item.category)}</span>
    </div>
    <h3 class="item-title">${escapeHtml(item.title)}</h3>
    <p class="item-description">${escapeHtml(item.description)}</p>
    ${specsHtml}
    ${tagsHtml}
    ${adminFooterHtml}
  `;

  return card;
}

// ============================================================================
// 10. INTERACTIVE API PLAYGROUND & CURL EXPLORER
// ============================================================================
function generateBearerToken() {
  const tenant = TENANTS[state.currentTenant] || TENANTS.acme;
  const hash = Math.random().toString(36).substring(2, 10);
  const token = `${tenant.tokenPrefix}${state.currentRole}_${hash}`;
  dom.apiBearerToken.value = token;
  updateCurlCommand();
  return token;
}

function updateApiPlaygroundInputs() {
  updateApiEndpointDisplay();
  updateCurlCommand();
}

function updateApiEndpointDisplay() {
  const method = dom.apiMethod.value;
  const group = dom.apiGroupParam.value;
  const tenantId = state.currentTenant;
  const path = `/api/v1/${tenantId}/items?group=${group}`;
  dom.apiEndpointUrl.textContent = path;
  dom.documentHttpBadge = dom.apiDrawer.querySelector('.http-badge');
  if (dom.documentHttpBadge) {
    dom.documentHttpBadge.textContent = method;
  }
  updateCurlCommand();
}

function updateCurlCommand() {
  const method = dom.apiMethod.value;
  const group = dom.apiGroupParam.value;
  const tenantId = state.currentTenant;
  const token = dom.apiBearerToken.value;
  const baseUrl = state.backendMode === 'online' ? state.backendUrl : 'https://api.omnicatalog.io';
  
  let curl = `curl -X ${method} "${baseUrl}/v1/${tenantId}/items?group=${group}" \\\n`;
  curl += `  -H "Authorization: Bearer ${token}" \\\n`;
  curl += `  -H "X-Tenant-ID: ${tenantId}" \\\n`;
  curl += `  -H "X-User-Role: ${state.currentRole}" \\\n`;
  curl += `  -H "Accept: application/json"`;

  if (method === 'POST') {
    curl += ` \\\n  -H "Content-Type: application/json" \\\n`;
    curl += `  -d '{"title": "Sample Resource", "group": "partner", "category": "Telemetry"}'`;
  }

  dom.curlCommandPreview.textContent = curl;
}

async function executeApiRequest() {
  sound.play('apiPing');
  dom.apiSpinner.classList.add('spinning');
  dom.btnSendApiRequest.setAttribute('disabled', 'true');
  
  const startTime = performance.now();
  const groupParam = dom.apiGroupParam.value;
  const method = dom.apiMethod.value;
  const tenantId = state.currentTenant;
  const token = dom.apiBearerToken.value;

  try {
    let responseData;
    let statusCode = 200;
    let statusText = 'OK';

    if (state.backendMode === 'online') {
      // Execute against live Python REST backend
      const res = await fetch(`${state.backendUrl}/api/v1/${tenantId}/items?group=${groupParam}`, {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': tenantId,
          'X-User-Role': state.currentRole,
          'Content-Type': 'application/json'
        }
      });
      statusCode = res.status;
      statusText = res.statusText || (statusCode === 200 ? 'OK' : 'Error');
      responseData = await res.json();
    } else {
      // High-Fidelity Client-Side Sandbox Simulation (100% Standalone for GitHub Pages)
      await new Promise(r => setTimeout(r, 80)); // Realistic network latency

      // Check role permissions: Standard client querying confidential returns 403 Forbidden
      if (state.currentRole === 'standard' && (groupParam === 'confidential' || groupParam === 'partner')) {
        statusCode = 403;
        statusText = 'FORBIDDEN';
        responseData = {
          type: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
          title: 'Forbidden Access - Group Clearance Denied',
          status: 403,
          detail: `Role '${state.currentRole}' lacks clearance to query items in group '${groupParam}'. Upgrade to 'vip' or 'superadmin'.`,
          instance: `/api/v1/${tenantId}/items?group=${groupParam}`,
          timestamp: new Date().toISOString()
        };
      } else if (state.currentRole === 'vip' && groupParam === 'confidential') {
        statusCode = 403;
        statusText = 'FORBIDDEN';
        responseData = {
          type: 'https://tools.ietf.org/html/rfc7231#section-6.5.3',
          title: 'Forbidden Access - Executive Clearance Required',
          status: 403,
          detail: `Confidential resources require 'superadmin' root clearance. Strategic Partner role is insufficient.`,
          instance: `/api/v1/${tenantId}/items?group=${groupParam}`,
          timestamp: new Date().toISOString()
        };
      } else {
        // Return filtered items matching tenant & role constraints
        let filtered = state.catalog.filter(i => i.tenant === tenantId);
        if (groupParam !== 'all') {
          filtered = filtered.filter(i => i.group === groupParam);
        } else {
          // If role is restricted, exclude items they cannot see from payload
          filtered = filtered.filter(i => isItemAccessible(i.group, state.currentRole));
        }

        statusCode = 200;
        statusText = 'OK';
        responseData = {
          status: 'success',
          tenant: tenantId,
          roleScope: state.currentRole,
          groupQuery: groupParam,
          total: filtered.length,
          page: 1,
          limit: 10,
          meta: {
            cache: 'HIT-EDGE-L3',
            latencyMs: 18,
            server: 'OmniTenant Core / Python Microservice'
          },
          data: filtered
        };
      }
    }

    const elapsed = Math.round(performance.now() - startTime);
    dom.apiLatencyPill.textContent = `${elapsed}ms`;
    dom.metricLatency.textContent = `${elapsed}ms`;

    dom.apiStatusPill.textContent = `${statusCode} ${statusText}`;
    dom.apiStatusPill.className = `status-code-pill ${statusCode === 200 ? 'status-200' : 'status-403'}`;

    dom.apiJsonViewer.textContent = JSON.stringify(responseData, null, 2);

    if (statusCode === 200) {
      sound.play('success');
      showToast(`API Query Successful (${elapsed}ms)`, 'success');
    } else {
      sound.play('denied');
      showToast(`API Response: 403 Forbidden (Blocked by Group Tier)`, 'denied');
    }
  } catch (err) {
    dom.apiStatusPill.textContent = '500 ERROR';
    dom.apiStatusPill.className = 'status-code-pill status-403';
    dom.apiJsonViewer.textContent = JSON.stringify({ error: err.message }, null, 2);
    sound.play('denied');
  } finally {
    dom.apiSpinner.classList.remove('spinning');
    dom.btnSendApiRequest.removeAttribute('disabled');
  }
}

// ============================================================================
// 11. DUAL-MODE BACKEND HEALTH CHECK
// ============================================================================
async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1200);
    
    // Check local server or relative API
    const res = await fetch(`${state.backendUrl}/api/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      state.backendMode = 'online';
      dom.backendStatusPill.className = 'backend-pill online';
      dom.backendStatusLabel.textContent = 'Python Server Online';
      dom.backendStatusPill.setAttribute('title', `Connected to backend at ${state.backendUrl} (${data.version || 'v1.0'})`);
      return;
    }
  } catch (e) {
    // Offline / Standalone
  }

  state.backendMode = 'standalone';
  dom.backendStatusPill.className = 'backend-pill standalone';
  dom.backendStatusLabel.textContent = 'CDN Sandbox Ready';
  dom.backendStatusPill.setAttribute('title', 'Running standalone with browser client store. Click to retry connecting to local server.');
}

// ============================================================================
// 12. ⚡ 8-SECOND AUTO-DEMO MODE
// ============================================================================
async function runAutoDemo() {
  if (state.isAutoDemoRunning) return;
  state.isAutoDemoRunning = true;
  sound.play('click');

  dom.btnAutoDemo.classList.add('active');
  dom.demoProgressBar.classList.add('active');
  dom.demoProgressFill.style.width = '0%';

  showToast('⚡ Starting 8-Second Guided Multi-Tenant Demo...', 'success');

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const updateProgress = (pct) => { dom.demoProgressFill.style.width = `${pct}%`; };

  try {
    // Step 1: Acme Industrial + Public View (0s - 1.5s)
    updateProgress(10);
    applyTenantTheme('acme', true);
    applyRolePermissions('standard', false);
    dom.filterChips[0].click();
    await sleep(1400);

    // Step 2: Switch to VIP Partner Role (1.5s - 3.0s)
    updateProgress(30);
    applyRolePermissions('vip', true);
    showToast('⭐ Switched to VIP Partner Tier (Access Unlocked)', 'warning');
    await sleep(1400);

    // Step 3: Open API Playground & Query Partner Data (3.0s - 4.5s)
    updateProgress(50);
    openApiDrawer();
    dom.apiGroupParam.value = 'partner';
    updateApiEndpointDisplay();
    await executeApiRequest();
    await sleep(1300);

    // Step 4: Switch to Zenith Health & Bio (4.5s - 6.0s)
    updateProgress(70);
    applyTenantTheme('zenith', true);
    showToast('🧬 Switched to Zenith Health & Bio Theme', 'success');
    await sleep(1300);

    // Step 5: Switch to Platform Superadmin (6.0s - 7.2s)
    updateProgress(85);
    applyRolePermissions('superadmin', true);
    showToast('🛡️ Platform Superadmin Activated (Full Catalog)', 'success');
    await sleep(1200);

    // Step 6: Switch to Nexus AI Systems & Final Celebration (7.2s - 8.2s)
    updateProgress(100);
    applyTenantTheme('nexus', true);
    closeApiDrawer();
    sound.play('demoFanfare');
    showToast('🎉 Multi-Tenant Guided Demo Complete! Fully interactive.', 'success');
  } finally {
    await sleep(400);
    dom.demoProgressBar.classList.remove('active');
    dom.btnAutoDemo.classList.remove('active');
    state.isAutoDemoRunning = false;
  }
}

// ============================================================================
// 13. DRAWER & MODAL MANAGEMENT
// ============================================================================
function openApiDrawer() {
  sound.play('click');
  dom.apiDrawer.classList.add('open');
  dom.drawerBackdrop.classList.add('active');
  dom.apiDrawer.setAttribute('aria-hidden', 'false');
  updateApiPlaygroundInputs();
}

function closeApiDrawer() {
  sound.play('click');
  dom.apiDrawer.classList.remove('open');
  dom.drawerBackdrop.classList.remove('active');
  dom.apiDrawer.setAttribute('aria-hidden', 'true');
}

function openCreateModal() {
  sound.play('click');
  dom.createItemModal.classList.add('active');
  dom.newItemTenant.value = state.currentTenant;
  dom.newItemTitle.focus();
}

function closeCreateModal() {
  sound.play('click');
  dom.createItemModal.classList.remove('active');
  dom.createItemForm.reset();
}

// ============================================================================
// 14. TOAST NOTIFICATIONS & UTILITIES
// ============================================================================
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? '✓' : (type === 'warning' ? '⚡' : '🔒');
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${escapeHtml(message)}</span>`;
  
  dom.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[m]));
}

async function copyToClipboard(text, successMsg) {
  try {
    await navigator.clipboard.writeText(text);
    sound.play('click');
    showToast(successMsg, 'success');
  } catch (err) {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    sound.play('click');
    showToast(successMsg, 'success');
  }
}

// ============================================================================
// 15. EVENT LISTENERS
// ============================================================================
function bindEventListeners() {
  // Tenant Switcher
  dom.tenantSelect.addEventListener('change', (e) => {
    applyTenantTheme(e.target.value);
  });

  // Role Switcher
  dom.roleSelect.addEventListener('change', (e) => {
    applyRolePermissions(e.target.value);
  });

  // Search input
  dom.searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    dom.btnClearSearch.classList.toggle('visible', !!state.searchQuery);
    renderCatalog();
  });

  dom.btnClearSearch.addEventListener('click', () => {
    dom.searchInput.value = '';
    state.searchQuery = '';
    dom.btnClearSearch.classList.remove('visible');
    renderCatalog();
  });

  // Group Filter Chips
  dom.filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      dom.filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.filterGroup = chip.dataset.filter;
      sound.play('click');
      renderCatalog();
    });
  });

  // Toggle Hide Locked Items
  dom.toggleHideRestricted.addEventListener('change', (e) => {
    state.hideRestricted = e.target.checked;
    sound.play('click');
    renderCatalog();
  });

  // Reset Filters button in Empty State
  const btnReset = document.getElementById('btnResetFilters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.searchQuery = '';
      dom.searchInput.value = '';
      dom.btnClearSearch.classList.remove('visible');
      state.filterGroup = 'all';
      dom.filterChips.forEach(c => c.classList.toggle('active', c.dataset.filter === 'all'));
      state.hideRestricted = false;
      dom.toggleHideRestricted.checked = false;
      renderCatalog();
    });
  }

  // Auto-Demo Button
  dom.btnAutoDemo.addEventListener('click', runAutoDemo);

  // Sound Synthesizer Toggle
  dom.btnToggleSound.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    localStorage.setItem('omni_sound_enabled', state.soundEnabled);
    dom.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    if (state.soundEnabled) sound.play('click');
    showToast(state.soundEnabled ? 'Audio Feedback Enabled' : 'Audio Muted', 'warning');
  });

  // Backend Status Pill Click (Re-test connection)
  dom.backendStatusPill.addEventListener('click', async () => {
    showToast('Testing connection to local Python backend...', 'warning');
    await checkBackendHealth();
    showToast(state.backendMode === 'online' ? 'Python Backend Online' : 'Operating in Standalone CDN Mode', 'success');
  });

  // API Drawer Controls
  dom.btnToggleApiDrawer.addEventListener('click', openApiDrawer);
  dom.btnCloseApiDrawer.addEventListener('click', closeApiDrawer);
  dom.drawerBackdrop.addEventListener('click', closeApiDrawer);

  dom.apiMethod.addEventListener('change', updateApiEndpointDisplay);
  dom.apiGroupParam.addEventListener('change', updateApiEndpointDisplay);

  dom.btnGenNewToken.addEventListener('click', () => {
    sound.play('click');
    generateBearerToken();
    showToast('New Bearer Token Generated', 'success');
  });

  dom.btnCopyToken.addEventListener('click', () => {
    copyToClipboard(dom.apiBearerToken.value, 'Bearer Token copied to clipboard');
  });

  dom.btnSendApiRequest.addEventListener('click', executeApiRequest);

  dom.btnCopyCurl.addEventListener('click', () => {
    copyToClipboard(dom.curlCommandPreview.textContent, 'cURL command copied to clipboard');
  });

  // Modal Controls
  dom.btnCreateItem.addEventListener('click', openCreateModal);
  dom.btnCloseCreateModal.addEventListener('click', closeCreateModal);
  dom.btnCancelCreate.addEventListener('click', closeCreateModal);

  dom.createItemForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newItem = {
      id: `${dom.newItemTenant.value}-${Date.now().toString(36)}`,
      tenant: dom.newItemTenant.value,
      title: dom.newItemTitle.value.trim(),
      group: dom.newItemGroup.value,
      category: dom.newItemCategory.value.trim() || 'General Resource',
      description: dom.newItemDescription.value.trim(),
      tags: dom.newItemTags.value.split(',').map(t => t.trim()).filter(Boolean),
      specs: { Clearance: dom.newItemGroup.value.toUpperCase(), Latency: '5ms', Protocol: 'REST API' },
      createdAt: new Date().toISOString().split('T')[0]
    };

    state.catalog.unshift(newItem);
    persistCatalog();
    closeCreateModal();
    sound.play('success');
    showToast(`Published catalog item: "${newItem.title}"`, 'success');
    renderCatalog();
  });

  // Item Card Delegated Actions (Group Assignment, Delete, Lock Overlay Request)
  dom.itemsGrid.addEventListener('change', (e) => {
    if (e.target.classList.contains('admin-group-select')) {
      const itemId = e.target.dataset.itemId;
      const newGroup = e.target.value;
      const targetItem = state.catalog.find(i => i.id === itemId);
      if (targetItem) {
        targetItem.group = newGroup;
        persistCatalog();
        sound.play('click');
        showToast(`Item tier updated to: ${newGroup.toUpperCase()}`, 'success');
        renderCatalog();
      }
    }
  });

  dom.itemsGrid.addEventListener('click', (e) => {
    // Delete Item
    const deleteBtn = e.target.closest('.btn-card-delete');
    if (deleteBtn) {
      const itemId = deleteBtn.dataset.deleteId;
      state.catalog = state.catalog.filter(i => i.id !== itemId);
      persistCatalog();
      sound.play('click');
      showToast('Item deleted from catalog', 'warning');
      renderCatalog();
      return;
    }

    // Lock Overlay Action (Escalation / Upgrade simulation)
    const accessBtn = e.target.closest('.btn-request-access');
    if (accessBtn) {
      const action = accessBtn.dataset.action;
      if (action === 'escalate') {
        sound.play('click');
        showToast('🔒 Escalation request transmitted to Superadmin compliance officers.', 'warning');
      } else {
        // Upgrade simulation -> switch role to VIP
        sound.play('success');
        showToast('⭐ Simulating tier activation: Upgraded to VIP Partner!', 'success');
        applyRolePermissions('vip');
      }
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore when typing inside inputs
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    if (e.key === 'd' || e.key === 'D') {
      runAutoDemo();
    } else if (e.key === 'a' || e.key === 'A') {
      if (dom.apiDrawer.classList.contains('open')) {
        closeApiDrawer();
      } else {
        openApiDrawer();
      }
    } else if (e.key === 'm' || e.key === 'M') {
      dom.btnToggleSound.click();
    } else if (e.key === 'Escape') {
      closeApiDrawer();
      closeCreateModal();
    }
  });
}

// Start application on DOM Ready
document.addEventListener('DOMContentLoaded', initApp);
