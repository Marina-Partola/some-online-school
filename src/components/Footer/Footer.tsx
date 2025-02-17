import Facebook from "@/public/companies/facebook.svg";
import Twitter from "@/public/companies/twitter.svg";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="pl-6 pr-6 bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between">
          <div>
            <div className="text-lg font-semibold text-primary">
              Some Online School
            </div>
            <div>{new Date().getFullYear()}</div>
          </div>

          <div className="flex space-x-4 h-6">
            <Link href="#" className="hover:text-primary">
              <Facebook className="h-6 w-6 fill-muted-foreground" />
            </Link>
            <Link href="#" className="hover:text-primary">
              <Twitter className="h-6 w-6 fill-muted-foreground" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
