import { AlchemyProvider } from "@ethersproject/providers/lib/alchemy-provider";
import type { AddEver as AddEverContract } from "@addever/contracts/typechain-types/AddEver";
import { AddEver__factory } from "@addever/contracts/typechain-types/factories/AddEver__factory";

export interface AddEverOpts {
  alchemyApiKey: string;
  chainId?: number;
  contractAddress?: string;
}

const ipfsRegex = /ipfs:\/(.+)\?addever=(.+)/;

export class AddEver {
  private contract: AddEverContract;
  private provider: AlchemyProvider;

  private knownHosts: Record<string, string> = {};

  constructor({
    alchemyApiKey,
    chainId = 137,
    contractAddress = "",
  }: AddEverOpts) {
    this.provider = new AlchemyProvider(chainId, alchemyApiKey);
    this.contract = AddEver__factory.connect(contractAddress, this.provider);
  }

  /** Fetch the registered host of an address. */
  async getHost(address: string): Promise<string> {
    const lowercaseAddress = address.toLowerCase();

    if (this.knownHosts[lowercaseAddress]) {
      return this.knownHosts[lowercaseAddress];
    }
    return this.contract.hosts(lowercaseAddress);
  }

  /** Resolved a hinted uri to a url. */
  async resolveUri(uri: string): Promise<string> {
    const { address, path } = this.parseUri(uri);

    const host = await this.getHost(address);

    return `${host}/${path}`;
  }

  /** Parse out the path and address hint from an ipfs url */
  parseUri(uri: string) {
    const match = uri.match(ipfsRegex);

    if (!match) {
      throw new Error("Invalid URI");
    }
    const [, path, address] = match;

    return {
      address,
      path,
    };
  }
}
