-- 006: seed roles, the 5 modules, the 36 per-action rights, and one superadmin per team member.
-- >>> EDIT THE TEAM MEMBER LIST BELOW (names + emails) BEFORE RUNNING <<<

CREATE EXTENSION IF NOT EXISTS pgcrypto;      -- bcrypt: crypt() and gen_salt()

INSERT INTO role (role_name) VALUES ('Superadmin'), ('Admin'), ('User');

INSERT INTO module (module_name, sort_order) VALUES
    ('Customer', 1), ('Product', 2), ('Human Resources', 3), ('Sales', 4), ('Reports', 5);

INSERT INTO rights (right_code, module_id, description)
SELECT v.code, m.module_id, v.descr
FROM (VALUES
    ('CUST_ADD',           'Customer',        'Add Customer'),
    ('CUST_EDIT',          'Customer',        'Edit Customer'),
    ('CUST_DELETE',        'Customer',        'Delete Customer'),

    ('PROD_ADD',           'Product',         'Add Product'),
    ('PROD_EDIT',          'Product',         'Edit Product'),
    ('PROD_DELETE',        'Product',         'Delete Product'),
    ('PRICE_ADD',          'Product',         'Add Price'),
    ('PRICE_EDIT',         'Product',         'Edit Price'),
    ('PRICE_DELETE',       'Product',         'Delete Price'),

    ('JOB_ADD',            'Human Resources', 'Add Job'),
    ('JOB_EDIT',           'Human Resources', 'Edit Job'),
    ('JOB_DELETE',         'Human Resources', 'Delete Job'),
    ('DEPT_ADD',           'Human Resources', 'Add Department'),
    ('DEPT_EDIT',          'Human Resources', 'Edit Department'),
    ('DEPT_DELETE',        'Human Resources', 'Delete Department'),
    ('EMP_ADD',            'Human Resources', 'Add Employee'),
    ('EMP_EDIT',           'Human Resources', 'Edit Employee'),
    ('EMP_DELETE',         'Human Resources', 'Delete Employee'),
    ('JOBHIST_VIEW',       'Human Resources', 'View Job History'),
    ('JOBHIST_ADD',        'Human Resources', 'Add Job History'),
    ('JOBHIST_EDIT',       'Human Resources', 'Edit Job History'),
    ('JOBHIST_DELETE',     'Human Resources', 'Delete Job History'),

    ('SALE_ADD',           'Sales',           'Add Sale'),
    ('SALE_EDIT',          'Sales',           'Edit Sale'),
    ('SALE_DELETE',        'Sales',           'Delete Sale'),
    ('SALEDET_VIEW',       'Sales',           'View Sale Details'),
    ('SALEDET_ADD',        'Sales',           'Add Sale Detail'),
    ('SALEDET_EDIT',       'Sales',           'Edit Sale Detail'),
    ('SALEDET_DELETE',     'Sales',           'Delete Sale Detail'),

    ('RPT_TOP_CUSTOMERS',  'Reports',         'Top Customers'),
    ('RPT_PRODUCT_MASTER', 'Reports',         'Product Master List'),
    ('RPT_TOP_PRODUCTS',   'Reports',         'Top Products'),
    ('RPT_ACTIVE_EMP',     'Reports',         'Active Employees'),
    ('RPT_ALL_EMP',        'Reports',         'All Employees'),
    ('RPT_EMP_JOBHIST',    'Reports',         'Employee Job History'),
    ('RPT_TOP_SALES',      'Reports',         'Top Sales')
) AS v(code, modname, descr)
JOIN module m ON m.module_name = v.modname;

-- One superadmin per team member.
-- Temporary password for all of them: ChangeMe!2026  (stored only as a bcrypt hash; change it after first login)
INSERT INTO app_user (first_name, last_name, email, password_hash, role_id)
SELECT v.fn, v.ln, v.email, crypt('ChangeMe!2026', gen_salt('bf')), r.role_id
FROM (VALUES
    ('Archie Lynne Arl',  'Deloya',  'archielynnearl.deloya@neu.edu.ph'),
    ('Katrice Gail', 'Bughaw', 'katricegail.bughaw@neu.edu.ph'),
    ('Theresa', 'Tulauan', 'theresa.tulauan@neu.edu.ph'),
    ('Rhian Roxanne', 'Burasca', 'rhianroxanne.burasca@neu.edu.ph'),
    ('Cassandra', 'Garbosa', 'cassandra.garbosa@neu.edu.ph')
) AS v(fn, ln, email)
CROSS JOIN role r
WHERE r.role_name = 'Superadmin';

-- Every superadmin gets every right
INSERT INTO user_permission (user_id, right_code)
SELECT u.user_id, rt.right_code
FROM app_user u
JOIN role r ON r.role_id = u.role_id AND r.role_name = 'Superadmin'
CROSS JOIN rights rt;
