import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
    return (
        <div>
            this is the landing page
            <Link href="/home">
                <Button>Go to Home</Button>
            </Link>
        </div>
    )
};

export default LandingPage;