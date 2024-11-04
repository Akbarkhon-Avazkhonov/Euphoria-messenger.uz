DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'euphoria-messenger.uz') THEN
        CREATE DATABASE "euphoria-messenger.uz" WITH OWNER postgres;
    END IF;
END $$;
