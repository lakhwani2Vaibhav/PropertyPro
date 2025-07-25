import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ArrowRight, Sprout } from "lucide-react";


export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
             <div className="h-7 w-7 bg-primary rounded-md flex items-center justify-center">
                <Sprout className="h-5 w-5 text-primary-foreground" />
             </div>
            <h1 className="text-2xl font-bold">PropertyPro</h1>
          </div>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Get started with simplified property management today.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="John Doe" required />
            </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
           <Link href="/dashboard" className="w-full">
            <Button className="w-full">
                Create Account <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
