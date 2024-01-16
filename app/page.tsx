import { Button } from "@/components/ui/button"
import { ssrWrapper } from "@/lib/api/ssrWrapper"
import UserAPI from "@/lib/api/userAPI"
import { RouteKeys, routeManager } from "@/lib/routeManager"
import Link from "next/link"

export default async function Home() {
  
  return (
    <main className="flex flex-col items-center justify-between">
      Home page
    </main>
  )
}
