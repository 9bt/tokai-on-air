/* tslint:disable */
/* eslint-disable */
/**
 * tokai-on-air-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    RpcStatus,
    RpcStatusFromJSON,
    RpcStatusToJSON,
    V1FindVideoResponse,
    V1FindVideoResponseFromJSON,
    V1FindVideoResponseToJSON,
    V1ListVideoIdsResponse,
    V1ListVideoIdsResponseFromJSON,
    V1ListVideoIdsResponseToJSON,
    V1ListVideosResponse,
    V1ListVideosResponseFromJSON,
    V1ListVideosResponseToJSON,
} from '../models';

export interface FindVideoRequest {
    id: string;
}

export interface ListVideosRequest {
    after?: string;
    before?: string;
    limit?: number;
    offset?: number;
    q?: string;
}

/**
 * VideoServiceApi - interface
 * 
 * @export
 * @interface VideoServiceApiInterface
 */
export interface VideoServiceApiInterface {
    /**
     * 指定された動画を取得します。
     * @summary 動画取得
     * @param {string} id 動画の ID です
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VideoServiceApiInterface
     */
    findVideoRaw(requestParameters: FindVideoRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1FindVideoResponse>>;

    /**
     * 指定された動画を取得します。
     * 動画取得
     */
    findVideo(requestParameters: FindVideoRequest, initOverrides?: RequestInit): Promise<V1FindVideoResponse>;

    /**
     * 最新動画の一覧を取得します。
     * @summary 最新動画一覧取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VideoServiceApiInterface
     */
    listLatestVideosRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideosResponse>>;

    /**
     * 最新動画の一覧を取得します。
     * 最新動画一覧取得
     */
    listLatestVideos(initOverrides?: RequestInit): Promise<V1ListVideosResponse>;

    /**
     * 動画 YouTubeID の一覧を取得します。
     * @summary 動画 YouTubeID 一覧取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VideoServiceApiInterface
     */
    listVideoIdsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideoIdsResponse>>;

    /**
     * 動画 YouTubeID の一覧を取得します。
     * 動画 YouTubeID 一覧取得
     */
    listVideoIds(initOverrides?: RequestInit): Promise<V1ListVideoIdsResponse>;

    /**
     * 動画の一覧を取得します。
     * @summary 動画一覧取得
     * @param {string} [after] 検索条件となる公開日時の始点です.
     * @param {string} [before] 検索条件となる公開日時の終点です.
     * @param {number} [limit] 一度のリクエストで取得する件数です.
     * @param {number} [offset] 何件目から取得するかの数値です.
     * @param {string} [q] 検索条件となる文字列です.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VideoServiceApiInterface
     */
    listVideosRaw(requestParameters: ListVideosRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideosResponse>>;

    /**
     * 動画の一覧を取得します。
     * 動画一覧取得
     */
    listVideos(requestParameters: ListVideosRequest, initOverrides?: RequestInit): Promise<V1ListVideosResponse>;

}

/**
 * 
 */
export class VideoServiceApi extends runtime.BaseAPI implements VideoServiceApiInterface {

    /**
     * 指定された動画を取得します。
     * 動画取得
     */
    async findVideoRaw(requestParameters: FindVideoRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1FindVideoResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling findVideo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/videos/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1FindVideoResponseFromJSON(jsonValue));
    }

    /**
     * 指定された動画を取得します。
     * 動画取得
     */
    async findVideo(requestParameters: FindVideoRequest, initOverrides?: RequestInit): Promise<V1FindVideoResponse> {
        const response = await this.findVideoRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 最新動画の一覧を取得します。
     * 最新動画一覧取得
     */
    async listLatestVideosRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideosResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/videos/-/latest`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1ListVideosResponseFromJSON(jsonValue));
    }

    /**
     * 最新動画の一覧を取得します。
     * 最新動画一覧取得
     */
    async listLatestVideos(initOverrides?: RequestInit): Promise<V1ListVideosResponse> {
        const response = await this.listLatestVideosRaw(initOverrides);
        return await response.value();
    }

    /**
     * 動画 YouTubeID の一覧を取得します。
     * 動画 YouTubeID 一覧取得
     */
    async listVideoIdsRaw(initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideoIdsResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/videos/-/youtube`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1ListVideoIdsResponseFromJSON(jsonValue));
    }

    /**
     * 動画 YouTubeID の一覧を取得します。
     * 動画 YouTubeID 一覧取得
     */
    async listVideoIds(initOverrides?: RequestInit): Promise<V1ListVideoIdsResponse> {
        const response = await this.listVideoIdsRaw(initOverrides);
        return await response.value();
    }

    /**
     * 動画の一覧を取得します。
     * 動画一覧取得
     */
    async listVideosRaw(requestParameters: ListVideosRequest, initOverrides?: RequestInit): Promise<runtime.ApiResponse<V1ListVideosResponse>> {
        const queryParameters: any = {};

        if (requestParameters.after !== undefined) {
            queryParameters['after'] = requestParameters.after;
        }

        if (requestParameters.before !== undefined) {
            queryParameters['before'] = requestParameters.before;
        }

        if (requestParameters.limit !== undefined) {
            queryParameters['limit'] = requestParameters.limit;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.q !== undefined) {
            queryParameters['q'] = requestParameters.q;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/videos`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => V1ListVideosResponseFromJSON(jsonValue));
    }

    /**
     * 動画の一覧を取得します。
     * 動画一覧取得
     */
    async listVideos(requestParameters: ListVideosRequest, initOverrides?: RequestInit): Promise<V1ListVideosResponse> {
        const response = await this.listVideosRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
