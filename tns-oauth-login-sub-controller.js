"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pkce_util_1 = require("./pkce-util");
var tns_oauth_auth_state_1 = require("./tns-oauth-auth-state");
var tns_oauth_client_connection_1 = require("./tns-oauth-client-connection");
var tns_oauth_utils_1 = require("./tns-oauth-utils");
var TnsOAuthLoginSubController = (function () {
    function TnsOAuthLoginSubController(client) {
        this.client = client;
    }
    TnsOAuthLoginSubController.prototype.preLoginSetup = function (frame, urlScheme, completion) {
        this.frame = frame;
        if (this.authState) {
            var error = "Login failed because another login operation in progress.";
            completion(null, error);
        }
        var codeChallenge;
        if (this.client.pkce) {
            this.client.codeVerifier = pkce_util_1.getCodeVerifier();
            codeChallenge = pkce_util_1.sha256base64encoded(this.client.codeVerifier);
        }
        this.authState = new tns_oauth_auth_state_1.TnsOAuthState(this.client.codeVerifier, completion);
        return tns_oauth_utils_1.getAuthUrlStr(this.client.provider, codeChallenge);
    };
    TnsOAuthLoginSubController.prototype.preLogoutSetup = function (frame, urlScheme, completion) {
        this.frame = frame;
        if (this.authState) {
            var error = "Logout failed because another logout operation is in progress.";
            completion(error);
        }
        this.authState = new tns_oauth_auth_state_1.TnsOAuthState(this.client.codeVerifier, completion);
        return tns_oauth_utils_1.getLogoutUrlStr(this.client.provider, this.client);
    };
    TnsOAuthLoginSubController.prototype.resumeWithUrl = function (url, completion) {
        if (this.authState) {
            var codeExchangeRequestUrl = this.codeExchangeRequestUrlFromRedirectUrl(url);
            if (codeExchangeRequestUrl) {
                this.codeExchangeWithUrlCompletion(codeExchangeRequestUrl, completion);
                return true;
            }
        }
        completion(null, "Canceled");
        return false;
    };
    TnsOAuthLoginSubController.prototype.codeExchangeRequestUrlFromRedirectUrl = function (url) {
        var codeExchangeUrl = null;
        var isRedirectUrlValid = true;
        if (isRedirectUrlValid) {
            var authorizationCode = tns_oauth_utils_1.authorizationCodeFromRedirectUrl(url);
            if (authorizationCode) {
                this.authState.authCode = authorizationCode;
                codeExchangeUrl = tns_oauth_utils_1.getAccessTokenUrlWithCodeStr(this.client.provider, authorizationCode);
            }
        }
        return codeExchangeUrl;
    };
    TnsOAuthLoginSubController.prototype.codeExchangeWithUrlCompletion = function (url, completion) {
        var _this = this;
        var responseCompletion;
        if (completion) {
            responseCompletion = function (data, response, responseError) {
                if (!responseError) {
                    if (response.statusCode === 200) {
                        var tokenResult = _this.client.provider.parseTokenResult(data);
                        if (tokenResult && !responseError) {
                            _this.client.tokenResult = tokenResult;
                            completion(tokenResult, responseError);
                        }
                    }
                    else if (response.statusCode === 400) {
                        console.error("400 ERRROR Occurred");
                        completion(null, responseError);
                    }
                    else if (response.statusCode > 400) {
                        completion(null, responseError);
                    }
                }
            };
        }
        var connection = tns_oauth_client_connection_1.TnsOAuthClientConnection.initWithRequestClientCompletion(this.client, responseCompletion);
        connection.startGetTokenFromCode(this.authState.authCode);
    };
    TnsOAuthLoginSubController.prototype.completeLoginWithTokenResponseError = function (tokenResult, responseError) {
        var loginCompletion = this.authState
            .loginCompletion;
        this.authState = null;
        loginCompletion(tokenResult, responseError);
    };
    return TnsOAuthLoginSubController;
}());
exports.TnsOAuthLoginSubController = TnsOAuthLoginSubController;
//# sourceMappingURL=tns-oauth-login-sub-controller.js.map