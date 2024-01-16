import { ssrWrapper } from "@/lib/api/ssrWrapper"
import UserAPI from "@/lib/api/userAPI"
import { RouteKeys, routeManager } from "@/lib/routeManager"
import Link from "next/link"

export default async function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link
        href={'/dashboard'}
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Dashboard</button> 
      </Link>
    </main>
  )
}
