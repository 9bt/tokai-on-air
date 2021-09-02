import { TokenCredentials } from '@azure/ms-rest-js';

import { TokaiOnAirApi } from '@/api-client/generated/tokaiOnAirApi';

const anonymousToken = 'anonymous';

export function createApiClientWithToken(token?: string): TokaiOnAirApi {
  return new TokaiOnAirApi(new TokenCredentials(token || anonymousToken), {
    baseUri: `${SERVER_BASE_URL}/`,
    noRetryPolicy: true,
  });
}
