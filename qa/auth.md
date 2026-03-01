# QA — Authentication

---

## Feature: Sign-Up (Email/Password)

### TC-AUTH-001 · Successful sign-up
**Steps:**
1. Go to `/`
2. Select the "Sign up" tab
3. Enter a display name, valid email, matching passwords (6+ chars)
4. Click "Create account"

**Expected:** Redirected to `/garden`. User is signed in.

---

### TC-AUTH-002 · Passwords do not match
**Steps:**
1. Sign-up tab — fill all fields but enter different passwords
2. Click "Create account"

**Expected:** Inline error message appears. No account created. No redirect.

---

### TC-AUTH-003 · Password too short
**Steps:**
1. Sign-up tab — enter a password with fewer than 6 characters
2. Click "Create account"

**Expected:** Firebase error shown ("Password should be at least 6 characters" or similar friendly message).

---

### TC-AUTH-004 · Email already in use
**Steps:**
1. Sign-up tab — enter an email that already has an account
2. Click "Create account"

**Expected:** Friendly error message: "An account with this email already exists." No redirect.

---

### TC-AUTH-005 · Missing required fields
**Steps:**
1. Sign-up tab — leave name, email, or password blank
2. Click "Create account"

**Expected:** Error or disabled button prevents submission. No crash.

---

### TC-AUTH-006 · Display name persists after sign-up
**Steps:**
1. Sign up with name "Jane Doe"
2. Check Firebase console → Authentication → user record

**Expected:** `displayName` is "Jane Doe" on the Auth record.

---

## Feature: Sign-In (Email/Password)

### TC-AUTH-007 · Successful sign-in
**Steps:**
1. Go to `/` → Sign in tab
2. Enter valid email + password
3. Click "Sign in"

**Expected:** Redirected to `/garden`.

---

### TC-AUTH-008 · Wrong password
**Steps:**
1. Sign in tab — enter correct email, wrong password
2. Click "Sign in"

**Expected:** Friendly error message. No redirect.

---

### TC-AUTH-009 · Email not found
**Steps:**
1. Sign in tab — enter an email with no account
2. Click "Sign in"

**Expected:** Friendly error message. No redirect.

---

### TC-AUTH-010 · Loading state during sign-in
**Steps:**
1. Click "Sign in" with valid credentials
2. Observe the button immediately after click

**Expected:** Button shows loading state (dimmed / disabled) while request is in flight.

---

## Feature: Google Sign-In

### TC-AUTH-011 · Google sign-in from sign-in tab
**Steps:**
1. Go to `/` → Sign in tab
2. Click "Continue with Google"
3. Complete Google auth popup

**Expected:** Redirected to `/garden`. `displayName` and `photoURL` populated from Google account.

---

### TC-AUTH-012 · Google sign-in from sign-up tab
**Steps:**
1. Go to `/` → Sign up tab
2. Click "Continue with Google"

**Expected:** Same as TC-AUTH-011 — works from either tab.

---

### TC-AUTH-013 · Close Google popup without signing in
**Steps:**
1. Click "Continue with Google"
2. Close the popup before completing auth

**Expected:** No error shown to user. App stays on sign-in page.

---

## Feature: Forgot Password

### TC-AUTH-014 · Reset email sent
**Steps:**
1. Sign in tab — enter a valid registered email
2. Click "Forgot password?"
3. Observe result

**Expected:** Success message: "Check your email for a reset link." No navigation. Check email inbox for reset link.

---

### TC-AUTH-015 · Reset email for unknown address
**Steps:**
1. Sign in tab — enter an email with no account
2. Click "Forgot password?"

**Expected:** Firebase may succeed silently (by design — prevents email enumeration) OR shows a friendly error. Either is acceptable.

---

## Feature: Sign-Out

### TC-AUTH-016 · Sign out via Navbar
**Steps:**
1. Sign in to the app
2. Click the sign-out button (LogOut icon) in the Navbar
3. Observe redirect

**Expected:** Redirected to `/`. All nav links hidden. User data no longer visible.

---

### TC-AUTH-017 · Signed-out user accessing a protected route
**Steps:**
1. Sign out
2. Manually navigate to `/garden`, `/sanctuary`, `/hearth`, or `/reset`

**Expected:** Immediately redirected to `/` on each route.

---

### TC-AUTH-018 · Already signed-in user visiting `/`
**Steps:**
1. Sign in
2. Navigate to `/`

**Expected:** Immediately redirected to `/garden`. Auth page never renders.

---

## Feature: Auth State Persistence

### TC-AUTH-019 · Session persists after page refresh
**Steps:**
1. Sign in
2. Hard refresh the page (Ctrl+R / Cmd+R)

**Expected:** Still signed in. `/garden` loads without going through sign-in.

---

### TC-AUTH-020 · New tab opens signed in
**Steps:**
1. Sign in in one tab
2. Open a new tab and go to `localhost:3000`

**Expected:** New tab shows `/garden` (or the expected protected page), not the sign-in screen.
