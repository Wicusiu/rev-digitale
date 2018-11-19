import { ICRUDService } from 'common/service/ICRUDService';
import { Brick } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface IBrickService extends ICRUDService<Brick, string> { }
