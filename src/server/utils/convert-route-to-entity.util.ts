const mapping: Record<string, string> = {
  amenities: 'amenity',
  locations: 'location',
  providers: 'provider',
  'traffic-infos': 'traffic_info',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
