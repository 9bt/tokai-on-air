/*
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import * as Parameters from "./models/parameters";
import { TokaiOnAirApiContext } from "./tokaiOnAirApiContext";

class TokaiOnAirApi extends TokaiOnAirApiContext {
  /**
   * Initializes a new instance of the TokaiOnAirApi class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param [options] The parameter options
   */
  constructor(credentials: msRest.ServiceClientCredentials, options?: Models.TokaiOnAirApiOptions) {
    super(credentials, options);
  }

  /**
   * 指定された動画の情報を取得します。
   * @summary 動画情報取得
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.FindVideoResponse>
   */
  findVideo(id: string, options?: msRest.RequestOptionsBase): Promise<Models.FindVideoResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  findVideo(id: string, callback: msRest.ServiceCallback<Models.V1Video>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  findVideo(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.V1Video>): void;
  findVideo(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.V1Video>, callback?: msRest.ServiceCallback<Models.V1Video>): Promise<Models.FindVideoResponse> {
    return this.sendOperationRequest(
      {
        id,
        options
      },
      findVideoOperationSpec,
      callback) as Promise<Models.FindVideoResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const findVideoOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "videos/{id}",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: Mappers.V1Video
    },
    default: {
      bodyMapper: Mappers.RpcStatus
    }
  },
  serializer
};

export {
  TokaiOnAirApi,
  TokaiOnAirApiContext,
  Models as TokaiOnAirApiModels,
  Mappers as TokaiOnAirApiMappers
};
