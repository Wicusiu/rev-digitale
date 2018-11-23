import { ICRUDService } from 'common/service/ICRUDService';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface ISessionService extends ICRUDService<Session, string> { }
