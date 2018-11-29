import { EventPayload, IResultMessage, ACTION_STATUS, IActionResult } from 'common/actions';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';
import { IPathwayService } from '../IPathwayService';

export type ListPathwayEventPayload = EventPayload<Array<Pathway>>;
export const LIST_PATHWAY_EVENT = 'LIST_PATHWAY_EVENT';

const listEventCreator = (status: ACTION_STATUS, aggregate?: Array<Pathway>, messages?: Array<IResultMessage>): Action<ListPathwayEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: LIST_PATHWAY_EVENT,
});

export const list = function (pathwayService: IPathwayService, filters?: string) {
  return async (dispatch) => {
    dispatch(listEventCreator('PENDING'));
    return pathwayService.all(filters).then((pathways: Array<Pathway>) => {
      dispatch(listEventCreator('SUCCESS', pathways));
      return pathways;
    }).catch((error) => {
      dispatch(listEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
