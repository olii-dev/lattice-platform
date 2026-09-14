-- Token usage tracking + per-dimension daily aggregates (kept forever)
ALTER TABLE usage_daily ADD COLUMN prompt_tokens INTEGER NOT NULL DEFAULT 0;
ALTER TABLE usage_daily ADD COLUMN completion_tokens INTEGER NOT NULL DEFAULT 0;
ALTER TABLE request_log ADD COLUMN prompt_tokens INTEGER NOT NULL DEFAULT 0;
ALTER TABLE request_log ADD COLUMN completion_tokens INTEGER NOT NULL DEFAULT 0;

-- Backfill estimates from char counts (chars/4, same estimate the API uses)
UPDATE usage_daily SET prompt_tokens = CAST(prompt_chars / 4.0 + 0.5 AS INTEGER) WHERE prompt_tokens = 0 AND prompt_chars > 0;
UPDATE usage_daily SET completion_tokens = CAST(completion_chars / 4.0 + 0.5 AS INTEGER) WHERE completion_tokens = 0 AND completion_chars > 0;
UPDATE request_log SET prompt_tokens = CAST(prompt_chars / 4.0 + 0.5 AS INTEGER) WHERE prompt_tokens = 0 AND prompt_chars > 0;
UPDATE request_log SET completion_tokens = CAST(completion_chars / 4.0 + 0.5 AS INTEGER) WHERE completion_tokens = 0 AND completion_chars > 0;

CREATE TABLE usage_dims_daily (
  day TEXT NOT NULL,
  source TEXT NOT NULL,
  model TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  errors INTEGER NOT NULL DEFAULT 0,
  prompt_tokens INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, source, model)
);

-- Backfill from request_log (has real source+model for the retained window)
INSERT INTO usage_dims_daily (day, source, model, requests, errors, prompt_tokens, completion_tokens)
  SELECT substr(ts, 1, 10), source, model, COUNT(*), SUM(CASE WHEN status >= 400 THEN 1 ELSE 0 END),
         SUM(prompt_tokens), SUM(completion_tokens)
  FROM request_log GROUP BY 1, 2, 3;
