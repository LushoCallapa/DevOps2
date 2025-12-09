-- Add default test user
-- Password: 123456 (hashed with bcrypt) to success login
INSERT INTO "User" (email, password, "createdAt")
VALUES (
  'test1@example.com',
  '$2b$10$tpoPWhq/pTaI91hSK06wwuYjSon4QUPYxgquCgAhdsZE4xOePkn7K',
  NOW()
)
ON CONFLICT (email) DO NOTHING;