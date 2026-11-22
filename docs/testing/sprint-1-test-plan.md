# HopeErD – Sprint 1 Test Plan and Acceptance Criteria

**Prepared by:** Cassandra Garbosa  
**Role:** Tester  
**Sprint:** Sprint 1

## 1. Testing Objectives

The purpose of this test plan is to ensure that the HopeErD system works correctly and meets the expected requirements. Testing will help identify errors, verify system functionality, and ensure that users can access the features according to their assigned roles and permissions.

## 2. Scope of Testing

The following features will be tested during Sprint 1:

1. User Registration
2. User Login and Logout
3. Set Password and Reset Password
4. User Management
5. User Roles and Permissions
6. Main Page and Dashboard
7. Audit Trail and User Activity

## 3. Testing Methods

The following testing methods will be used:

- **Functional Testing:** Check whether each feature works as expected.
- **Negative Testing:** Check how the system handles invalid information and unauthorized actions.
- **Security Testing:** Verify user access, password protection, and permissions.
- **Smoke Testing:** Check whether the login page and main page are functioning.
- **Regression Testing:** Retest features after developers fix reported bugs.

## 4. Acceptance Criteria

The system will be considered acceptable when the following conditions are met:

### Authentication
- Users can register using valid information.
- Users can log in using correct credentials.
- Invalid login credentials are rejected.
- Users can log out successfully.
- Users can set and reset their passwords.
- Expired and reused password reset tokens are rejected.

### User Management
- Admins can add and edit users.
- Admins can block and unblock users.
- Superadmins can approve users.
- Authorized users can designate an Admin.
- Admins cannot see or edit Superadmin accounts.
- The system prevents disabling the last remaining Superadmin.

### Permissions
- Superadmin, Admin, and User accounts have the correct permissions.
- Users can only access authorized modules and actions.
- Unauthorized actions are rejected by the system.

### Main Page
- The login page loads correctly.
- Users can access the main page after successful login.
- The main page displays the appropriate features based on user permissions.

## 5. Expected Results

All tested features should function according to the system requirements. Invalid inputs and unauthorized actions should be handled properly. Any errors found during testing will be documented and reported to the developers for correction.

## 6. Bug Reporting

If an error is found, the tester will document the following information:

- Bug ID
- Bug title and description
- Steps to reproduce
- Expected result
- Actual result
- Severity
- Status
- Fix verification result

## 7. Testing Deliverables

The following documents and outputs will be prepared:

- Sprint 1 Test Plan and Acceptance Criteria
- Authentication Test Cases
- User Management Test Cases
- Permission Matrix Tests
- Automated Smoke Test
- Bug Reports and Fix Verification

**Prepared by:**  
Cassandra Garbosa  
Tester – HopeErD
