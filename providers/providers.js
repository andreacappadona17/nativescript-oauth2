"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TnsOaProviderMicrosoft = (function () {
    function TnsOaProviderMicrosoft(options) {
        this.openIdSupport = "oid-full";
        this.providerType = "microsoft";
        this.authority = "https://login.microsoftonline.com/common";
        this.tokenEndpointBase = "https://login.microsoftonline.com/common";
        this.authorizeEndpoint = "/oauth2/v2.0/authorize";
        this.tokenEndpoint = "/oauth2/v2.0/token";
        this.cookieDomains = ["login.microsoftonline.com", "live.com"];
        this.options = options;
    }
    TnsOaProviderMicrosoft.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderMicrosoft;
}());
exports.TnsOaProviderMicrosoft = TnsOaProviderMicrosoft;
var TnsOaProviderGoogle = (function () {
    function TnsOaProviderGoogle(options) {
        this.openIdSupport = "oid-full";
        this.providerType = "google";
        this.authority = "https://accounts.google.com/o";
        this.tokenEndpointBase = "https://accounts.google.com/o";
        this.authorizeEndpoint = "/oauth2/auth";
        this.tokenEndpoint = "/oauth2/token";
        this.cookieDomains = ["google.com"];
        this.options = options;
    }
    TnsOaProviderGoogle.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    TnsOaProviderGoogle.prototype.getLogoutUrlStr = function () {
        return "https://www.google.com/accounts/Logout";
    };
    return TnsOaProviderGoogle;
}());
exports.TnsOaProviderGoogle = TnsOaProviderGoogle;
var TnsOaProviderFacebook = (function () {
    function TnsOaProviderFacebook(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "facebook";
        this.authority = "https://www.facebook.com/v3.1/dialog";
        this.tokenEndpointBase = "https://graph.facebook.com";
        this.authorizeEndpoint = "/oauth";
        this.tokenEndpoint = "/v3.1/oauth/access_token";
        this.cookieDomains = ["facebook.com"];
        this.options = options;
    }
    TnsOaProviderFacebook.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderFacebook;
}());
exports.TnsOaProviderFacebook = TnsOaProviderFacebook;
var TnsOaProviderLinkedIn = (function () {
    function TnsOaProviderLinkedIn(options) {
        this.openIdSupport = "oid-none";
        this.providerType = "linkedIn";
        this.authority = "https://www.linkedin.com";
        this.tokenEndpointBase = "https://www.linkedin.com";
        this.authorizeEndpoint = "/oauth/v2/authorization";
        this.tokenEndpoint = "/oauth/v2/accessToken";
        this.cookieDomains = ["linkedin.com"];
        this.options = options;
    }
    TnsOaProviderLinkedIn.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderLinkedIn;
}());
exports.TnsOaProviderLinkedIn = TnsOaProviderLinkedIn;
var TnsOaProviderIdentityServer = (function () {
    function TnsOaProviderIdentityServer(options) {
        this.openIdSupport = 'oid-full';
        this.providerType = 'identityServer';
        this.authorizeEndpoint = '/connect/authorize';
        this.tokenEndpoint = '/connect/token';
        this.revokeEndpoint = '/connect/revocation';
        this.endSessionEndpoint = '/connect/endsession';
        this.options = options;
        this.authority = options.issuerUrl;
        this.tokenEndpointBase = options.issuerUrl;
        var match = /^https:\/\/(.*?)$/.exec(options.issuerUrl);
        if (match) {
            this.cookieDomains = [match[1].toString()];
        }
    }
    TnsOaProviderIdentityServer.prototype.parseTokenResult = function (jsonData) {
        return jsonData;
    };
    return TnsOaProviderIdentityServer;
}());
exports.TnsOaProviderIdentityServer = TnsOaProviderIdentityServer;
//# sourceMappingURL=providers.js.map