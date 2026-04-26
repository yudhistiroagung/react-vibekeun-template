import { LogOut } from "lucide-react"
import { Button } from "@/components/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center border-b bg-white shadow-sm">
      {/* Logo Area matches sidebar width */}
      <div className="flex h-full w-[220px] items-center border-r px-6">
        <span className="text-xl font-bold tracking-tight text-primary">Logo</span>
      </div>
      
      {/* Right side actions */}
      <div className="flex flex-1 items-center justify-end px-6">
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
