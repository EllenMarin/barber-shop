"use server"

import { db } from "../_lib/prisma"

interface CreateBookingParams{
    userId: string;
    serviceId: string;
    barbershopId: string; 
    date: Date;
}
export const createBooking = async (params: CreateBookingParams) => {
    await db.booking.create({
        data: params,
    })
}