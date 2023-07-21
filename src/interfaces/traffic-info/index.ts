import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface TrafficInfoInterface {
  id?: string;
  traffic_status: string;
  alternative_route?: string;
  expected_clear_time?: any;
  cause?: string;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface TrafficInfoGetQueryInterface extends GetQueryInterface {
  id?: string;
  traffic_status?: string;
  alternative_route?: string;
  cause?: string;
  location_id?: string;
}
