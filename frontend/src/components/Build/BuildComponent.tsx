import Radio from '../reusable/Radio';
import { type PartComponent } from '../../types/builder';
import { GiCpu } from 'react-icons/gi';
import { BsGpuCard } from 'react-icons/bs';
import { FaMemory } from 'react-icons/fa';
import { SiGooglecloudstorage } from 'react-icons/si';
import { PiComputerTowerFill } from 'react-icons/pi';

type BuildComponentProps = {
    title: string;
    name: string;
    options: PartComponent[];
    selectedValue: string | null;
    onChange: (name: string) => void;
};

const IconMap = {
    cpu: <GiCpu />,
    gpu: <BsGpuCard />,
    ram: <FaMemory />,
    storage: <SiGooglecloudstorage />,
    case: <PiComputerTowerFill />
};

const BuildComponent: React.FC<BuildComponentProps> = ({ title, name, options, selectedValue, onChange }) => {
    return (
        <div className='component'>
            <span className='component-title'>
                {IconMap[name as keyof typeof IconMap]}
                {title}
            </span>
            <div className='radio-wrapper'>
                {options.map((component) => (
                    <Radio
                        key={component.name}
                        id={`${name}-${component.name}`}
                        name={name}
                        label={component.shortName}
                        secondLabel={`$${component.price}`}
                        value={component.name}
                        checked={selectedValue === component.name}
                        onChange={() => onChange(component.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BuildComponent;
