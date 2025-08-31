import os
import django
from django.db import transaction

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from builder.models import PartComponent, TierConfig, TierPart

def seed_database():
    """
    Deletes all existing data and seeds the database with new PC parts and configurations.
    """
    print('Deleting old data...')
    PartComponent.objects.all().delete()
    TierPart.objects.all().delete()
    TierConfig.objects.all().delete()
    print('Old data deleted.')

    # New data structure matching the frontend and database models
    data = {
        "shared": [
            {"name": "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6000MHz", "shortName": "Trident Z5 32GB", "price": 105.00, "type": "ram"},
            {"name": "G.Skill Trident Z5 Neo RGB 64GB (2x32GB) DDR5 6000MHz", "shortName": "Trident Z5 64GB", "price": 210.00, "type": "ram"},
            {"name": "G.Skill Ripjaws S5 96GB (2x48GB) DDR5 6400MHz", "shortName": "Ripjaws S5 96GB", "price": 350.00, "type": "ram"},
            {"name": "Ironside Purple", "shortName": "Iron Purple", "price": 100.00, "type": "case", "image": "http://localhost:5173/preview-case-1.png"},
            {"name": "Minimalistic Blue", "shortName": "Min Blue", "price": 130.00, "type": "case", "image": "http://localhost:5173/preview-case-2.png"},
            {"name": "Anime Ayaya", "shortName": "Anime Pink", "price": 160.00, "type": "case", "image": "http://localhost:5173/preview-case-3.png"},
            {"name": "Samsung 980 PRO 1TB PCIe 4.0 NVMe SSD", "shortName": "980 PRO 1TB", "price": 110.00, "type": "storage"},
            {"name": "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD", "shortName": "990 PRO 2TB", "price": 200.00, "type": "storage"},
            {"name": "Samsung 990 PRO 4TB PCIe 4.0 NVMe SSD", "shortName": "990 PRO 4TB", "price": 400.00, "type": "storage"}
        ],
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
        
        print('Seeding tier configurations...')
        for tier, config_data in data['configs'].items():
            tier_config = TierConfig.objects.create(tier=tier)
            
            # Fixed components (including cooling) and part options
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
