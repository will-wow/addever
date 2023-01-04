import { AddEver } from ".";

describe("AddEver", () => {
  let addEver: AddEver;

  beforeEach(() => {
    addEver = new AddEver({
      alchemyApiKey: "",
    });
  });

  describe("parseUri", () => {
    it("parses out the path and address", () => {
      expect(addEver.parseUri("ipfs://asdf?addever=0x000000000001")).toEqual({
        address: "0x000000000001",
        path: "/asdf",
      });
    });

    it("throws for ipfs uris without a hint", () => {
      expect(() => addEver.parseUri("ipfs://asdf")).toThrowError("Invalid URI");
    });

    it("throws for non-ipfs uris", () => {
      expect(() =>
        addEver.parseUri("http://example.com/foo?addever=0x0000001")
      ).toThrowError("Invalid URI");
    });
  });
});
