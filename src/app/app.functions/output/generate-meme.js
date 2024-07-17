'use strict';

var axios = require('axios');
var fs = require('node:fs');
var crypto = require('crypto');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var crypto__namespace = /*#__PURE__*/_interopNamespaceDefault(crypto);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function superImportant(){
  console.log("YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
}

var imgFlipUrl = 'https://api.imgflip.com/caption_image';
exports.main = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (context) {
        var formState, memeData, filePath, memeUrl, err_1;
        if (context === void 0) { context = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formState = context.event.payload.formState;
                    superImportant();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, createMeme(formState)];
                case 2:
                    memeData = _a.sent();
                    if (!memeData.success) {
                        return [2 /*return*/, {
                                status: 500,
                                message: {
                                    type: 'ERROR',
                                    body: memeData.data,
                                },
                            }];
                    }
                    return [4 /*yield*/, downloadImage(memeData)];
                case 3:
                    filePath = _a.sent();
                    return [4 /*yield*/, uploadToFileManager(filePath)];
                case 4:
                    memeUrl = _a.sent();
                    return [4 /*yield*/, createCustomMemeObject(formState, memeUrl)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, {
                            status: 200,
                            message: { type: 'SUCCESS', body: "".concat(memeUrl) },
                        }];
                case 6:
                    err_1 = _a.sent();
                    console.error(err_1.response.data);
                    return [2 /*return*/, {
                            status: 500,
                            message: {
                                type: 'ERROR',
                                body: err_1.response.data,
                            },
                        }];
                case 7: return [2 /*return*/];
            }
        });
    });
};
function createMeme(formState) {
    return __awaiter(this, void 0, void 0, function () {
        var numBoxes, boxes, i, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numBoxes = Number.parseInt(formState.boxes_length);
                    boxes = {};
                    for (i = 0; i < numBoxes; ++i) {
                        boxes["boxes[".concat(i, "][text]")] = formState.boxes[i] || '';
                    }
                    return [4 /*yield*/, axios.post(imgFlipUrl, null, {
                            params: __assign({ username: process.env.IMG_FLIP_USERNAME, password: process.env.IMG_FLIP_PASSWORD, template_id: formState.template_id }, boxes),
                        })];
                case 1:
                    data = (_a.sent()).data;
                    return [2 /*return*/, data];
            }
        });
    });
}
function downloadImage(memeData) {
    return __awaiter(this, void 0, void 0, function () {
        var imageBlob, buffer, id, filePath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios({
                        url: memeData.data.url,
                        method: 'GET',
                        responseType: 'arraybuffer',
                    })];
                case 1:
                    imageBlob = (_a.sent()).data;
                    buffer = Buffer.from(imageBlob, 'base64');
                    id = crypto__namespace.randomBytes(16).toString('hex');
                    filePath = "/tmp/".concat(id, ".jpg");
                    fs__namespace.writeFileSync(filePath, buffer);
                    return [2 /*return*/, filePath];
            }
        });
    });
}
function uploadToFileManager(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var cmsRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.post(process.env.FILE_MANAGER_URL, {
                        file: fs__namespace.createReadStream(filePath),
                        folderPath: 'memes',
                        options: JSON.stringify({
                            access: 'PUBLIC_INDEXABLE',
                            overwrite: false,
                        }),
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(process.env.PRIVATE_APP_ACCESS_TOKEN),
                            'Content-Type': 'multipart/form-data',
                        },
                    })];
                case 1:
                    cmsRes = _a.sent();
                    return [2 /*return*/, cmsRes.data.objects[0].friendly_url];
            }
        });
    });
}
function createCustomMemeObject(formState, memeUrl) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.post(process.env.MEME_OBJECT_URL, {
                        properties: {
                            name: formState.name,
                            url: memeUrl,
                            dankness: formState.dankness || 1,
                        },
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(process.env.PRIVATE_APP_ACCESS_TOKEN),
                            'Content-Type': 'application/json',
                        },
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
