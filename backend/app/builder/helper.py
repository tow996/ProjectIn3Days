from .models import PartComponent, TierConfig

def check_if_build_is_valid(build):
    """
    Validates a given PC build configuration efficiently.
    """

    tier = build.get('tier')
    try:
        tier_config = TierConfig.objects.get(tier=tier)
    except TierConfig.DoesNotExist:
        return 'Invalid tier selected'
    
    required_parts = {
        'cpu': build.get('cpu', {}).get('name'),
        'gpu': build.get('gpu', {}).get('name'),
        'case': build.get('case', {}).get('name'),
        'psu': build.get('psu', {}).get('name'),
        'motherboard': build.get('motherboard', {}).get('name'),
        'cooling': build.get('cooling', {}).get('name'),
        'ram': build.get('ram', {}).get('name'),
        'storage': build.get('storage', {}).get('name'),
    }

    # Fetch all needed parts in one query
    part_names = list(required_parts.values())
    fetched_parts = PartComponent.objects.filter(name__in=part_names)

    # Create a lookup of (name, type) -> PartComponent
    part_lookup = {(part.name, part.type): part for part in fetched_parts}

    for part_type, part_name in required_parts.items():
        if (part_name, part_type) not in part_lookup:
            return f'Invalid {part_type.capitalize()} selected for the chosen tier'

    return 'Build configuration is valid'
