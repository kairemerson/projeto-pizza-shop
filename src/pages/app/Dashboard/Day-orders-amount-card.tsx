import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";


export function DayOrdersAmountCard() {

    const {data: dayOrdersAmount} = useQuery({
        queryKey: ["metrics", "day-order-amounth"],
        queryFn: getDayOrdersAmount
    })
    
    return (
        <Card>
            <CardHeader className="flex items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-semibold">Pedidos (mês)</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent className="space-y-1">
                {dayOrdersAmount && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">
                            {dayOrdersAmount.amount.toLocaleString("pt-BR")}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                            {dayOrdersAmount.diffFromYesterday >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400" >
                                        +{dayOrdersAmount.diffFromYesterday}%
                                    </span>{" "}
                                    em relação a ontem
                                </>

                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400" >
                                        {dayOrdersAmount.diffFromYesterday}%
                                    </span>{" "}
                                    em relação a ontem
                                </>

                            )}
                        </p>
                    </>

                )}
            </CardContent>
        </Card>
    )
}