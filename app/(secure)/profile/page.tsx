import { ssrWrapper } from "@/lib/api/ssrWrapper"
import UserAPI from "@/lib/api/userAPI"

export default async function Profile() {
  const api = ssrWrapper(UserAPI)
  try {
    const res = await api.getUser()
    console.log(res)
  }catch(err) {
    console.log(err)
  }

  return (
    <main className="flex flex-col items-center justify-between">

    </main>
  )
}
