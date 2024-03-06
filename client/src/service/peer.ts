class Service {
    peer: RTCPeerConnection;

    constructor(){
        this.peer = new RTCPeerConnection({
            iceServers: [
                {
                    urls: [
                      "stun:stun.l.google.com:19302",
                      "stun:global.stun.twilio.com:3478",
                    ],
                }, 
            ]
        });
    }

    async getAnswer(offer: any) {
        if(this.peer) {
            await this.peer.setRemoteDescription(offer);
            const ans = await this.peer.createAnswer();
            await this.peer.setLocalDescription(new RTCSessionDescription(ans));
            return ans;
        }
    }

    async setDescription(ans: any) {
       if(this.peer) {
        await this.peer.setRemoteDescription(new RTCSessionDescription(ans))
       }
    }

    async getOffer(this: { peer: RTCPeerConnection | null }) {
        if(this.peer){
         const offer = await this.peer.createOffer();
         await this.peer.setLocalDescription(new RTCSessionDescription(offer));
         return offer;
        }
     }
}


export default new Service()