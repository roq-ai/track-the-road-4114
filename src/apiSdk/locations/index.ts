import axios from 'axios';
import queryString from 'query-string';
import { LocationInterface, LocationGetQueryInterface } from 'interfaces/location';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getLocations = async (
  query?: LocationGetQueryInterface,
): Promise<PaginatedInterface<LocationInterface>> => {
  const response = await axios.get('/api/locations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createLocation = async (location: LocationInterface) => {
  const response = await axios.post('/api/locations', location);
  return response.data;
};

export const updateLocationById = async (id: string, location: LocationInterface) => {
  const response = await axios.put(`/api/locations/${id}`, location);
  return response.data;
};

export const getLocationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/locations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteLocationById = async (id: string) => {
  const response = await axios.delete(`/api/locations/${id}`);
  return response.data;
};
