"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../_components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonGoogle from "../_components/buttonGoogle";
import { signIn } from "next-auth/react";
import { Button } from "../_components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginPage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log({ response });

    if (!response?.error) {
      router.push("/");
      router.refresh();
    } else {
      toast.error("Email ou senha inválidos");
    }
    return false;
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#151619] bg-opacity-90"></div>

      <div className="relative z-10 p-6 rounded-lg shadow-lg max-w-md w-[80%] bg-background">
        <Dialog>
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-center">Faça seu login</DialogTitle>

            <Form {...form}>
              <form
                method="post"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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

                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Form>

            <ButtonGoogle />
          </DialogHeader>
        </Dialog>
      </div>
    </div>
  );
};

export default LoginPage;
