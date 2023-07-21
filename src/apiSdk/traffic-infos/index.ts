import axios from 'axios';
import queryString from 'query-string';
import { TrafficInfoInterface, TrafficInfoGetQueryInterface } from 'interfaces/traffic-info';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTrafficInfos = async (
  query?: TrafficInfoGetQueryInterface,
): Promise<PaginatedInterface<TrafficInfoInterface>> => {
  const response = await axios.get('/api/traffic-infos', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTrafficInfo = async (trafficInfo: TrafficInfoInterface) => {
  const response = await axios.post('/api/traffic-infos', trafficInfo);
  return response.data;
};

export const updateTrafficInfoById = async (id: string, trafficInfo: TrafficInfoInterface) => {
  const response = await axios.put(`/api/traffic-infos/${id}`, trafficInfo);
  return response.data;
};

export const getTrafficInfoById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/traffic-infos/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTrafficInfoById = async (id: string) => {
  const response = await axios.delete(`/api/traffic-infos/${id}`);
  return response.data;
};
