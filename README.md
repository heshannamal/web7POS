# NovaPOS — Modern Retail POS

A responsive multi-store POS, inventory and retail management platform built from the supplied dark graphite/orange UI references.

## Architecture

- `frontend/` — Next.js + React + TypeScript responsive POS web application.
- `backend/` — Laravel 13 + MySQL API and database schema.
- PC, touch-tablet and mobile-browser layouts share the same responsive web UI.

## Implemented UI modules

Dashboard, POS / Checkout, Product Management, Inventory, Barcode & Label Printing, Purchases & Suppliers, Customers & Loyalty, Promotions, Cashier & Register, Sales Orders, Reports & Analytics, Expenses, Accounting, Employees, Users / Roles / Permissions, Multi-store / Locations, Security & Audit, Ecommerce / Integrations, AI Insights and Settings / Hardware.

The navigation is intentionally broad so the full system can grow without redesigning the shell later.

## POS prototype workflows

The checkout page includes product/category search, touch product cards, weighted item increments, cart quantities, discounts, coupons, hold/resume sale, multiple payment method selection, receipt actions, refunds/returns/exchange/void quick actions, cashier notes and customer display actions.

Held bills are persisted in browser storage. A service worker caches the core POS shell. Completed sales attempt to post to the Laravel API; when the connection is unavailable, the sale is queued locally for later synchronization.

## Product and inventory model

The Laravel migrations include:

- categories/subcategories, brands and units
- products and variants
- multiple barcodes and product images
- store-specific product prices
- bundle/composite product relationships
- lot/batch and expiry tracking
- reserved and available inventory
- stock movements and adjustments
- stock transfers and stock takes
- stores, warehouses, registers and devices

## Purchasing

Schema and UI cover suppliers, supplier product codes, purchase orders, purchase items, goods received notes, supplier invoices/payments, partial receiving, cost history and reorder workflows.

## Customers and loyalty

Customer groups, membership levels, loyalty points, wallet/store credit, credit limits, customer statements, birthday and promotion workflows are represented in the UI and schema.

## Security and roles

The schema contains users, roles, permissions and role-permission access levels. The seeded roles are Admin, Manager, Supervisor, Cashier, Inventory Manager and Accountant. The UI includes a granular permission matrix, audit views, 2FA/device/session controls and approval queues.

## Offline POS

`frontend/public/sw.js` provides application-shell caching. `frontend/lib/offline.ts` provides a local queued-sale mechanism. Laravel exposes `/api/sync/push` and `/api/sync/status` as the foundation for device synchronization.

## Barcode printing

The barcode screen supports manual product selection, date filtering, PO/GRN filtering, label quantities, CODE128/EAN choices, optional QR codes, price/shelf label modes, preview, Zebra/TSC selection, print queue and PDF/template actions.

## Setup

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

### Backend

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Create a MySQL database named `novapos` or update the DB values in `.env`.

Default seeded admin for local development:

```text
admin@novapos.local
password
```

Change these credentials before any non-local deployment.

### API URL

The frontend defaults to:

```text
http://localhost:8000/api
```

Change `NEXT_PUBLIC_API_URL` in `frontend/.env.local` when needed.

## API foundation

- `GET /api/health`
- `GET /api/dashboard`
- `GET|POST /api/products`
- `GET|PUT /api/products/{product}`
- `GET /api/inventory/summary`
- `GET /api/inventory/ledger`
- `POST /api/inventory/adjustments`
- `POST /api/sales`
- `POST /api/sales/hold`
- `GET /api/sales/held`
- `GET|POST /api/customers`
- `GET /api/purchases`
- `GET /api/labels/products`
- `POST /api/sync/push`
- `GET /api/sync/status`

`SaleController` uses a database transaction and consumes inventory in FEFO order when expiry dates exist.

## UI theme

- near-black canvas
- charcoal cards with subtle gradients
- fine low-contrast borders
- orange/red primary accent
- compact high-density desktop information layout
- touch-friendly POS controls
- responsive sidebar/drawer behavior
- mobile bottom navigation

## Current development scope

This repository now contains a substantial end-to-end foundation and interactive UI. Several advanced business workflows (full accounting posting rules, complete promotion engine execution, every hardware driver, marketplace-specific sync adapters, production AI models, and payment terminal vendor integrations) still require provider-specific implementation and production validation.
