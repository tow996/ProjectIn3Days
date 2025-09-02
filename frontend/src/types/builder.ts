export type PartComponent = {
    name: string;
    shortName: string; 
    price: string;
    type: 'cpu' | 'gpu' | 'motherboard' | 'psu' | 'ram' | 'case' | 'storage' | 'cooling';
    image?: string; 
};

export type PCBuild = {
    id: number;
    name: string;
    cpu: PartComponent | null;
    gpu: PartComponent | null;
    motherboard: PartComponent | null;
    psu: PartComponent | null;
    ram: PartComponent | null;
    case: PartComponent | null;
    storage: PartComponent | null;
    cooling: PartComponent | null;
    price: number;
    tier: string | null;
    image?: string;
};

export type BuilderAPIResponse = {
    shared: {
        ram: PartComponent[];
        case: PartComponent[];
        storage: PartComponent[];
    };
    configs: {
        tier: string;
        components: PartComponent[];
        cpuOptions: PartComponent[];
        gpuOptions: PartComponent[];
    }[];
};

