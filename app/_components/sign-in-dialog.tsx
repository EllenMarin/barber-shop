"use client";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpDialog from "./sign-up-dialog";
import ButtonGoogle from "./buttonGoogle";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 7 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const SignInDialog = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log("Response", response);

    if (response?.ok) {
      router.push("/");
      router.refresh();
    } else {
      toast.error("Email ou senha inválidos");
    }
    return false;
  };

  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-center">Faça seu login</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel className="text-left">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel className="text-left">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 w-full">
              <Button type="submit" className="flex-1">
                Login
              </Button>
              <Dialog>
                <DialogTrigger className="flex-1">
                  <Button type="button" className="w-full">
                    Sign Up
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%]">
                  <SignUpDialog />
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>

        <ButtonGoogle />
      </DialogHeader>
    </>
  );
};

export default SignInDialog;
