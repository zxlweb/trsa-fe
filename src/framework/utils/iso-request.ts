/**
 * @fileOverview Isomorphic request method, compatible both in server and client side
 * @author Max
 */

import * as Immutable from 'immutable';
import {initHTTP, initHTTPS} from './http';
import {initAJAX} from './ajax';

export default function getRequestMethod(config?: Immutable.Map<any, any>): {
    http: REQUEST,
    https: REQUEST
} {
    if(typeof window === 'undefined') {
        return {
            http: initHTTP({
                hostname: config.getIn(['API_SERVER', 'HTTP_HOSTNAME']),
                port: config.getIn(['API_SERVER', 'HTTP_PORT']),
                stubHostname: config.getIn(['STUB_SERVER', 'HTTP_HOSTNAME']),
                stubPort: config.getIn(['STUB_SERVER', 'HTTP_PORT'])
            }),
            https: initHTTPS({
                hostname: config.getIn(['API_SERVER', 'HTTP_HOSTNAME']),
                port: config.getIn(['API_SERVER', 'HTTP_PORT']),
                stubHostname: config.getIn(['STUB_SERVER', 'HTTP_HOSTNAME']),
                stubPort: config.getIn(['STUB_SERVER', 'HTTP_PORT'])
            })
        }
    } else {
        const ajax = initAJAX({
            hostname: __API_SERVER_AJAX_HOSTNAME__,
            port: __API_SERVER_AJAX_PORT__,
            stubHostname: __STUB_SERVER_AJAX_HOSTNAME__,
            stubPort: __STUB_SERVER_AJAX_PORT__
        });
        return {
            http: ajax,
            https: ajax
        };
    }
}