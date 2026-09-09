-- LUNA VIP - Schema do Banco de Dados
-- Execute este arquivo no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  first_interaction TIMESTAMP DEFAULT NOW(),
  last_interaction TIMESTAMP DEFAULT NOW(),
  status TEXT DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  command TEXT UNIQUE NOT NULL,
  title TEXT,
  text TEXT,
  active BOOLEAN DEFAULT true,
  buttons JSONB DEFAULT '[]'
);

CREATE TABLE IF NOT EXISTS buttons (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  action TEXT DEFAULT 'mensagem',
  target TEXT,
  order_num INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  message_id INTEGER REFERENCES messages(id)
);

CREATE TABLE IF NOT EXISTS contents (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'texto',
  content TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);