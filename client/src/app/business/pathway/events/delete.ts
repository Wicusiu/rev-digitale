import { IPathwayService } from '../IPathwayService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type DeletePathwayEventPayload = EventPayload<string>;
export const DELETE_PATHWAY_EVENT = 'DELETE_PATHWAY_EVENT';

const deleteEventCreator = (status: ACTION_STATUS, aggregate?: string, messages?: Array<IResultMessage>): Action<DeletePathwayEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: DELETE_PATHWAY_EVENT,
});

// 'delete' word can't be used
export const remove = (pathwayService: IPathwayService, id: string) => {
  return async (dispatch) => {
    dispatch(deleteEventCreator('PENDING'));
    return pathwayService.delete(id).then((entityDeleteResult: IActionResult<string>) => {
      dispatch(deleteEventCreator('SUCCESS', entityDeleteResult.entity));
      return entityDeleteResult;
    }).catch((error) => {
      dispatch(deleteEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
