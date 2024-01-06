import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Link from "next/link"
const Header = () => {
    return (
        <header className='py-[1rem] px-[2rem] h-[4rem] bg-gray-300 w-full flex justify-between items-center'>
            <div>
                My Todo App
            </div>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
                <Button asChild className="rounded-full bg-primary" size='lg'>
                    <Link href='/sign-in'>Login</Link>
                </Button>
            </SignedOut>
        </header>
    )
}

export default Header