# lattice-platform

The code behind [lattice.mebbo.cloud](https://lattice.mebbo.cloud) - the site, the API, and the GPU backend that serves [Quark](https://huggingface.co/lattice-research/lattice-quark-1.5b) (1.5B, trained from scratch) and [Spark](https://huggingface.co/lattice-research/lattice-spark-1.5b) (a Qwen2.5-1.5B identity fine-tune).

## What's in here

- `src/worker.js` - the Cloudflare Worker that runs everything in front: the site, accounts, auth, API keys, rate limits, usage tracking, and the OpenAI-compatible `/v1/chat/completions` endpoint that proxies to the GPU box.
- `public/` - the static site (landing, docs, blog, benchmarks, chat UI, dashboard, admin). No framework, no build step - hand-written HTML/CSS/JS, deployed as Workers Static Assets.
- `migrations/` - D1 (SQLite) migrations for users, sessions, API keys, and usage. Applied with `wrangler d1 migrations apply`.
- `pulse/` - the inference backend that runs on a single Azure T4 VM. FastAPI server that loads both models resident in fp16 and serves `/chat`, `/health`, and `/warm`. The worker talks to it over HTTP with a shared secret header.

## How a request flows

Browser or API client -> Cloudflare Worker (auth, rate limits, usage logging) -> `pulse` on the GPU VM (actual generation) -> back up the chain. Guests get a small free allowance; signed-in users get more; API keys get 50 requests/minute and 1,000/day per account, 5 active keys max.

## Deploying

Site + worker:

```
npx wrangler deploy
```

Database migrations:

```
npx wrangler d1 migrations apply lattice-platform-db --remote
```

Backend (on the VM):

```
cd ~/pulse && ./start.sh
```

## Secrets

None live in this repo. The worker's secrets (session pepper, the pulse shared secret, admin tokens) are Cloudflare Worker secrets set with `wrangler secret put`. The backend's shared secret lives in `~/pulse/.secret` on the VM, read by `start.sh` at launch. Keep it that way.

## Why it's built like this

One GPU, one worker, no framework, no build step. Cheap to run, easy to reason about, and every part is small enough to hold in your head. The blog on the site has the longer writeups.
