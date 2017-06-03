/// <reference path="./Algolia.ios.d.ts" />
import convertToJSON from './utils';

let index;

export class AlgoliaIndex {
    constructor(client: Client, name:string) {
        /*
            This is hack as Index is not returning from else condition
            https://github.com/algolia/algoliasearch-client-swift/blob/master/Source/Client.swift#L99
        */

        client.indexWithName("").isMemberOfClass(Index);
        index = client.indexWithName(name);
    }

    public search(query:string, args:any, handler?:Function):void {
        let queryObject = Query.alloc().initWithQuery(query);

        if(typeof args === "function" ) {
            handler = args;
        }else {
            Object.keys(args).forEach((key) => {
                if(key in queryObject) {
                    queryObject[key] = args[key];
                }
            });
        }

        index.searchCompletionHandler(queryObject, (success, error) => {
            if(error) {
                handler(convertToJSON(error));
            }

            handler(convertToJSON(success));
        });
    }

    public setSettings(settings:Object, handler:Function):void {
        index.setSettingsCompletionHandler(settings, (success, error) => {
            if(error) {
                handler(convertToJSON(error));
            }

            handler(convertToJSON(success));
        });
    }

    public addObjects(object:Object, handler:Function):void {
        index.addObjectsCompletionHandler(object, (success, error) => {
            if(error) {
                handler(convertToJSON(error));
            }

            handler(convertToJSON(success));
        });
    }
}