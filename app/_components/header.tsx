import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="py-2 flex flex-row items-center justify-between">
        <Image alt="Barber-shop" src="/logo.png" height={18} width={170} />
        <Button size="icon" variant={"outline"}>
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
