/**
 * MediaCapsule API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { DomainImageSettings } from './domainImageSettings';
import { DomainMiscSettings } from './domainMiscSettings';
import { DomainVideoSettings } from './domainVideoSettings';
import { FileCatalystStorageMethods } from './fileCatalystStorageMethods';


export class FileCatalystSettings {
    fileCatalystUser?: string;
    fileCatalystPassword?: string;
    fileCatalystStorage?: FileCatalystStorageMethods;
    fileCatalystVideoSettings?: DomainVideoSettings;
    fileCatalystImageSettings?: DomainImageSettings;
    fileCatalystMiscSettings?: DomainMiscSettings;
}
