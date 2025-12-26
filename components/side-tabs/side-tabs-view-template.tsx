interface SideTabsViewTemplateProps {
    title: string;
    description: string;
    children: React.ReactNode;
    className?: string;
}

const SideTabsViewTemplate: React.FC<SideTabsViewTemplateProps> = ({
    title,
    description,
    children,
    className,
}) => {
    return (
        <div className={className}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="border-b pb-4 mb-4 w-full">{description}</p>
            <div>{children}</div>
        </div>
    );
};

export default SideTabsViewTemplate;
