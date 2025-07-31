# 📒 El Cuadernito

**El Cuadernito** is an offline-first personal finance app designed for users living with high inflation and unstable currency environments. Built for mobile with **Expo + Livestore**, it supports fully local usage with optional cloud sync powered by Cloudflare Durable Objects.

Cuadernito aims to provide a simple, reliable, and privacy-respecting finance tool for everyday users—whether you're budgeting for groceries or tracking expenses across multiple currencies.

---

## 🎯 Project Goals

- 😀 **Empower users** in high-inflation economies (e.g. Argentina, LATAM)
- 🌐 **Support full offline functionality**, with smooth sync when online
- 🧠 **Leverage local-first architecture** for performance and reliability
- 🔐 **Respect privacy**: your data lives with you unless you opt-in to sync

---

## 🏗️ Monorepo Structure

```
el-cuadernito/
├── apps/
│   ├── backend/              # Hono (Bun) API with Cloudflare Durable Objects support
│   └── mobile/               # Expo React Native app (offline-first)
│       ├── app/             # Expo Router structure
│       ├── assets/          # Fonts, images, etc.
│       ├── lib/             # Shared utilities and logic for the mobile app
├── packages/
│   ├── env/                 # Centralized environment variable schema and loader
│   └── livestore/           # Shared Livestore configuration and sync logic
```

---

## 🧪 Tech Stack

| Layer               | Technology                     | Purpose                                 |
| ------------------- | ------------------------------ | --------------------------------------- |
| **Mobile**          | Expo (React Native)            | Cross-platform mobile app               |
| **Local DB**        | SQLite                         | Offline-first storage                   |
| **Sync Engine**     | Livestore + CF Durable Objects | Optional sync for premium users         |
| **Backend API**     | Hono + Bun                     | Auth, sync, premium logic               |
| **Package Manager** | Bun                            | Fast monorepo and dependency management |
| **i18n**            | Paraglide                      | Internationalization                    |

---

## 📱 Mobile App Structure

```
apps/mobile/
├── app/                # Expo Router tabs and screens
├── assets/             # Fonts, images, icons
├── lib/                # Utilities, logic
│   ├── hooks/
│   ├── types/
│   └── utils/
└── ...                 # Config, entry files, etc.
```

---

## ⚙️ Development Setup

### Prerequisites

- [Bun](https://bun.sh/) (v1.2.19+)
- [Node.js](https://nodejs.org/) (for Expo CLI)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for backend deploy
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Install & Run

```bash
# Install root dependencies
bun install

# Install mobile dependencies
cd apps/mobile
bun install

# Copy env file and fill in credentials
cp .env.example .env

# Start dev servers
bun run dev             # Start both API and mobile
bun run dev:mobile      # Start only mobile app
bun run dev:api         # Start only API (if needed)
```

---

## 🚀 Features

### MVP (v1.0)

- ✅ Expense tracking (manual entry)
- ✅ Offline support with SQLite
- ✅ Automatic conversion to USD Blue rate
- ✅ Simple budget tracking
- 📊 Inflation-adjusted views
- 💰 Multi-currency support

### Premium (v1.1)

- ♻️ Cloud sync across devices
- 🗣️ Voice entry with Whisper.cpp
- 🔔 Real-time alerts and reminders

---

## 💡 Philosophy

- No login or account needed to use the app
- Data remains on your device unless you choose to sync
- Premium plan unlocks sync and automation features
- No data should identify the user

---

## 🔒 Security Notes

- No secrets are stored client-side
- Sync is proxied through a secure Durable Object backend
- API authentication via BetterAuth (planned)

---

## ⚖️ License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**.
See [`LICENSE`](./LICENSE) for details.

> Commercial use of Cuadernito in a hosted environment is allowed under AGPL terms, but a hosted SaaS version may be offered by the author with premium features and support. You're encouraged to reach out for collaboration or licensing questions.

---

## 🤝 Contributing

We welcome contributions! Whether it's bug fixes, new features, or feedback:

1. Fork the repo
2. Create a feature branch
3. Commit and push
4. Open a PR
5. Ensure SQLite + Livestore setup works locally
6. Confirm offline/online sync still works as expected

---

## 📚 References

- [Livestore](https://github.com/livestore/livestore)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Hono](https://hono.dev/)
- [Bun](https://bun.sh/docs)
- [Expo](https://docs.expo.dev)
- [Paraglide](https://paraglide.dev/)
