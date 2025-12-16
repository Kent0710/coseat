interface WrapperProps {
    children: React.ReactNode;
    title?: string | React.ReactNode;
    description?: string;
}

export const PageWrapper = ({ children, title, description }: WrapperProps) => {
    return (
        <div className="flex flex-col gap-2">
            {/* Header  */}
            {(title || description) && (
                <header>
                    {title && (
                        <h1 className="text-2xl font-semibold">{title}</h1>
                    )}
                    {description && (
                        <p className="text-gray-600">{description}</p>
                    )}
                </header>
            )}

            <main className="space-y-8">{children}</main>
        </div>
    );
};

export const SectionWrapper = ({ children, title }: WrapperProps) => {
    return (
        <section className="flex flex-col gap-2">
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {children}
        </section>
    );
};
