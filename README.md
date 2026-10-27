# OmniTenant: Enterprise Multi-Tenant White-Label Platform & API Gateway

A modern, high-performance white-label platform architecture featuring **live dynamic branding**, **granular role-based catalog filtering (RBAC)**, **interactive REST API explorer**, and **hardened security defenses**.

[![Live Interactive Demo](https://img.shields.io/badge/Demo-Live_Interactive_Platform-06b6d4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://maheshbawne987-coder.github.io/whitelabel-platform-prototype/)
[![Security: Hardened](https://img.shields.io/badge/Security-FIPS%20%2F%20OWASP%20Hardened-emerald?style=for-the-badge)](hacker_security_test.py)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

---

## 🌟 Key Architecture & Features

### 1. 🎨 Dynamic Multi-Tenant White-Label Theming
- Switch instantaneously between real-world corporate tenants (*Acme Industrial*, *Zenith Health & Bio*, *Nexus AI Systems*).
- Brand logos, typography, accent gradients, and CSS variables adapt dynamically with zero page reload.

### 2. 🔐 Role-Based Catalog Filtering (RBAC)
- Strict multi-group item segregation:
  - **Platform Superadmin**: Full catalog oversight, permission configuration, and confidential resource inspection.
  - **VIP Strategic Partner**: Access to shared and partner-tier data with sub-second SLA guarantees.
  - **Standard Client Tier**: Restricted view strictly sequestered from confidential and partner-only records.
- Zero cross-tenant data leakage.

### 3. ⚡ Interactive REST API Playground & Explorer
- Dedicated developer drawer allowing partners to generate Bearer tokens, query `/api/v1/{tenant}/items`, inspect real-time JSON responses, and copy ready-to-run cURL commands.

### 4. 🛡️ Defense-in-Depth Security
- **Anti-DoS Sliding-Window Rate Limiter**: 25 requests per 5s sliding window per client IP.
- **Timing-Safe Auth Comparisons**: Built with `secrets.compare_digest` to prevent byte-by-byte timing side-channel attacks.
- **Payload Size Enforcement**: Enforces 10 KB maximum request size to neutralize memory exhaustion vectors.
- **Stored XSS Sanitization**: All inputs HTML-escaped before persistence.
- **Strict HTTP Security Headers**: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`.

---

## 🎮 Play Live Demo
Experience the working prototype live in your browser:
👉 **[https://maheshbawne987-coder.github.io/whitelabel-platform-prototype/](https://maheshbawne987-coder.github.io/whitelabel-platform-prototype/)**

---

## 🛠️ Quick Start

### Local Python Server:
```bash
python backend/server.py
# Server listens on http://127.0.0.1:8085
```

### Run Automated Security Audit Suite:
```bash
python hacker_security_test.py
```

---

## 📄 License
MIT License. Built for modern white-label platforms and CMS integrations.
