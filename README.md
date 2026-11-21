# RoomChat Dev / Promotional Website

React + Vite promotional site for RoomChat. Deploys to GitHub Pages at `/roomchatdev/`.

## Setup

1. Create a separate GitHub repository named `roomchatdev` under `xlg77`.
2. Upload/push this project to its `main` branch.
3. Add GitHub Actions Pages deployment permission in repository settings if prompted.
4. In GitHub Settings → Pages, select GitHub Actions.
5. Add these repository Actions variables (or environment variables) for the build:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   Use the existing RoomChat Supabase project URL and its public publishable key. Never use a service-role key.
6. Push to `main`. The included workflow builds and deploys the site.

## Usage-time statistic

The RoomChat app records foreground active time in 30-second heartbeats using an anonymous random session UUID. The database stores only that UUID, aggregate seconds, and last-seen timestamp. It does not store account IDs, nicknames, messages, IP addresses, or device fingerprints.

The promo site reads `roomchat_total_usage_seconds()` and refreshes the display once per minute. The number is a cumulative total of tracked foreground time after the tracker was deployed; it is not retroactive.

## Supplied React Bits components

The user-provided `GradientASCII`, `ElectricBorder`, and `LogoLoop` React components are included under `src/components/`.
