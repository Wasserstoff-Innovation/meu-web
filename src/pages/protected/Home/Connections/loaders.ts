import {
  getReceivedRequests,
  getSentRequests,
} from "../../../../api/connect/connection";

export default class connectionLoaders {
  static received = async () => {
    const receivedRequests = await getReceivedRequests();
    return { requests: receivedRequests };
  };

  static sent = async () => {
    const sentRequests = await getSentRequests();
    return { requests: sentRequests };
  };
}
