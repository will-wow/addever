"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
describe("AddEver", function () {
    var addEver;
    beforeEach(function () {
        addEver = new _1.AddEver({
            alchemyApiKey: "",
        });
    });
    describe("parseUri", function () {
        it("parses out the path and address", function () {
            expect(addEver.parseUri("ipfs://asdf?addever=0x000000000001")).toEqual({
                address: "0x000000000001",
                path: "/asdf",
            });
        });
        it("throws for ipfs uris without a hint", function () {
            expect(function () { return addEver.parseUri("ipfs://asdf"); }).toThrowError("Invalid URI");
        });
        it("throws for non-ipfs uris", function () {
            expect(function () {
                return addEver.parseUri("http://example.com/foo?addever=0x0000001");
            }).toThrowError("Invalid URI");
        });
    });
});
