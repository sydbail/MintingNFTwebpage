import { Injectable } from '@angular/core';

import * as IPFS from 'ipfs';
import * as IPFS_ROOT_TYPES from 'ipfs-core-types/src/root';
import * as IPFS_UTILS_TYPES from 'ipfs-core-types/src/utils';
import { BehaviorSubject, } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private _ipfsSource = new BehaviorSubject<null | IPFS.IPFS>(null);
  private _createIPFSNodePromise: Promise<IPFS.IPFS>;

  private get ipfs() {
    const getter = async () => {
      let node = this._ipfsSource.getValue();

      if (node == null) {
        console.log("Waiting node creation...")

        node = await this._createIPFSNodePromise as IPFS.IPFS
        this._ipfsSource.next(node);
      }

      return node;
    }

    return getter();
  }

  constructor() {
    console.log("Starting new node...")

    //should be only local now
   //start: false stops daemon from connecting to peers
    this._createIPFSNodePromise = IPFS.create( { start: false });
}
  /**
   * @description Get the ID information about the current IPFS node
   * @return {Promise<IPFS_ROOT_TYPES.IDResult>} containing node IDs
   */
  async getId(): Promise<IPFS_ROOT_TYPES.IDResult> {
    const node = await this.ipfs;
    return await node.id();
  }

  /**
   * @description Get the version information about the current IPFS node
   * @return {Promise<IPFS_ROOT_TYPES.VersionResult>} containing node version
   */
  async getVersion(): Promise<IPFS_ROOT_TYPES.VersionResult> {
    const node = await this.ipfs;
    return await node.version();
  }

  /**
   * @description Get the status of the current IPFS node
   * @returns {Promise<boolean>} representing if node is online (false = off)
   */
  async getStatus(): Promise<boolean> {
    const node = await this.ipfs;
    return await node.isOnline();
  }

  /*
  * @description Get current connected Peers
  * @returns {Promise<Array>} of Peer information
  */
  async getPeers(): Promise<Array<{ id: String, addrs: any[] }>> {
    const node = await this.ipfs;
    return await node.swarm.addrs();
  }

  /* @description add a file to ipfs
  *  @parameters: string or blob of content to upload
  *  @returns {Promise<String>} containing CID of file added
  */
  async addFile(content: Blob | string): Promise<string> {
    const node = await this.ipfs;
    const fileAdded = await node.add(content);
    let hash = fileAdded.cid.toString();
    return hash;
  }

  /* @description retrieve a file from ipfs
  *  @parameters: string CID of the file
  *  @returns {Promise<Uint8Array>} containing file contents
  */
  async getFile(contentCID: string): Promise<Uint8Array[]> {
    const node = await this.ipfs;
    const chunks = [];
    for await (const chunk of node.cat(contentCID)) {
      chunks.push(chunk);
    }

    return chunks;
  }
}
