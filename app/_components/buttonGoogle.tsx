import Image from "next/image";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { DialogDescription } from "./ui/dialog";

const handlerLogInGoogleClick = () => signIn("google");

const ButtonGoogle = () => {
  return (
    <>
      <DialogDescription>Sign in with a Google account</DialogDescription>

      <Button
        variant="outline"
        className="gap-2 font-bold"
        onClick={handlerLogInGoogleClick}
      >
        <Image src="/google.png" alt="Google" width={18} height={18} />
        Google
      </Button>
    </>
  );
};

export default ButtonGoogle;
