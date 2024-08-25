"use client"
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger, Sheet, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "../_contants/search";
import { AvatarImage, Avatar } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
  const {data} = useSession()
  const handlerLogInGoogleClick = () => signIn("google")
  const handleLogOutClick = () => signOut()

    return ( 
        
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
          

          {data?.user ? (
            <div className="flex items-center gap-2">
            <Avatar>
            <AvatarImage src={data?.user?.image ?? ""}/>
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-lg">Ola, faça o seu login!</h2>
              <Dialog>
                <DialogTrigger>
                  <Button size="icon">
                    <LogInIcon />
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
                
              </Dialog>
            </>
          )}

        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <SheetClose asChild>
            <Button className="justify-start gap-2 bg-transparent hover:bg-primary focus:bg-primary" variant="ghost" asChild>
              <Link href="/">
                <HomeIcon size={18}/>
                Inicio
              </Link>
            </Button>
          </SheetClose>
          <Button className="justify-start gap-2 bg-transparent hover:bg-primary" variant="ghost">
            <CalendarIcon size={18}/>
            Marcações
          </Button>

        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          {quickSearchOptions.map((option) => (
            <SheetClose key={option.title} asChild>
              <Button 
              className="justify-start gap-2 bg-transparent hover:bg-primary" 
              variant="ghost"
              key={option.title}
              asChild
            >
            <Link href={`/barbershops?service=${option.title}`}>
            <Image
              alt={option.title}
              src={option.imageUrl}
              height={18}
              width={18}
            />
            {option.title}
            </Link>
          </Button>
            </SheetClose>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button 
            className="justify-start gap-2" 
            variant="ghost" 
            onClick={handleLogOutClick}>
            <LogOutIcon size={18}/>
            LogOut
          </Button>
        </div>

      </SheetContent>
    );
}
 
export default SidebarSheet;