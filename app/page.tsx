import { Button } from "@/components/ui/button";
import SessionManager from "@/lib/sessionManager";
import Link from "next/link";

export default async function Home() {
  const isAuth = await new SessionManager(true).isSessionValid();

  return (
    <main className="flex flex-col items-center justify-between relative">
      <div className="flex items-center justify-center w-full h-[70vh] bg-cover z-0"
          style={{ 
            backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%), url('/background.png')",
            backgroundPosition: 'center bottom'
          }}>

        {/* Content centered over the background */}
        <div className="z-10 p-4 text-center relative">
          {
            isAuth ? (
              <Link href="/profile">
                <>
                  <Button>My Profile</Button>
                </>
              </Link>
            ) : (
              <>
                <div className="flex flex-col space-y-4 justify-center items-center mb-8">
                  <h1 className="text-4xl font-bold">Welcome to <span className="text-blue-500">My Boilerplate</span></h1>
                  <p className="text-2xl">A simple boilerplate Next.js template</p>
                </div>
                <div className="flex flex-row space-x-4 items-center justify-center">
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              </>
            )
          }
          
        </div>

      </div>
    </main>
  );
}
