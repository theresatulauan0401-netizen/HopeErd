"""Applies migrations/*.sql in order (each file once), then optionally runs the tests.

Usage:
    python run_migrations.py          # apply pending migrations
    python run_migrations.py --test   # apply pending migrations, then run tests/*.sql
                                      # (tests always roll back; nothing is kept)
"""
import glob
import os
import sys

import psycopg2
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv("DB_HOST", "localhost"),
    port=os.getenv("DB_PORT", "5432"),
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
)
conn.autocommit = False
cur = conn.cursor()

cur.execute("""
    CREATE TABLE IF NOT EXISTS schema_migrations (
        filename   VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
""")
conn.commit()

cur.execute("SELECT filename FROM schema_migrations")
applied = {row[0] for row in cur.fetchall()}

for path in sorted(glob.glob("migrations/*.sql")):
    name = os.path.basename(path)
    if name in applied:
        print(f"skip    {name}")
        continue
    print(f"apply   {name}")
    try:
        with open(path, encoding="utf-8") as f:
            cur.execute(f.read())          # no parameters, so % in the SQL is left alone
        cur.execute("INSERT INTO schema_migrations (filename) VALUES (%s)", (name,))
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"FAILED  {name}: {str(e).strip()}")
        sys.exit(1)

if "--test" in sys.argv:
    failed = False
    for path in sorted(glob.glob("tests/*.sql")):
        name = os.path.basename(path)
        try:
            with open(path, encoding="utf-8") as f:
                cur.execute(f.read())
            print(f"PASS    {name}")
        except Exception as e:
            failed = True
            print(f"FAIL    {name}: {str(e).strip()}")
        finally:
            conn.rollback()                # tests never leave data behind
    if failed:
        sys.exit(1)

print("Done.")
cur.close()
conn.close()
