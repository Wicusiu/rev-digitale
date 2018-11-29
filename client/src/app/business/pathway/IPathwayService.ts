import { ICRUDService } from 'common/service/ICRUDService';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface IPathwayService extends ICRUDService<Pathway, string> {
}
