import { IPathwayService } from '../IPathwayService';
import { EventPayload, ACTION_STATUS, IResultMessage, IActionResult } from 'common/actions';
import { Pathway, NewPathway } from 'app/api/mapper/swagger/typescript-fetch-client';
import { Action } from 'redux-actions';

export type AddPathwayEventPayload = EventPayload<Pathway>;
export const ADD_PATHWAY_EVENT = 'ADD_PATHWAY_EVENT';

const addEventCreator = (status: ACTION_STATUS, aggregate?: Pathway, messages?: Array<IResultMessage>): Action<AddPathwayEventPayload> => ({
  payload: {
    status,
    aggregate,
    messages,
  },
  type: ADD_PATHWAY_EVENT,
});

export const add = function (pathwayService: IPathwayService, args: NewPathway) {
  return async (dispatch) => {
    dispatch(addEventCreator('PENDING'));
    return pathwayService.add(args).then((entityAddResult: IActionResult<Pathway>) => {
      dispatch(addEventCreator('SUCCESS', entityAddResult.entity));
      return entityAddResult;
    }).catch((error) => {
      dispatch(addEventCreator('FAILURE', null, error));
      throw error;
    });
  };
};
