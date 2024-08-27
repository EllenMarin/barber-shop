import { Booking, Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { isFuture } from "date-fns";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";

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
  const {service: {barbershop}} = booking
  const isConfirmed = isFuture(booking.date)  
  return (
    <Sheet>
      <SheetTrigger className="w-full">
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
      </SheetTrigger>

      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da marcação</SheetTitle>
        </SheetHeader>

        <div className="relative h-[180px] w-full flex items-end mt-6">
          <Image 
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            src="/map.png"
            fill
            className="rounded-xl object-cover"
            />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge className="w-fit"
          variant={isConfirmed ? "default" : "secondary"}>
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mb-6 mt-3">
              <CardContent className="space-y-3 p-3">
                  <div className="flex items-center justify-between">
                      <h2 className="font-bold">{booking.service.name}</h2>
                      <p className="text-sm font-bold">
                      {Intl.NumberFormat("pt", {
                          style: "currency",
                          currency: "EUR",
                      }).format(Number(booking.service.price)).replace("€", "")}
                      €
                      </p>
                  </div>

                  <div className="flex items-center justify-between">
                      <h2 className="font-sm text-gray-400">Data</h2>
                      <p className="text-sm ">
                      {format(booking.date, "d 'de' MMM", {
                          locale: pt,
                      })}
                      </p>
                  </div>

                  <div className="flex items-center justify-between">
                      <h2 className="font-sm text-gray-400">Horário</h2>
                      <p className="text-sm ">
                      {format(booking.date, "HH:mm", {
                        locale: pt,
                      })}
                      </p>
                  </div>

                  <div className="flex items-center justify-between">
                      <h2 className="font-sm text-gray-400">Barbearia</h2>
                      <p className="text-sm ">
                      {barbershop.name}
                      </p>
                  </div>
              </CardContent>
          </Card>

          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
