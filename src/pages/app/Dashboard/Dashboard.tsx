
import { Helmet } from "react-helmet-async"
import { MonthRevenueCard } from "./Month-revenue-card"
import { MonthOrdersAmountCard } from "./Month-orders-amount-card"
import { DayOrdersAmountCard } from "./Day-orders-amount-card"
import { MonthCanceledOrdersAmountCard } from "./month-canceled-orders-amount-card"
import { RevenueChart } from "./Revenue-chart"
import { PopularProductsChart } from "./Popular-products-chart"

export function Dashboard() {
    return(
        <>
            <Helmet title="Dashboard"/>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1> 

                <div className="grid grid-cols-4 gap-4">
                    <MonthRevenueCard/>
                    <MonthOrdersAmountCard/>
                    <DayOrdersAmountCard/>
                    <MonthCanceledOrdersAmountCard/>
                </div>

                <div className="grid grid-cols-9 gap-4">
                    <RevenueChart/>
                    <PopularProductsChart/>
                </div>
            </div>
        </>
    )
}