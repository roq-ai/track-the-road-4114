import axios from 'axios';
import queryString from 'query-string';
import { AmenityInterface, AmenityGetQueryInterface } from 'interfaces/amenity';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAmenities = async (query?: AmenityGetQueryInterface): Promise<PaginatedInterface<AmenityInterface>> => {
  const response = await axios.get('/api/amenities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAmenity = async (amenity: AmenityInterface) => {
  const response = await axios.post('/api/amenities', amenity);
  return response.data;
};

export const updateAmenityById = async (id: string, amenity: AmenityInterface) => {
  const response = await axios.put(`/api/amenities/${id}`, amenity);
  return response.data;
};

export const getAmenityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/amenities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAmenityById = async (id: string) => {
  const response = await axios.delete(`/api/amenities/${id}`);
  return response.data;
};
