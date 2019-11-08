"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var querystring = require("querystring");
var UrlLib = require("url");
function addCustomQueryParams(params, provider) {
    var customQueryParams = provider.options.customQueryParams;
    if (customQueryParams) {
        for (var _i = 0, _a = Object.keys(customQueryParams); _i < _a.length; _i++) {
            var paramName = _a[_i];
            params[paramName] = customQueryParams[paramName];
        }
    }
}
function getAuthUrlStr(provider, codeChallenge) {
    if (provider.getAuthUrlStr) {
        return provider.getAuthUrlStr();
    }
    var params = {};
    params["client_id"] = provider.options.clientId;
    params["response_type"] = "code";
    params["redirect_uri"] = provider.options.redirectUri;
    params["scope"] = provider.options.scopes && provider.options.scopes.join(' ');
    params["response_mode"] = "query";
    params["state"] = "abcd";
    if (codeChallenge) {
        params["code_challenge"] = codeChallenge;
        params["code_challenge_method"] = "S256";
    }
    addCustomQueryParams(params, provider);
    var pararmsStr = querystring.stringify(params);
    var retAuthUrlStr = provider.authority + provider.authorizeEndpoint + "?" + pararmsStr;
    return retAuthUrlStr;
}
exports.getAuthUrlStr = getAuthUrlStr;
function getLogoutUrlStr(provider, client) {
    if (provider.getLogoutUrlStr) {
        return provider.getLogoutUrlStr();
    }
    if (!client || !client.tokenResult) {
        return null;
    }
    var params = {};
    params["id_token_hint"] = client.tokenResult.idToken;
    params["post_logout_redirect_uri"] = provider.options.redirectUri;
    addCustomQueryParams(params, provider);
    var pararmsStr = querystring.stringify(params);
    var retAuthUrlStr = provider.authority + provider.endSessionEndpoint + "?" + pararmsStr;
    return retAuthUrlStr;
}
exports.getLogoutUrlStr = getLogoutUrlStr;
function authorizationCodeFromRedirectUrl(url) {
    var authorizationCode = null;
    if (url) {
        var parsedRetStr = UrlLib.parse(url);
        var qsObj = querystring.parse(parsedRetStr.query);
        authorizationCode = qsObj["code"];
    }
    return authorizationCode;
}
exports.authorizationCodeFromRedirectUrl = authorizationCodeFromRedirectUrl;
function getAccessTokenUrlStr(provider) {
    var retStr = "";
    if (provider.tokenEndpointBase && provider.tokenEndpointBase !== "") {
        retStr = provider.tokenEndpointBase + provider.tokenEndpoint;
    }
    else {
        retStr = provider.authority + provider.tokenEndpoint;
    }
    return retStr;
}
exports.getAccessTokenUrlStr = getAccessTokenUrlStr;
function getAccessTokenUrlWithCodeStr(provider, authCode) {
    if (provider.getAccessTokenUrlWithCodeStr) {
        return provider.getAccessTokenUrlWithCodeStr(authCode);
    }
    var params = {};
    params["code"] = authCode;
    params["client_id"] = provider.options.clientId;
    params["client_secret"] = provider.options.clientSecret;
    params["scope"] = provider.options.scopes && provider.options.scopes.join(' ');
    params["state"] = "abcd";
    addCustomQueryParams(params, provider);
    var pararmsStr = querystring.stringify(params);
    var paramsWithRedirectStr = pararmsStr + "&redirect_uri=" + provider.options.redirectUri;
    var retAccessTokenWithCodeUrlStr = getAccessTokenUrlStr(provider) + "?" + paramsWithRedirectStr;
    return retAccessTokenWithCodeUrlStr;
}
exports.getAccessTokenUrlWithCodeStr = getAccessTokenUrlWithCodeStr;
function newUUID(a, b) {
    for (b = a = ""; a++ < 36; b +=
        (a * 51) & 52
            ? (a ^ 15 ? 8 ^ (Math.random() * (a ^ 20 ? 16 : 4)) : 4).toString(16)
            : "-")
        ;
    return b;
}
exports.newUUID = newUUID;
function getAuthHeaderFromCredentials(provider) {
    var customAuthHeader;
    if (provider["basicAuthHeader"]) {
        customAuthHeader = { Authorization: provider["basicAuthHeader"] };
    }
    return customAuthHeader;
}
exports.getAuthHeaderFromCredentials = getAuthHeaderFromCredentials;
function nsArrayToJSArray(a) {
    var arr = [];
    if ("undefined" !== typeof a) {
        var count = a.count;
        for (var i = 0; i < count; i++) {
            arr.push(a.objectAtIndex(i));
        }
    }
    return arr;
}
exports.nsArrayToJSArray = nsArrayToJSArray;
function jsArrayToNSArray(str) {
    return NSArray.arrayWithArray(str);
}
exports.jsArrayToNSArray = jsArrayToNSArray;
function httpResponseToToken(response) {
    var results;
    try {
        results = response.content.toJSON();
    }
    catch (e) {
        results = querystring.parse(response.content.toString());
    }
    var access_token = results["access_token"];
    var refresh_token = results["refresh_token"];
    var id_token = results["id_token"];
    var expires_in = results["expires_in"];
    delete results["refresh_token"];
    var expSecs = Math.floor(parseFloat(expires_in));
    var expDate = new Date();
    expDate.setSeconds(expDate.getSeconds() + expSecs);
    return {
        accessToken: access_token,
        refreshToken: refresh_token,
        idToken: id_token,
        accessTokenExpiration: expDate,
        refreshTokenExpiration: expDate,
        idTokenExpiration: expDate
    };
}
exports.httpResponseToToken = httpResponseToToken;
//# sourceMappingURL=tns-oauth-utils.js.map