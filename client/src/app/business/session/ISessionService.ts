import { ICRUDService } from 'common/service/ICRUDService';
import { Session } from 'app/api/mapper/swagger/typescript-fetch-client';

export interface ISessionService extends ICRUDService<Session, string> {
  getByModuleId: (moduleId: string) => Promise<Array<Session>>;
  getByUserId: (userId: string) => Promise<Array<Session>>;
}
