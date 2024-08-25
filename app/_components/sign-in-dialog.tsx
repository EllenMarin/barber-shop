
import Image from "next/image";
import { Button } from "./ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {

  const handlerLogInGoogleClick = () => signIn("google")
    return ( 
        
        <>
         <DialogHeader>
            <DialogTitle>Faça seu login</DialogTitle>
            <DialogDescription>
                Conecte-se com uma conta Google
            </DialogDescription>
        </DialogHeader>

        <Button 
        variant="outline" 
        className="gap-2 font-bold" 
        onClick={handlerLogInGoogleClick}>
        <Image 
            src="/google.png" 
            alt="Google"
            width={18} 
            height={18}/> 
            Google
        </Button>
    </>
    );
}
 
export default SignInDialog;