# Tubes WebPro Frontend

## Overview

Frontend aplikasi pembelajaran berbasis AI (judul aplikasi: **Rangkuman Cerdas**) yang dibangun dengan React + TanStack Router. Aplikasi ini terhubung ke backend API melalui `VITE_API_BASE_URL`.

## Features

- Autentikasi pengguna (login, register, logout) dengan route guard.
- Redirect berbasis role (`user` ke dashboard user, `admin` ke dashboard admin).
- Upload dan manajemen dokumen (hapus, status: `pending/processing/completed/failed`).
- Generate ringkasan dokumen dengan opsi tipe (`concise`, `detailed`, `bullet_points`, `abstract`), bahasa (`id`/`en`), dan custom prompt.
- Generate kuis dari dokumen (jumlah soal, tingkat kesulitan, jenis soal), mengerjakan kuis, submit jawaban, dan melihat hasil.
- Halaman riwayat aktivitas pengguna dengan filter.
- Manajemen profil (ubah nama/email/password, upload/hapus avatar).
- Halaman admin dashboard dan manajemen user.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- TanStack Router (file-based routing)
- TanStack Query
- Tailwind CSS v4
- shadcn/ui components
- Biome (lint/format/check)
- Vitest (testing)

## Setup and Run

### Prerequisites

- Bun
- Backend API yang berjalan (default: `http://localhost:8000/api`)

### Environment

Salin file environment:

```bash
cp .env.example .env
```

Nilai default yang digunakan:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Install dependencies

```bash
bun install
```

### Development

```bash
bun run dev
```

Server dev dijalankan di port `3000` (sesuai script Vite di `package.json`).

### Build

```bash
bun run build
```

### Preview build

```bash
bun run preview
```

### Test

```bash
bun run test
```

### Linting and formatting

```bash
bun run lint
bun run format
bun run check
```

## Project Structure

```text
src/
  components/        # UI components (shared dan shadcn/ui)
  data/              # React Query hooks per domain (auth, documents, quiz, dst.)
  integrations/      # Integrasi provider (TanStack Query devtools/provider)
  lib/               # API client, auth storage/utils, shared types/utils
  routes/            # File-based routes (auth, dashboard, profile, history, admin, quiz)
  main.tsx           # App bootstrap + router setup
  routeTree.gen.ts   # Generated route tree dari TanStack Router plugin
```
