import { api } from "@/lib/axios";


export interface GetManagedRestauranteResponse {
    
    id: string;
    name: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    description: string | null;
    managerId: string | null;
    
}

export async function getManagedRestaurant() {
    const response = await api.get<GetManagedRestauranteResponse>("/managed-restaurant")

    return response.data
}