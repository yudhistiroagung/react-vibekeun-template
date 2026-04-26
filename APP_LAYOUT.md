Setup TanStack Router

- [ ]  Create root route `/`
- [ ]  Setup route tree
- [ ]  Create `home-page.tsx` (blank with title)

Example:

export const Route = createFileRoute("/")({  
  component: HomePage,  
})

---

## Setup Layout System (Responsive)

### Core idea:

- Detect screen size
- Switch layout dynamically
- [ ]  Create `useIsMobile` hook
- [ ]  Root layout decides:

return isMobile ? <MobileLayout /> : <DesktopLayout />

---

### Mobile Layout

- [ ]  Bottom tab navigation
- [ ]  Fixed bottom bar

### Desktop Layout

- [ ]  Sidebar navigation
- [ ]  Content area with padding

---

## Navigation Components

### Bottom Tab

- [ ]  Icons + labels
- [ ]  Active state
- [ ]  Route integration

### Sidebar

- [ ]  Collapsible (optional)
- [ ]  Active route highlight