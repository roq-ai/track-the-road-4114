import { AmenityInterface } from 'interfaces/amenity';
import { TrafficInfoInterface } from 'interfaces/traffic-info';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface LocationInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  amenity?: AmenityInterface[];
  traffic_info?: TrafficInfoInterface[];
  user?: UserInterface;
  _count?: {
    amenity?: number;
    traffic_info?: number;
  };
}

export interface LocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
