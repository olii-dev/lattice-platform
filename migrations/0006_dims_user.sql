-- usage_dims_daily needs user_id for per-user model/source splits
DROP TABLE usage_dims_daily;
CREATE TABLE usage_dims_daily (
  day TEXT NOT NULL,
  user_id TEXT NOT NULL,
  source TEXT NOT NULL,
  model TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  errors INTEGER NOT NULL DEFAULT 0,
  prompt_tokens INTEGER NOT NULL DEFAULT 0,
  completion_tokens INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (day, user_id, source, model)
);
INSERT INTO usage_dims_daily (day, user_id, source, model, requests, errors, prompt_tokens, completion_tokens)
  SELECT substr(ts, 1, 10), user_id, source, model, COUNT(*), SUM(CASE WHEN status >= 400 THEN 1 ELSE 0 END),
         SUM(prompt_tokens), SUM(completion_tokens)
  FROM request_log GROUP BY 1, 2, 3, 4;
