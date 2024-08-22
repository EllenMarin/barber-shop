import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { SheetContent, SheetHeader, SheetTitle, SheetTrigger, Sheet, SheetClose } from "./ui/sheet";
import { quickSearchOptions } from "../_contants/search";
import { AvatarImage, Avatar } from "./ui/avatar";
import Link from "next/link";


const Header = () => {
  return (
    <Card>
      <CardContent className="py-2 flex flex-row items-center justify-between">
        <Image alt="Barber-shop" src="/logo.png" height={18} width={170} />
        
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid py-5">
              <Avatar>
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHwy"
                  className="object-cover"/>
              </Avatar>

              <div>
                <p className="font-bold">Ellen Marin</p>
                <p className="text-xs">marin_elle@hotmail.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button className="justify-start gap-2" asChild>
                  <Link href="/">
                    <HomeIcon size={18}/>
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18}/>
                Marcações
              </Button>

            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button 
                  className="justify-start gap-2" 
                  variant="ghost"
                  key={option.title}
                >
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  height={18}
                  width={18}
                />
                {option.title}
              </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18}/>
                LogOut
              </Button>
            </div>

          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
