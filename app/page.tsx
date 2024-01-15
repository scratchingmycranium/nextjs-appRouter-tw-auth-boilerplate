import LoginForm from "@/components/login"
import AuthAPI from "@/lib/api/authAPI"
import UserAPI from "@/lib/api/userAPI"
import { cookies } from "next/headers"

export default async function Home() {
  // const c = cookies().toString()
  
  // const userAPI = new UserAPI({
  //   Cookie: c
  // })
  
  // try {
  //   const users = await userAPI.getUser()
  //   console.log(users)
  // } catch (error) {
  //   console.log(error)
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    </main>
  )
}
