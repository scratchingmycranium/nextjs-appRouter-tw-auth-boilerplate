import { ssrWrapper } from "@/lib/api/ssrWrapper"
import UserAPI from "@/lib/api/userAPI"

export default async function Home() {
  const userAPI = ssrWrapper(UserAPI)
  
  try {
    const users = await userAPI.getUser()
    console.log(users)
  } catch (error) {
    console.log(error)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
