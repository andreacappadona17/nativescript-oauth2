"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SHA256_DIGEST_LENGTH = 32;
function getCodeVerifier() {
    var randomData = NSMutableData.dataWithLength(SHA256_DIGEST_LENGTH);
    var result = SecRandomCopyBytes(kSecRandomDefault, randomData.length, randomData.mutableBytes);
    if (result !== 0) {
        return null;
    }
    else {
        return encodeBase64urlNoPadding(randomData);
    }
}
exports.getCodeVerifier = getCodeVerifier;
function sha256base64encoded(inputString) {
    var verifierData = NSString.stringWithString(inputString).dataUsingEncoding(NSUTF8StringEncoding);
    var sha256Verifier = NSMutableData.dataWithLength(SHA256_DIGEST_LENGTH);
    CC_SHA256(verifierData.bytes, verifierData.length, sha256Verifier.mutableBytes);
    return encodeBase64urlNoPadding(sha256Verifier);
}
exports.sha256base64encoded = sha256base64encoded;
function encodeBase64urlNoPadding(data) {
    var base64string = data.base64EncodedStringWithOptions(0);
    base64string = base64string.replace(/\+/g, "-");
    base64string = base64string.replace(/\//g, "_");
    base64string = base64string.replace(/=/g, "");
    return base64string;
}
//# sourceMappingURL=pkce-util.ios.js.map