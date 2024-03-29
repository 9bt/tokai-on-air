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

import { exists, mapValues } from '../runtime';
import {
    V1Video,
    V1VideoFromJSON,
    V1VideoFromJSONTyped,
    V1VideoToJSON,
} from './';

/**
 * 
 * @export
 * @interface V1FindVideoResponse
 */
export interface V1FindVideoResponse {
    /**
     * 
     * @type {V1Video}
     * @memberof V1FindVideoResponse
     */
    video?: V1Video;
}

export function V1FindVideoResponseFromJSON(json: any): V1FindVideoResponse {
    return V1FindVideoResponseFromJSONTyped(json, false);
}

export function V1FindVideoResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V1FindVideoResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'video': !exists(json, 'video') ? undefined : V1VideoFromJSON(json['video']),
    };
}

export function V1FindVideoResponseToJSON(value?: V1FindVideoResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'video': V1VideoToJSON(value.video),
    };
}


