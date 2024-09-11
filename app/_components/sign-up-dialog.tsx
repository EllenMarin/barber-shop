"use client";
import { Button } from "./ui/button";
import { DialogHeader, DialogTitle } from "./ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "./ui/checkbox";
import ButtonGoogle from "./buttonGoogle";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z
      .string()
      .min(7, { message: "Password must be at least 7 characters long." }),
    passwordConfirmation: z.string(),
    privacyTerms: z
      .boolean()
      .refine((val) => val === true, {
        message: "You must agree to the privacy terms.",
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

const SignUpDialog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      privacyTerms: false,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Form data on submit:", data);
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const responseBody = await response.json; // Tente obter o texto da resposta
      console.log("Response body:", responseBody);

      if (response.ok) {
        // Signup successful
        router.push("/login"); //Redirect to login page
      } else {
        // Handle errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <DialogHeader className="space-y-4">
        <DialogTitle className="text-center">Faça seu registro</DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel className="text-left">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel className="text-left">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
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
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3">
                  <FormLabel className="text-left">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="privacyTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none text-left">
                    <FormLabel>I agree to the privacy terms</FormLabel>
                    <FormDescription className="text-left">
                      You must agree to our privacy terms to create an account.
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </Form>

        <ButtonGoogle />
      </DialogHeader>
    </>
  );
};

export default SignUpDialog;
