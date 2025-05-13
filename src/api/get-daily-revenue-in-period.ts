import { api } from "@/lib/axios";

export type GetDailyRevenueInPeriodResponse = {
    data: number
    receipt: number
}[]

export async function getDailyRevenueInPeriod() {
    const response = await api.get<GetDailyRevenueInPeriodResponse>("/metrics/daily-receipt-in-period")

    return response.data
}