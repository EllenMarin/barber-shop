import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return ( 
        <footer>
        <Card>
          <CardContent className="py-6 px-5">
            <p className="text-sm text-gray-400 font-semibold">
              2024 Copyright <span> Ellen Marin</span>
            </p>
          </CardContent>
        </Card>
      </footer>
     );
}
 
export default Footer;