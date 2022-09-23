/**
 * Web3 Persistent Adapter Implementation
 */

const fetch = require('node-fetch');
const sha = require("js-sha512").sha384;
const { Web3Storage, File, Blob } = require('web3.storage');

module.exports = class web3PersistenceAdapter {
	constructor(config) {
    console.log("web3 persistence adapter constructor");
		this.storage = new Web3Storage({ token: config.token });
	}

  makeGatewayURL(cid, path) {
    // return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
    return `https://${cid}.ipfs.w3s.link/${encodeURIComponent(path)}`
  }

  async getMetadata(cid,filename) {
    const url = this.makeGatewayURL(cid, filename)
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`error fetching image metadata: [${res.status}] ${res.statusText}`)
    }
    const metadata = await res.json()
    console.log("metadata is : " + metadata)
    return metadata;
  }

  async getAttributes(request_envelope) {
		//get user ID and create shorter unique hash for filename
    let userId = request_envelope.session? request_envelope.session.user.userId : request_envelope.context.System.user.userId;
    userId = sha(userId);

    let metadata={};

    for await (const upload of this.storage.list()) {
      console.log("Upload is " + JSON.stringify(upload,null,2));
      if (!upload.name || upload.name !== userId) {
        continue
      }
  
      try {
        metadata = await this.getMetadata(upload.cid, userId+".json");
        break;
      } catch (e) {
        console.error('error getting metadata:', e)
        continue
      }
    }
  
    return metadata;
	}

  async saveAttributes(request_envelope, attributes) {
    var userId = request_envelope.session? request_envelope.session.user.userId : request_envelope.context.System.user.userId;
    userId = sha(userId);

    const files = []
    
    if (this.storage) {
      const blob = new Blob(
        [
          JSON.stringify({
            ...attributes,
          }),
        ],
        {
          type: "application/json",
        }
      );
        // save to web3 storage
        // filename of the file is the userId and the file contains a json string of the attributes
        const file = new File([blob], userId + ".json");
        files.push(file);
        const cid = await this.storage.put(files, { name: userId });
        console.log("Saved to web3 storage with cid: " + cid);
    } else {
        console.log("WARNING: No web3 storage token provided, not saving to web3 storage");
    }

    return;  
  };

  deleteAttributes(request_envelope) {
    // cannot really delete
    return new Promise(function (resolve, reject) {
      resolve(void {});
    });
  };

}


