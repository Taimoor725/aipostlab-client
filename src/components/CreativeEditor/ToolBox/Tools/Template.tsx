
interface ToolTemplateProps {
    children: React.ReactNode;
    title: string;
}

const ToolTemplate = ({ children, title }: ToolTemplateProps) => (
    <div className='flex flex-col w-full h-full items-start justify-start px-4'>
        <div className='flex items-center justify-center gap-1 mb-6'>
            <img width={"100px"} height={"100px"} src={`/icons/${title}.svg`} alt={title} className="w-8 h-8 cursor-pointer" />
            <div className='font-bold'>{title}</div>
        </div>
        {children}
    </div>
);

export default ToolTemplate;
