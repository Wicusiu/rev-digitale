
import { IPathwayService } from '../IPathwayService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Pathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type UpdatePathwayEventPayload = EventPayload<Pathway>;
export const UPDATE_PATHWAY_EVENT = 'UPDATE_PATHWAY_EVENT';

const updateEventCreator = (status: ACTION_STATUS, aggregate?: Pathway, messages?: Array<IResultMessage>): Action<UpdatePathwayEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: UPDATE_PATHWAY_EVENT,
});

export const update = function (pathwayService: IPathwayService, entity: Pathway) {
  return async (dispatch) => {
    dispatch(updateEventCreator('PENDING'));
    return pathwayService.update(entity).then((entityUpdateResult: IActionResult<Pathway>) => {
      dispatch(updateEventCreator('SUCCESS', entityUpdateResult.entity));
      return entityUpdateResult;
    }).catch((error) => {
      dispatch(updateEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
