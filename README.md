# Masakali Retreat Booking Platform

A production-ready booking platform for a luxury villa retreat in Bali, featuring sophisticated payment processing, multi-system orchestration, and real-time availability management.

**Built with**: Next.js 15, React 19, TypeScript, Prisma, NextAuth, Xendit, Smoobu PMS

## Overview

A full-stack booking system managing 5 luxury villas with integrated payment processing, property management synchronization, and automated guest communications. The platform handles real-time availability, multi-currency pricing, and complex 3D Secure payment flows.

**Technical Scope**: Designed and implemented end-to-end as a solo project, from database schema to payment integration to admin tooling.

## Key Technical Achievements

### 1. Sophisticated Payment Processing
Implemented Xendit credit card integration with 3D Secure authentication:
- **Async state machine** managing token lifecycle (creation → review → verification → confirmation)
- **Modal-based 3DS flow** with real-time status polling and error recovery
- **Zustand state orchestration** coordinating payment token, authentication URL, and modal visibility
- **Billing details parser** handling international address formats and name splitting
- **Server-side confirmation** creating reservations only after verified payment

### 2. Multi-System Integration
Orchestrated four external systems into a cohesive booking flow:
- **Smoobu PMS**: Webhook-driven reservation sync (create/update/cancel/delete events)
- **Xendit Payments**: Tokenization, 3D Secure, invoice management
- **SendGrid**: Dynamic email templates for confirmations and admin notifications
- **CurrencyAPI**: Real-time exchange rates with batch updates via cron job

### 3. Real-Time Availability & Pricing
- **Dynamic pricing engine** with per-villa, per-date availability from Smoobu inventory
- **Multi-currency support** with live IDR conversion rates stored in database
- **Guest capacity constraints** (families vs couples) enforced at booking time
- **Discount and tax calculations** per website configuration

## Tech Stack

**Frontend**
- Next.js 15 with App Router, React Server Components, and server actions
- React 19 with TypeScript strict mode
- TanStack React Query for server state management
- Zustand for client-side state (payment, user data, cart)
- React Hook Form + Zod for validated form handling
- Tailwind CSS 4 + Radix UI for accessible components

**Backend**
- Next.js API routes for webhooks and cron jobs
- Prisma ORM with PostgreSQL database
- NextAuth.js v5 (beta) with Google OAuth
- Server actions for type-safe client-server communication

**Third-Party Services**
- Xendit: Payment gateway with 3D Secure support
- Smoobu: Property management system (inventory, pricing, reservations)
- SendGrid: Transactional email with dynamic templates
- CurrencyAPI: Real-time exchange rates

**DevOps & Monitoring**
- PostHog: Product analytics with server-side error tracking
- Sentry: Error monitoring with sourcemap uploads
- Vercel Cron: Scheduled currency updates
- Type-safe environment validation (T3-OSS env)

## Architecture Decisions

**Why Zustand for Payment State?**
Payment flows require precise coordination between token creation, 3D Secure modal, and confirmation. Zustand's middleware-free approach and localStorage persistence made it ideal for managing this complex async state across component boundaries.

**Why Server Actions over API Routes?**
Server actions provide end-to-end type safety from frontend to database queries. Used for all booking operations (villa pricing, reservation creation, email sending) while reserving API routes for external webhooks and cron jobs.

**Why Webhook-Driven Sync?**
Smoobu webhooks ensure the local database stays synchronized with the PMS without polling. Type guards validate webhook payloads, and all events are logged for debugging and audit trails.

## Implementation Highlights

### Payment Flow State Management

Custom React hooks orchestrate the multi-step payment process:

```typescript
// Coordinates token creation, 3DS authentication, and payment confirmation
useFetchPaymentData()
  → useXendit()          // Manages token lifecycle and modal
    → useCartForm()       // Form validation and submission
      → useVillaPricing() // Price calculations with currency conversion
```

**Payment States**: `CREATING` → `IN_REVIEW` → `VERIFIED` → `CONFIRMED` → `SUCCESS`

Each state transition triggers specific UI updates (loading states, modals, redirects) with PostHog error logging at failure points.

### Database Design

**Villa-Pricing Model**: Unique constraint on `(villa_id, date)` enables efficient availability queries and prevents double-booking.

**Reservation Sync**: Tracks both local reservation state and Smoobu PMS ID with cascade delete relationships. Webhook events update reservation status in real-time.

**NextAuth Tables**: Standard OAuth flow with Google provider, extended with admin role checking via callbacks.

### Type Safety Patterns

- **Zod schemas** for runtime validation of form inputs, webhook payloads, and API responses
- **Prisma-generated types** propagated through server actions to frontend
- **Type guards** for webhook payload discrimination (rates vs reservations)
- **Strict TypeScript** with no `any` or unguarded `unknown` types

### Error Handling & Observability

- **PostHog server-side tracking** captures errors with user session context via cookie parsing
- **Webhook logging** stores all incoming payloads as JSON for debugging
- **Sentry integration** with automatic sourcemap uploads for production errors
- **Graceful payment failures** with user-friendly error messages and retry flows

### Background Processing

**Currency Cron Job**: GET endpoint designed for Vercel Cron that batch-fetches exchange rates (10 currencies per batch) to respect API rate limits, then updates database atomically.

## Project Structure

```
src/
├── actions/           # Server actions (cart, sendgrid, smoobu, xendit, reservations)
├── app/
│   ├── (main)/       # Public booking flow (home, cart, success)
│   ├── (admin)/      # Protected admin dashboard with role-based access
│   └── api/          # Webhooks (Smoobu events) and cron jobs (currency updates)
├── components/       # Reusable UI components (forms, modals, layout)
├── hooks/            # Custom hooks (useFetchPaymentData, useXendit, useCartForm)
├── lib/              # Constants and villa definitions
├── stores/           # Zustand stores (payment, user, currency, reservation)
├── types/            # TypeScript type definitions and Zod schemas
└── utils/            # Helper functions (xendit, smoobu, sendgrid, posthog)
```

**Organization Philosophy**: Separation by concern (actions for mutations, hooks for orchestration, stores for state, utils for pure functions). Server actions co-located with related utility functions to keep feature logic together.

## Challenges & Solutions

**Challenge**: 3D Secure authentication requires async modal flow that could fail at multiple points (token creation, user authentication, network errors).

**Solution**: Built a state machine with Zustand that persists payment state to localStorage. Each failure point logs to PostHog with context, and users can retry without re-entering card details.

**Challenge**: Keeping local database synchronized with Smoobu PMS while handling webhook delivery failures or ordering issues.

**Solution**: Webhook logging table captures all events with timestamps. Each webhook handler is idempotent (can safely process duplicate events), and type guards prevent processing malformed payloads.

**Challenge**: Supporting multiple currencies without constant API calls and avoiding stale exchange rates.

**Solution**: Cron job updates rates every 6 hours with batch processing. Frontend reads from database cache, falling back to stored rates if API is unavailable.

---

**Tech Stack**: Next.js 15 · React 19 · TypeScript · Prisma · PostgreSQL · NextAuth · Xendit · Smoobu · SendGrid · TanStack Query · Zustand · Tailwind CSS · PostHog · Sentry
