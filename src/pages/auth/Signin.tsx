import { Helmet } from "react-helmet-async";
import {useForm} from "react-hook-form";
import {z} from "zod"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";

const signInForm = z.object({
    email: z.string().email()
})

type SignInForm = z.infer<typeof signInForm>

export function Signin() {

    const [searchParams] = useSearchParams()

    const {register, handleSubmit, formState: {isSubmitting}} = useForm<SignInForm>({
        defaultValues: {email: searchParams.get("email") ?? ""}
    })

    const {mutateAsync: authenticate} = useMutation({
        mutationFn: signIn
    })

    async function handleSignin(data: SignInForm) {
        try {
            await authenticate({email: data.email})
            toast.success("sucesso", {
                action: {
                    label: "reenviar",
                    onClick: () => handleSignin(data)
                }
            })
            
        } catch (error) {
            toast.error("Credenciais inválidas")
            console.log(error);
            
        }
    }

    return (
        <>
            <Helmet title="Login"/>
            <div className="p-8">
                <Button variant="ghost" asChild className="absolute right-8 top-8"> 
                    <Link to="/sign-up" className="">Novo estabelecimento</Link>

                </Button>

                <div className="w-[350px] flex flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Acessar Painel</h1>
                        <p className="text-sm text-muted-foreground">Acompanhe suas vendas pelo painel do paerceiro!</p>
                    </div>
                    <form action="" className="space-y-4" onSubmit={handleSubmit(handleSignin)}>
                        <div className="space-y-2">
                            <Label htmlFor="email">Seu email</Label>
                            <Input id="email" type="email" {...register("email")}/>
                        </div>

                        <Button className="w-full" type="submit" disabled={isSubmitting}>Acessar Painel</Button>
                    </form>

                </div>

            </div>
        </>
    )
}