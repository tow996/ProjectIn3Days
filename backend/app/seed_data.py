import os
import django
from django.db import transaction

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Import all necessary models
from builder.models import PartComponent, TierConfig, TierPart
from peripherals.models import Peripheral

def seed_database():
    """
    Deletes all existing data and seeds the database with new PC parts, peripherals, and configurations.
    """
    print('Deleting old data...')
    # Delete data from all models to ensure a clean slate
    PartComponent.objects.all().delete()
    Peripheral.objects.all().delete()
    TierPart.objects.all().delete()
    TierConfig.objects.all().delete()
    print('Old data deleted.')

    # New data structure including PC components, peripherals, and configurations
    data = {
        # Standard PC components that can be used in configurations
        "shared": [
            {"name": "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz", "shortName": "Trident Z5 32GB", "price": 105.00, "type": "ram"},
            {"name": "G.Skill Trident Z5 Neo RGB 64GB (2x32GB) DDR5 6000MHz", "shortName": "Trident Z5 64GB", "price": 210.00, "type": "ram"},
            {"name": "G.Skill Ripjaws S5 96GB (2x48GB) DDR5 6400MHz", "shortName": "Ripjaws S5 96GB", "price": 350.00, "type": "ram"},
            {"name": "Ironside Purple", "shortName": "Iron Purple", "price": 100.00, "type": "case", "image": "http://localhost:5173/preview-case-1.png"},
            {"name": "Minimalistic Blue", "shortName": "Min Blue", "price": 130.00, "type": "case", "image": "http://localhost:5173/preview-case-2.png"},
            {"name": "Anime Ayaya", "shortName": "Anime Pink", "price": 160.00, "type": "case", "image": "http://localhost:5173/preview-case-3.png"},
            {"name": "Samsung 980 PRO 1TB PCIe 4.0 NVMe SSD", "shortName": "980 PRO 1TB", "price": 110.00, "type": "storage"},
            {"name": "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD", "shortName": "990 PRO 2TB", "price": 200.00, "type": "storage"},
            {"name": "Samsung 990 PRO 4TB PCIe 4.0 NVMe SSD", "shortName": "990 PRO 4TB", "price": 400.00, "type": "storage"},
        ],
        # Peripherals with a JSON description field and specific image URLs
        "peripherals": [
            # Headsets
            {
                "name": "AuraFlow Aurora", 
                "shortName": "Aura Aurora", 
                "price": 129.99, 
                "type": "headset", 
                "image": "http://localhost:5173/peripherals/headset_1.png",
                "description": {
                    "audio_driver": "50mm Neodymium",
                    "connectivity": "Wireless (2.4GHz) / Wired (USB-C)",
                    "features": "RGB lighting, detachable noise-cancelling microphone, 30-hour battery life",
                    "compatibility": "PC, PS5, Xbox Series X|S, Nintendo Switch"
                }
            },
            {
                "name": "SonicPulse Vortex", 
                "shortName": "Sonic Vortex", 
                "price": 89.50, 
                "type": "headset", 
                "image": "http://localhost:5173/peripherals/headset_2.png",
                "description": {
                    "audio_driver": "40mm High-Fidelity",
                    "connectivity": "Wired (3.5mm Jack)",
                    "features": "In-line volume controls, lightweight design, breathable earcup cushions",
                    "compatibility": "PC, Mac, Xbox, PlayStation, Mobile"
                }
            },
            {
                "name": "EchoGlide Phantom", 
                "shortName": "Echo Phantom", 
                "price": 249.00, 
                "type": "headset", 
                "image": "http://localhost:5173/peripherals/headset_3.png",
                "description": {
                    "audio_driver": "Planar Magnetic",
                    "connectivity": "Wireless (Bluetooth 5.2) / Wired (USB-C)",
                    "features": "Active noise cancellation, spatial audio support, premium aluminum build",
                    "compatibility": "PC, Mac, PS5"
                },
                "discount": 20.00
            },
            # Keyboards
            {
                "name": "Titanium Tactile", 
                "shortName": "Titanium T", 
                "price": 185.75, 
                "type": "keyboard", 
                "image": "http://localhost:5173/peripherals/keyboard_1.png",
                "description": {
                    "switch_type": "Tactile Mechanical Switches",
                    "layout": "Full-size",
                    "features": "Per-key RGB, programmable macros, USB-passthrough",
                    "material": "Brushed aluminum frame"
                }
            },
            {
                "name": "Epsilon 65", 
                "shortName": "Epsilon 65", 
                "price": 110.00, 
                "type": "keyboard", 
                "image": "http://localhost:5173/peripherals/keyboard_2.png",
                "description": {
                    "switch_type": "Linear Hot-swappable Switches",
                    "layout": "65% Compact",
                    "features": "Sound-dampening foam, PBT keycaps, coiled cable included",
                    "material": "Plastic"
                }
            },
            # Mice
            {
                "name": "Stealth Stinger", 
                "shortName": "Stealth Stinger", 
                "price": 75.00, 
                "type": "mouse", 
                "image": "http://localhost:5173/peripherals/mouse_1.png",
                "description": {
                    "sensor": "Hyperion 16K Optical Sensor",
                    "DPI": "16,000 max",
                    "buttons": "6 programmable buttons",
                    "weight": "85g (lightweight)"
                }
            },
            {
                "name": "Quantum Clicks", 
                "shortName": "Quantum Clicks", 
                "price": 55.00, 
                "type": "mouse", 
                "image": "http://localhost:5173/peripherals/mouse_2.png",
                "description": {
                    "sensor": "Phoenix 12K Sensor",
                    "DPI": "12,000 max",
                    "buttons": "8 buttons, side-scroll wheel",
                    "weight": "95g"
                },
                "discount": 10.00
            },
            {
                "name": "GlideForce Pro", 
                "shortName": "GlideForce Pro", 
                "price": 120.00, 
                "type": "mouse", 
                "image": "http://localhost:5173/peripherals/mouse_3.png",
                "description": {
                    "sensor": "Mercury 24K Sensor",
                    "DPI": "24,000 max",
                    "buttons": "12 buttons (MMO-style), modular side plate",
                    "weight": "115g"
                }
            },
            # Mousepads
            {
                "name": "Cosmic Drift XL", 
                "shortName": "Cosmic Drift", 
                "price": 29.99, 
                "type": "mousepad", 
                "image": "http://localhost:5173/peripherals/mousepad_1.png",
                "description": {
                    "material": "Micro-woven cloth surface",
                    "size": "Extra-Large (900 x 400 mm)",
                    "features": "Non-slip rubber base, stitched edges",
                    "design": "Galaxy print"
                }
            },
            {
                "name": "PolyGlide Precision", 
                "shortName": "PolyGlide", 
                "price": 19.50, 
                "type": "mousepad", 
                "image": "http://localhost:5173/peripherals/mousepad_2.png",
                "description": {
                    "material": "Hard polymer surface",
                    "size": "Medium (350 x 250 mm)",
                    "features": "Optimized for high-DPI tracking, easy to clean",
                    "design": "Monochrome"
                }
            },
            {
                "name": "FiberWeave RGB", 
                "shortName": "FiberWeave RGB", 
                "price": 45.00, 
                "type": "mousepad", 
                "image": "http://localhost:5173/peripherals/mousepad_3.png",
                "description": {
                    "material": "Hybrid fiber surface",
                    "size": "Extended (900 x 400 mm)",
                    "features": "16.8 million color RGB edge lighting, detachable cable",
                    "design": "Geometric pattern"
                }
            },
            # Monitors
            {
                "name": "Visual Horizon 27", 
                "shortName": "Horizon 27", 
                "price": 350.00, 
                "type": "monitor", 
                "image": "http://localhost:5173/peripherals/monitor_1.png",
                "description": {
                    "size": "27-inch",
                    "resolution": "1440p",
                    "refresh_rate": "144Hz",
                    "panel_type": "IPS",
                    "features": "AMD FreeSync Premium, HDR400, VESA mountable"
                }
            },
            {
                "name": "Clarity Edge 32", 
                "shortName": "Clarity Edge", 
                "price": 599.00, 
                "type": "monitor", 
                "image": "http://localhost:5173/peripherals/monitor_2.png",
                "description": {
                    "size": "32-inch",
                    "resolution": "4K (3840x2160)",
                    "refresh_rate": "165Hz",
                    "panel_type": "Mini-LED",
                    "features": "NVIDIA G-Sync Ultimate, DisplayHDR 1000, USB-C Power Delivery"
                }
            },
            {
                "name": "SpectraView 24", 
                "shortName": "SpectraView", 
                "price": 199.99, 
                "type": "monitor", 
                "image": "http://localhost:5173/peripherals/monitor_3.png",
                "description": {
                    "size": "24-inch",
                    "resolution": "1080p",
                    "refresh_rate": "75Hz",
                    "panel_type": "VA",
                    "features": "Built-in speakers, low blue light filter"
                }
            }
        ],
        # PC configurations
        "configs": {
            "basic": {
                "components": [
                    {"name": "MSI B650 Gaming Plus WiFi", "shortName": "MSI B650", "price": 180.00, "type": "motherboard"},
                    {"name": "Corsair RM750e 750W 80+ Gold", "shortName": "Corsair RM750e", "price": 100.00, "type": "psu"},
                    {"name": "Corsair iCUE H100i ELITE CAPELLIX XT", "shortName": "H100i XT", "price": 180.00, "type": "cooling"}
                ],
                "cpuOptions": [
                    {"name": "AMD Ryzen 5 9600X", "shortName": "Ryzen 5 9600X", "price": 299.00, "type": "cpu"},
                    {"name": "AMD Ryzen 7 7700X", "shortName": "Ryzen 7 7700X", "price": 320.00, "type": "cpu"}
                ],
                "gpuOptions": [
                    {"name": "AMD Radeon RX 7600", "shortName": "RX 7600", "price": 270.00, "type": "gpu"},
                    {"name": "NVIDIA GeForce RTX 4060", "shortName": "RTX 4060", "price": 290.00, "type": "gpu"}
                ]
            },
            "standard": {
                "components": [
                    {"name": "ASUS ROG Strix B650-A Gaming WiFi", "shortName": "ASUS Strix B650-A", "price": 220.00, "type": "motherboard"},
                    {"name": "Seasonic Focus GX-850 850W 80+ Gold", "shortName": "Seasonic GX-850", "price": 130.00, "type": "psu"},
                    {"name": "Corsair iCUE H150i ELITE CAPELLIX XT", "shortName": "H150i XT", "price": 230.00, "type": "cooling"}
                ],
                "cpuOptions": [
                    {"name": "AMD Ryzen 7 7800X3D", "shortName": "Ryzen 7 7800X3D", "price": 350.00, "type": "cpu"},
                    {"name": "AMD Ryzen 7 9700X", "shortName": "Ryzen 7 9700X", "price": 330.00, "type": "cpu"}
                ],
                "gpuOptions": [
                    {"name": "AMD Radeon RX 7800 XT", "shortName": "RX 7800 XT", "price": 470.00, "type": "gpu"},
                    {"name": "NVIDIA GeForce RTX 4070 SUPER", "shortName": "RTX 4070 SUPER", "price": 600.00, "type": "gpu"}
                ]
            },
            "premium": {
                "components": [
                    {"name": "Gigabyte X670E AORUS Master", "shortName": "X670E AORUS Master", "price": 450.00, "type": "motherboard"},
                    {"name": "Corsair HX1200 1200W 80+ Platinum", "shortName": "Corsair HX1200", "price": 250.00, "type": "psu"},
                    {"name": "Corsair iCUE H170i ELITE CAPELLIX XT", "shortName": "H170i XT", "price": 260.00, "type": "cooling"}
                ],
                "cpuOptions": [
                    {"name": "AMD Ryzen 9 9950X3D", "shortName": "Ryzen 9 9950X3D", "price": 699.00, "type": "cpu"},
                    {"name": "AMD Ryzen 9 9900X3D", "shortName": "Ryzen 9 9900X3D", "price": 599.00, "type": "cpu"}
                ],
                "gpuOptions": [
                    {"name": "NVIDIA GeForce RTX 5080", "shortName": "RTX 5080", "price": 1499.00, "type": "gpu"},
                    {"name": "AMD Radeon RX 9070 XT", "shortName": "RX 9070 XT", "price": 720.00, "type": "gpu"}
                ]
            }
        }
    }

    with transaction.atomic():
        print('Seeding shared components...')
        for component_data in data['shared']:
            PartComponent.objects.create(
                name=component_data['name'],
                shortName=component_data['shortName'],
                price=component_data['price'],
                type=component_data['type'],
                image=component_data.get('image', '')
            )
        
        print('Seeding peripherals...')
        for peripheral_data in data['peripherals']:
            Peripheral.objects.create(
                name=peripheral_data['name'],
                shortName=peripheral_data['shortName'],
                price=peripheral_data['price'],
                type=peripheral_data['type'],
                image=peripheral_data.get('image', ''),
                discount=peripheral_data.get('discount', 0.00),
                description=peripheral_data.get('description', {})
            )

        print('Seeding tier configurations...')
        for tier, config_data in data['configs'].items():
            tier_config = TierConfig.objects.create(tier=tier)
            
            for group, components in config_data.items():
                for component_data in components:
                    part = PartComponent.objects.create(
                        name=component_data['name'],
                        shortName=component_data['shortName'],
                        price=component_data['price'],
                        type=component_data['type']
                    )
                    TierPart.objects.create(
                        tier_config=tier_config,
                        part_component=part,
                        part_group=group
                    )
    print('Database seeded successfully!')

if __name__ == '__main__':
    seed_database()
