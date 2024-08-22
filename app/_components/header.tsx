import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import SidebarSheet from "./sidebar-sheet";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";


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
          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
