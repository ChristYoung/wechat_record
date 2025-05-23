import { Button } from '@/components/ui/button';

export const Layout: React.FC = () => {
    return <div className='__Layout flex gap-2 h-full w-full items-center justify-center m-5'>
        <div className='flex-1'>1</div>
        <div className='flex-3'>3
            <Button className='cursor-pointer'>Click me</Button>
        </div>
    </div>;
};
