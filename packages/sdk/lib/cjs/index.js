"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEver = void 0;
var alchemy_provider_1 = require("@ethersproject/providers/lib/alchemy-provider");
var AddEver__factory_1 = require("@addever/contracts/typechain-types/factories/AddEver__factory");
var ipfsRegex = /ipfs:\/(.+)\?addever=(.+)/;
var AddEver = /** @class */ (function () {
    function AddEver(_a) {
        var alchemyApiKey = _a.alchemyApiKey, _b = _a.chainId, chainId = _b === void 0 ? 137 : _b, _c = _a.contractAddress, contractAddress = _c === void 0 ? "" : _c;
        this.knownHosts = {};
        this.provider = new alchemy_provider_1.AlchemyProvider(chainId, alchemyApiKey);
        this.contract = AddEver__factory_1.AddEver__factory.connect(contractAddress, this.provider);
    }
    /** Fetch the registered host of an address. */
    AddEver.prototype.getHost = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var lowercaseAddress;
            return __generator(this, function (_a) {
                lowercaseAddress = address.toLowerCase();
                if (this.knownHosts[lowercaseAddress]) {
                    return [2 /*return*/, this.knownHosts[lowercaseAddress]];
                }
                return [2 /*return*/, this.contract.hosts(lowercaseAddress)];
            });
        });
    };
    /** Resolved a hinted uri to a url. */
    AddEver.prototype.resolveUri = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, address, path, host;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.parseUri(uri), address = _a.address, path = _a.path;
                        return [4 /*yield*/, this.getHost(address)];
                    case 1:
                        host = _b.sent();
                        return [2 /*return*/, "".concat(host, "/").concat(path)];
                }
            });
        });
    };
    /** Parse out the path and address hint from an ipfs url */
    AddEver.prototype.parseUri = function (uri) {
        var match = uri.match(ipfsRegex);
        if (!match) {
            throw new Error("Invalid URI");
        }
        var path = match[1], address = match[2];
        return {
            address: address,
            path: path,
        };
    };
    return AddEver;
}());
exports.AddEver = AddEver;
