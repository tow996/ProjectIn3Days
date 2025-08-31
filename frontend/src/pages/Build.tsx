import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import {
    type BuilderAPIResponse,
    type PCBuild,
    type PartComponent as PartComponentType,
} from '../types/builder';
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Radio from '../components/reusable/Radio';
import PageLayout from '../layout/PageLayout';
import BuildComponent from '../components/Build/BuildComponent';
import { UserContext } from '../store/UserContext';
import { Link, useNavigate } from 'react-router-dom';

type Tiers = 'basic' | 'standard' | 'premium';
type SelectableComponentTypes = 'cpu' | 'gpu' | 'ram' | 'case' | 'storage';

const fetchData = async () => {
    const response = await api.get('/builder/data/');
    return response.data;
};

const Build = () => {
    const { data, isLoading, error } = useQuery<BuilderAPIResponse>({
        queryKey: ['pc-data'],
        queryFn: fetchData,
    });

    const [selectedTier, setSelectedTier] = useState<Tiers>('basic');

    const [build, setBuild] = useState<PCBuild>({
        cpu: null,
        gpu: null,
        motherboard: null,
        psu: null,
        ram: null,
        case: null,
        storage: null,
        cooling: null,
        totalPrice: 0,
        tier: null,
    });

    const user = useContext(UserContext);

    const imageRef = useRef<HTMLImageElement>(null);

    // 🔁 Animate image when case changes
    useEffect(() => {
        const img = imageRef.current;
        if (!img) return;

        img.classList.remove('image-fade-in');
        void img.offsetWidth;
        img.classList.add('image-fade-in');
    }, [build.case?.image]);

    // 🔁 Stable function to calculate total price
    const calculateTotalPrice = useCallback((currentBuild: PCBuild): number => {
        const parts = [
            currentBuild.cpu,
            currentBuild.gpu,
            currentBuild.motherboard,
            currentBuild.psu,
            currentBuild.ram,
            currentBuild.case,
            currentBuild.storage,
            currentBuild.cooling,
        ];
        return parts.reduce((sum, part) => {
            if (part?.price) {
                const price = parseFloat(part.price.replace(/,/g, '').replace('$', ''));
                return sum + price;
            }
            return sum;
        }, 0);
    }, []);

    // 🔁 Set default build when data or tier changes
    useEffect(() => {
        if (!data?.configs) return;

        const tierConfig = data.configs.find(config => config.tier === selectedTier);
        if (!tierConfig) return;

        const motherboard = tierConfig.components.find(c => c.type === 'motherboard') || null;
        const psu = tierConfig.components.find(c => c.type === 'psu') || null;
        const cooling = tierConfig.components.find(c => c.type === 'cooling') || null;

        const newBuild: PCBuild = {
            cpu: tierConfig.cpuOptions[0] || null,
            gpu: tierConfig.gpuOptions[0] || null,
            motherboard,
            psu,
            ram: data.shared.ram[0] || null,
            case: data.shared.case[0] || null,
            storage: data.shared.storage[0] || null,
            cooling,
            totalPrice: 0,
            tier: selectedTier,
        };

        const price = calculateTotalPrice(newBuild);
        setBuild({ ...newBuild, totalPrice: price });
    }, [data, selectedTier, calculateTotalPrice]);

    // 🔁 Change selected component
    const handleComponentChange = useCallback(
        (type: SelectableComponentTypes, name: string) => {
            setBuild(prevBuild => {
                let newComponent: PartComponentType | null = null;

                if (data) {
                    if (type === 'cpu' || type === 'gpu') {
                        const tierConfig = data.configs.find(config => config.tier === selectedTier);
                        if (tierConfig) {
                            const options = type === 'cpu' ? tierConfig.cpuOptions : tierConfig.gpuOptions;
                            newComponent = options.find(c => c.name === name) || null;
                        }
                    } else {
                        newComponent =
                            data.shared[type as keyof BuilderAPIResponse['shared']]?.find(c => c.name === name) || null;
                    }
                }

                const nextBuild = {
                    ...prevBuild,
                    [type]: newComponent,
                };

                const price = calculateTotalPrice(nextBuild);
                return { ...nextBuild, totalPrice: price };
            });
        },
        [data, selectedTier, calculateTotalPrice]
    );

    const handleTierChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTier(event.target.value as Tiers);
    }, []);

    // 🔁 Memoize current config and sorted tiers
    const currentTierConfig = useMemo(() => {
        return data?.configs.find(config => config.tier === selectedTier);
    }, [data, selectedTier]);

    const sortedConfigs = useMemo(() => {
        if (!data?.configs) return [];
        const order = ['basic', 'standard', 'premium'];
        return [...data.configs].sort((a, b) => order.indexOf(a.tier) - order.indexOf(b.tier));
    }, [data]);

    const navigate = useNavigate();

    const handleOrder = useCallback(() => {
        const randomString = Math.random().toString(36).substring(2, 15); 
        const buildData = {
            ...build,
        }
        console.log(buildData);
        sessionStorage.setItem(randomString, JSON.stringify(buildData));
        navigate('/checkout/' + randomString);
    }, [build, navigate]);

    if (isLoading) {
        return (    
            <PageLayout>
                <div className='build-wrapper'>
                    <p>Loading...</p>
                </div>
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout>
                <div className='build-wrapper'>
                    <p>Error: {error.message}</p>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <title>Build - Nexus PC</title>
            <div className='build-wrapper'>
                <div className='pc-container'>
                    <img
                        ref={imageRef}
                        src={build.case?.image}
                        alt='PC Placeholder'
                        className='pc-image image-fade-in'
                    />
                </div>

                <div className='pc-details-container'>
                    <div className='select-tier'>
                        <div className='radio-wrapper'>
                            {sortedConfigs.map(config => (
                                <Radio
                                    key={config.tier}
                                    id={`tier-${config.tier}`}
                                    name='tier'
                                    className={`tier-${config.tier}`}
                                    label={config.tier.toUpperCase()}
                                    value={config.tier}
                                    checked={selectedTier === config.tier}
                                    onChange={handleTierChange}
                                />
                            ))}
                        </div>
                    </div>

                    <div className='components'>
                        {currentTierConfig && (
                            <BuildComponent
                                title='CPU'
                                name='cpu'
                                options={currentTierConfig.cpuOptions}
                                selectedValue={build.cpu?.name || null}
                                onChange={name => handleComponentChange('cpu', name)}
                            />
                        )}

                        {currentTierConfig && (
                            <BuildComponent
                                title='GPU'
                                name='gpu'
                                options={currentTierConfig.gpuOptions}
                                selectedValue={build.gpu?.name || null}
                                onChange={name => handleComponentChange('gpu', name)}
                            />
                        )}

                        {data?.shared.ram && (
                            <BuildComponent
                                title='RAM'
                                name='ram'
                                options={data.shared.ram}
                                selectedValue={build.ram?.name || null}
                                onChange={name => handleComponentChange('ram', name)}
                            />
                        )}

                        {data?.shared.storage && (
                            <BuildComponent
                                title='Storage'
                                name='storage'
                                options={data.shared.storage}
                                selectedValue={build.storage?.name || null}
                                onChange={name => handleComponentChange('storage', name)}
                            />
                        )}

                        {data?.shared.case && (
                            <BuildComponent
                                title='Case'
                                name='case'
                                options={data.shared.case}
                                selectedValue={build.case?.name || null}
                                onChange={name => handleComponentChange('case', name)}
                            />
                        )}
                    </div>

                    <div className='total-price'>
                        <h2>Total Price: <span>${build.totalPrice.toFixed(2)}</span></h2>
                    </div>

                    <div className='order-now'>
                        {user.loggedIn ? (
                            <button className='btn primary' onClick={handleOrder}>Order Now!</button>
                        ) : (
                            <Link to='/signup'><button>Order Now!</button></Link>
                        )}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Build;
