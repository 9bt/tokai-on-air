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
   * 動画の一覧を取得します。
   * @summary 動画一覧取得
   * @param [options] The optional parameters
   * @returns Promise<Models.ListVideosResponse>
   */
  listVideos(options?: Models.TokaiOnAirApiListVideosOptionalParams): Promise<Models.ListVideosResponse>;
  /**
   * @param callback The callback
   */
  listVideos(callback: msRest.ServiceCallback<Models.V1ListVideosResponse>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listVideos(options: Models.TokaiOnAirApiListVideosOptionalParams, callback: msRest.ServiceCallback<Models.V1ListVideosResponse>): void;
  listVideos(options?: Models.TokaiOnAirApiListVideosOptionalParams | msRest.ServiceCallback<Models.V1ListVideosResponse>, callback?: msRest.ServiceCallback<Models.V1ListVideosResponse>): Promise<Models.ListVideosResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      listVideosOperationSpec,
      callback) as Promise<Models.ListVideosResponse>;
  }

  /**
   * 動画 YouTubeID の一覧を取得します。
   * @summary 動画 YouTubeID 一覧取得
   * @param [options] The optional parameters
   * @returns Promise<Models.ListVideoIdsResponse>
   */
  listVideoIds(options?: msRest.RequestOptionsBase): Promise<Models.ListVideoIdsResponse>;
  /**
   * @param callback The callback
   */
  listVideoIds(callback: msRest.ServiceCallback<Models.V1ListVideoIdsResponse>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  listVideoIds(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.V1ListVideoIdsResponse>): void;
  listVideoIds(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.V1ListVideoIdsResponse>, callback?: msRest.ServiceCallback<Models.V1ListVideoIdsResponse>): Promise<Models.ListVideoIdsResponse> {
    return this.sendOperationRequest(
      {
        options
      },
      listVideoIdsOperationSpec,
      callback) as Promise<Models.ListVideoIdsResponse>;
  }

  /**
   * 指定された動画を取得します。
   * @summary 動画取得
   * @param id
   * @param [options] The optional parameters
   * @returns Promise<Models.FindVideoResponse>
   */
  findVideo(id: string, options?: msRest.RequestOptionsBase): Promise<Models.FindVideoResponse>;
  /**
   * @param id
   * @param callback The callback
   */
  findVideo(id: string, callback: msRest.ServiceCallback<Models.V1FindVideoResponse>): void;
  /**
   * @param id
   * @param options The optional parameters
   * @param callback The callback
   */
  findVideo(id: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.V1FindVideoResponse>): void;
  findVideo(id: string, options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.V1FindVideoResponse>, callback?: msRest.ServiceCallback<Models.V1FindVideoResponse>): Promise<Models.FindVideoResponse> {
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
const listVideosOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "videos",
  queryParameters: [
    Parameters.after,
    Parameters.before,
    Parameters.limit,
    Parameters.offset,
    Parameters.q
  ],
  responses: {
    200: {
      bodyMapper: Mappers.V1ListVideosResponse
    },
    default: {
      bodyMapper: Mappers.RpcStatus
    }
  },
  serializer
};

const listVideoIdsOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "videos/-/youtube",
  responses: {
    200: {
      bodyMapper: Mappers.V1ListVideoIdsResponse
    },
    default: {
      bodyMapper: Mappers.RpcStatus
    }
  },
  serializer
};

const findVideoOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "videos/{id}",
  urlParameters: [
    Parameters.id
  ],
  responses: {
    200: {
      bodyMapper: Mappers.V1FindVideoResponse
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
