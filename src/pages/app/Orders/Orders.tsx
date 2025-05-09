import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./Order-table-row";
import { OerderTableFilter } from "./Order-table-filter";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from 'zod'


export function Orders(){

    const [searchParams, setSearchParams] = useSearchParams()

    const orderId = searchParams.get("orderId")
    const customerName = searchParams.get("customerName")
    const status = searchParams.get("status")

    const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

    const {data: result} = useQuery({
        queryKey: ["orders", pageIndex, orderId, customerName, status],
        queryFn: () => getOrders({pageIndex, orderId, customerName, status: status === "all" ? null : status})
    })

    function handlePaginate(pageIndex: number) {
        setSearchParams((stateUrl) => {
            stateUrl.set("page", (pageIndex + 1).toString())
            
            return stateUrl
        })

    }

    return(
        <>
            <Helmet title="Pedidos"/>
            <div className="flex flex-col tracking-tight gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
           

                <div className="space-y-2.5">
                    <OerderTableFilter/>

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[64px]"></TableHead>
                                    <TableHead className="w-[140px]">Identificador</TableHead>
                                    <TableHead className="w-[180px]">Realizado há</TableHead>
                                    <TableHead className="w-[140px]">Status</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="w-[140px]">Total do pedido</TableHead>
                                    <TableHead className="w-[164px]"></TableHead>
                                    <TableHead className="w-[132px]"></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {result && result.orders.map((order)=> (
                                    <OrderTableRow key={order.orderId} order={order}/>

                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    
                    {result && (
                        <Pagination pageIndex={result.meta.pageIndex} totalCount={result.meta.totalCount} perPage={result.meta.perPage} onPageChange={handlePaginate}/>

                    )}
                </div>
            </div>
        </>
    )
}