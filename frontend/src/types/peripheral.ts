export type Peripheral = {
    id: number
    name: string
    shortName: string
    price: number
    discount: number
    type: 'headset' | 'keyboard' | 'mouse' | 'mousepad' | 'monitor'
    image?: string
    description: { [key: string]: string }
}

export type PeripheralResponse = {
    peripherals: Peripheral[]
}
