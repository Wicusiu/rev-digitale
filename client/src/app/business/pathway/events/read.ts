import { IPathwayService } from '../IPathwayService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type ReadPathwayEventPayload = EventPayload<Pathway>;
export const READ_PATHWAY_EVENT = 'READ_PATHWAY_EVENT';

const readEventCreator = (status: ACTION_STATUS, aggregate?: Pathway, messages?: Array<IResultMessage>): Action<ReadPathwayEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: READ_PATHWAY_EVENT,
});

export const read = function (pathwayService: IPathwayService, id: string) {
  return async (dispatch) => {
    dispatch(readEventCreator('PENDING'));
    return pathwayService.read(id).then((pathway: Pathway) => {
      dispatch(readEventCreator('SUCCESS', pathway));
      return pathway;
    }).catch((error) => {
      dispatch(readEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
