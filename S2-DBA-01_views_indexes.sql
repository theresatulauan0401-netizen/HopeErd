-- S2-DBA-01  Customer and product active views, indexes
-- Run AFTER HopeDB_audit.sql (needs is_deleted columns and *_active views).

DROP VIEW IF EXISTS customer_active;
CREATE VIEW customer_active AS SELECT * FROM customer WHERE NOT is_deleted;

DROP VIEW IF EXISTS product_active;
CREATE VIEW product_active  AS SELECT * FROM product  WHERE NOT is_deleted;

DROP VIEW IF EXISTS pricehist_active;
CREATE VIEW pricehist_active AS SELECT * FROM pricehist WHERE NOT is_deleted;

-- 2. Indexes. Partial (WHERE NOT is_deleted) so they stay small and match
--    what the User role sees. Queries must include NOT is_deleted to use them.
CREATE INDEX IF NOT EXISTS ix_customer_name_active
    ON customer (lower(custname)) WHERE NOT is_deleted;

CREATE INDEX IF NOT EXISTS ix_product_desc_active
    ON product (lower(description)) WHERE NOT is_deleted;

-- PK of pricehist is (effdate, prodcode): useless for "prices of product X".
CREATE INDEX IF NOT EXISTS ix_pricehist_prod_eff
    ON pricehist (prodcode, effdate DESC) WHERE NOT is_deleted;

-- Foreign-key lookups used by trg_check_children (delete checks).
CREATE INDEX IF NOT EXISTS ix_sales_custno_active
    ON sales (custno) WHERE NOT is_deleted;

CREATE INDEX IF NOT EXISTS ix_salesdetail_prodcode_active
    ON salesdetail (prodcode) WHERE NOT is_deleted;