import {
  getReceivedRequests,
  getSentRequests,
} from "../../../../api/connect/connection";

export default class connectionLoaders {
  static received = async () => {
    const receivedRequests = await getReceivedRequests();
    const requests = receivedRequests.map((request) => ({
      connectionId: request._id,
      user: request.sender,
    }));
    return { requests };
  };

  static sent = async () => {
    const sentRequests = await getSentRequests();
    const requests = sentRequests.map((request) => ({
      connectionId: request._id,
      user: request.receiver,
    }));
    return { requests };
  };
}
