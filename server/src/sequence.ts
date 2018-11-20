import { inject } from '@loopback/context';
import {
  FindRoute,
  InvokeMethod,
  ParseParams,
  Reject,
  RequestContext,
  RestBindings,
  Send,
  SequenceHandler,
  StaticAssetsRoute,
} from '@loopback/rest';
import { AuthenticationBindings, AuthenticateFn } from '@loopback/authentication';

const SequenceActions = RestBindings.SequenceActions;

export class AppSequence implements SequenceHandler {
  constructor(
    @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
    @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
    @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
    @inject(SequenceActions.SEND) public send: Send,
    @inject(SequenceActions.REJECT) public reject: Reject,
    @inject(AuthenticationBindings.AUTH_ACTION)
    protected authenticateRequest: AuthenticateFn,
  ) { }

  async handle(context: RequestContext) {
    try {
      const { request, response } = context;
      const route = this.findRoute(request);

      // !!IMPORTANT: authenticateRequest fails on static routes!
      if (!(route instanceof StaticAssetsRoute)) {
        // Verify authentication cases
        const user = await this.authenticateRequest(request);

        // Verify user roles cases
        // await this.verifyUserRole(<UserRoleData>user)
      }

      const args = await this.parseParams(request, route);
      const result = await this.invoke(route, args);

      this.send(response, result);
    } catch (err) {
      this.reject(context, err);
    }
  }
}
