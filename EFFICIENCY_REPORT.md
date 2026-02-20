# Efficiency Audit Report — arsafitai-web

## 1. `use-toast.ts` — useEffect re-subscribes on every state change (BUG)

**File:** `use-toast.ts`, line 182  
**Issue:** The `useEffect` in `useToast()` lists `[state]` as its dependency array. Since `state` changes every time a toast is added/updated/dismissed, the effect tears down and re-registers the listener on every single state change. This is unnecessary churn — the listener (`setState`) is a stable reference and only needs to be registered once on mount.  
**Fix:** Change the dependency array from `[state]` to `[]`.

---

## 2. `HudButton.tsx` — `variants` object recreated every render

**File:** `HudButton.tsx`, line 19  
**Issue:** The `variants` lookup object is defined inside the component function body, so a new object is allocated on every render. Since it's a static mapping, it should be hoisted outside the component.  
**Impact:** Minor — one extra object allocation per render per button instance.

---

## 3. `Footer.tsx` — Inline `<style>` tag re-injected every render

**File:** `Footer.tsx`, line 22  
**Issue:** The `@keyframes loading` animation is defined via an inline `<style>` JSX element. React re-creates this DOM node on every render. The keyframes definition is static and should live in `index.css`.  
**Impact:** Moderate — unnecessary DOM manipulation on every render of the footer (which is always mounted).

---

## 4. `Landing.tsx` — Monolithic 280-line component causes full-page re-renders

**File:** `Landing.tsx`  
**Issue:** The entire landing page (hero, features, founder, contact form, success modal) is a single component with multiple `useState` hooks. Any state change (e.g., typing in the contact form, submitting) triggers a re-render of the entire page including all sections.  
**Fix idea:** Extract the contact form section and success modal into a separate component so state changes are scoped.

---

## 5. `Landing.tsx` — Contact form uses manual state instead of `useMutation`

**File:** `Landing.tsx`, line 42  
**Issue:** The contact form submission manually manages `isSubmitting` state with `useState` and calls `apiRequest` directly. Meanwhile, the waitlist form correctly uses React Query's `useMutation` (in `use-waitlist.ts`), which provides automatic loading/error/success state, deduplication, and retry support.  
**Impact:** Inconsistent patterns; the manual approach misses React Query benefits.

---

## 6. Unused UI component dependencies shipped in bundle

**File:** `package.json`  
**Issue:** The project installs ~30 Radix UI primitives (accordion, alert-dialog, carousel, chart, sidebar, command, context-menu, etc.) but the application only uses a handful (toast, tooltip, form, label, slot). Tree-shaking may not fully eliminate these if the wrapper components (e.g., `sidebar.tsx`, `carousel.tsx`) import them.  
**Impact:** Larger bundle size and longer install times than necessary.

---

## Fix Applied

**Issue #1** (`use-toast.ts` dependency array) is fixed in the accompanying PR — it is the most clear-cut performance bug.
