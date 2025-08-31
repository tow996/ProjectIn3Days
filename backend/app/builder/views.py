import json
from django.http import HttpResponse, JsonResponse
from .models import PartComponent, TierConfig, TierPart
from django.views.decorators.csrf import csrf_exempt
from .helper import check_if_build_is_valid

@csrf_exempt
def builder_data_view(request):
    """
    An API view that returns all PC build data formatted for the frontend.
    """
    # Build shared components dictionary
    shared_parts = PartComponent.objects.filter(
        type__in=['ram', 'case', 'storage']
    ).order_by('type', 'price', 'name')
    
    shared_data = {}
    for part_type in ['ram', 'case', 'storage']:
        shared_data[part_type] = [
            {
                'name': part.name,
                'shortName': part.shortName,
                'price': str(part.price),
                'type': part.type,
                'image': part.image if part.image else None,
            }
            for part in shared_parts if part.type == part_type
        ]

    # Build tier configurations
    configs_data = []
    for tier_config in TierConfig.objects.all().order_by('tier'):
        tier_parts = TierPart.objects.filter(tier_config=tier_config).order_by('part_group', 'part_component__price', 'part_component__name')
        
        tier_data = {
            'tier': tier_config.tier,
            'components': [],
            'cpuOptions': [],
            'gpuOptions': [],
        }

        for tier_part in tier_parts:
            part = tier_part.part_component
            part_dict = {
                'name': part.name,
                'shortName': part.shortName,
                'price': str(part.price),
                'type': part.type,
                'image': part.image if part.image else None,
            }
            if tier_part.part_group == 'components':
                tier_data['components'].append(part_dict)
            elif tier_part.part_group == 'cpuOptions':
                tier_data['cpuOptions'].append(part_dict)
            elif tier_part.part_group == 'gpuOptions':
                tier_data['gpuOptions'].append(part_dict)
        
        configs_data.append(tier_data)
        
    final_data = {
        'shared': shared_data,
        'configs': configs_data,
    }
    
    return HttpResponse(json.dumps(final_data, indent=4), content_type="application/json")

@csrf_exempt
def validate_build(request):
    """
    An API view that validates a PC build configuration.
    """
    if request.method != 'POST':
        return JsonResponse({'isValid': False, 'error': 'Invalid request method'}, status=405)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({'isValid': False, 'error': 'Invalid JSON format'}, status=400)
    
    build_data = data.get('build')
    if not build_data:
        return JsonResponse({'isValid': False, 'error': 'Missing build data'}, status=400)
    
    required_fields = ['tier', 'cpu', 'gpu', 'ram', 'case', 'storage', 'motherboard', 'psu', 'cooling']
    for field in required_fields:
        if field not in build_data:
            return JsonResponse({'isValid': False, 'error': f'Missing field: {field}'}, status=400)

    check_result = check_if_build_is_valid(build_data)
    if check_result != 'Build configuration is valid':
        # Build is invalid, respond with isValid False and the error message
        return JsonResponse({'isValid': False, 'error': check_result}, status=400)

    # If valid, respond with isValid True
    return JsonResponse({'isValid': True, 'message': 'Build configuration is valid'}, status=200)