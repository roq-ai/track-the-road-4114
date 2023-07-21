import { LocationInterface } from 'interfaces/location';
import { GetQueryInterface } from 'interfaces';

export interface AmenityInterface {
  id?: string;
  name: string;
  type: string;
  location_id?: string;
  created_at?: any;
  updated_at?: any;

  location?: LocationInterface;
  _count?: {};
}

export interface AmenityGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  location_id?: string;
}
