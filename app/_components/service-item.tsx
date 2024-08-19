import { Service } from "@prisma/client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface ServiceItemProps { 
    service: Service 
}

const ServiceItem = ({service}: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-3">
            
            <div className="relative max-h-[110px] max-w-[110px] min-h-[110px] min-w-[110px]">
                <Image 
                    alt={service.name}
                    src={service.imageUrl}
                    fill
                    className="object-cover rounded-lg"
                    />
            </div>

            <div className="space-y-2 flex-1">
                <h3 className="text-sm font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.description}</p>
            

                <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-primary">
                        {Intl.NumberFormat("pt", {
                            style: "currency",
                            currency: "EUR",
                        }).format(Number(service.price)).replace("€", "")}
                        €
                    </p>

                    <Button variant="secondary" size="sm">
                        Marcar
                    </Button>
                    
                </div> 
            </div>
        
            </CardContent>
        </Card>
    )
}
 
export default ServiceItem;