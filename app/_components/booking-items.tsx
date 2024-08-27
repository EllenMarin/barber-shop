import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { isFuture } from "date-fns";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({booking}: BookingItemProps) => { 
  const isConfirmed = isFuture(booking.date)  
  return (
    <>
        
      <Card className="min-w-[90%]">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge 
              className="w-fit"
              variant={isConfirmed ? "default" : "secondary"}>{isConfirmed ? "Confirmado" : "Finalizado"}</Badge>
            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl}/>
              </Avatar>
              <p className="txt-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center border-l-2 border-solid justify-center px-5">
            <p className="text-sm capitalize">
              {format(booking.date, "MMMM", {locale: pt})}
            </p>
            <p className="text-2xl">
              {format(booking.date, "dd", {locale: pt})}
            </p>
            <p className="text-sm">
              {format(booking.date, "HH:mm", {locale: pt})}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
