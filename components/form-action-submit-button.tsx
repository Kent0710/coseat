"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = ComponentProps<typeof Button>;

const FormActionSubmitButton: React.FC<ButtonProps> = ({
    children,
    ...props
}) => {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            {...props}
            disabled={pending}
            className="relative"
        >
            <span className={pending ? "invisible" : "visible"}>
                {children}
            </span>

            {pending && <Loader2 className="absolute h-4 w-4 animate-spin" />}
        </Button>
    );
};

export default FormActionSubmitButton;
