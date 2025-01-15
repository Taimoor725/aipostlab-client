import useToolboxStore from '../../../../store/ToolBoxStore.js';


const PaletteToolMenu = () => {
    const { colorSwatches, recentColors, setActiveColor, addRecentColor, addCustomColor, activeColor } = useToolboxStore();

    const ColorOption = ({ color, onClick }: { color: string; onClick(color: string): void }) =>
    (
        <div className="w-6 h-6 rounded-sm cursor-pointer" title={color} style={{ backgroundColor: color }}
            onClick={(e) => { e.stopPropagation(); onClick(color) }} />
    )

    return (
        <div className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
                <div className='text-sm font-bold'>Recent Colors</div>
                <div className='grid grid-cols-5 w-full gap-2'>
                    {
                        recentColors.map((color: string, idx: number) => (
                            <ColorOption color={color} key={idx} onClick={(color) => setActiveColor(color)} />
                        ))
                    }
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='text-sm font-bold'>Solid Colors</div>
                <div className='grid grid-cols-6 w-full gap-2'>
                    {
                        colorSwatches.map((color: string, idx: number) => (
                            <ColorOption color={color} key={idx} onClick={(color) => { setActiveColor(color); addRecentColor(color); }} />
                        ))
                    }
                </div>
            </div>
            <button className='w-full text-sm text-center bg-gray-600 text-white p-2 rounded-lg cursor-pointer'>
                <label htmlFor="color-input" className="cursor-pointer m-0 p-0">Add Custom Color</label>
                <input
                    id="color-input"
                    type="color"
                    onSelect={(e: any) => addCustomColor(e.target.value)}
                    className="w-0 h-0 cursor-pointer border-none opacity-0 border-0 absolute"
                />
            </button>
        </div>
    )
};

export default PaletteToolMenu;
