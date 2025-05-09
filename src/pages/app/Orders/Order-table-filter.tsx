import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


const orderFilterSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional()
})

type OrderFlterSchema = z.infer<typeof orderFilterSchema>

export function OerderTableFilter() {

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const status = searchParams.get("status")

    const {register, handleSubmit, control, reset} = useForm<OrderFlterSchema>({
        resolver: zodResolver(orderFilterSchema),
        defaultValues: {
            orderId: orderId ?? "",
            customerName: customerName ?? "",
            status: status ?? "all"
        }
    })

    function handleFilter({orderId, customerName, status}: OrderFlterSchema) {
        setSearchParams((stateUrl) => {
            
            if(orderId) {
                stateUrl.set("orderId", orderId)
            }else {
                stateUrl.delete("orderId")
            }
            
            if(customerName) {
                stateUrl.set("customerName", customerName)
            }else {
                stateUrl.delete("customerName")
            }

            if(status) {
                stateUrl.set("status", status)
            }else {
                stateUrl.delete("status")
            }

            stateUrl.set("page", "1")

            return stateUrl
        })
    }

    function handleClearFilters() {
        setSearchParams((stateUrl) => {
            stateUrl.delete("orderId")
            stateUrl.delete("customerName")
            stateUrl.delete("status")
            stateUrl.set("page", "1")

            return stateUrl
        })

        reset({
            orderId: "",
            customerName: "",
            status: "all"
        })
    }

    return(
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="Id do pedido" className="h-8 w-auto" {...register("orderId")}/>
            <Input placeholder="Nome do cliente" className="h-8 w-[320px]" {...register("customerName")}/>
            
            <Controller 
                name="status"
                control={control}
                render={({field: {name, onChange, value, disabled}})=> (
                    <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
                        <SelectTrigger className="h-8 w-[180px]">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="pending">Pendente</SelectItem>
                            <SelectItem value="canceled">Cancelado</SelectItem>
                            <SelectItem value="processing">Em preparo</SelectItem>
                            <SelectItem value="delivering">Em entrega</SelectItem>
                            <SelectItem value="delivered">Entregue</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
            

            <Button variant="secondary" type="submit" size="xs">
                <Search className="h-4 w-4 mr-2"/>
                Filtrar
            </Button>

            <Button variant="outline" type="button" size="xs" onClick={handleClearFilters}>
                <X className="h-4 w-4 mr-2"/>
                Remover filtros
            </Button>
        </form>
    )
}