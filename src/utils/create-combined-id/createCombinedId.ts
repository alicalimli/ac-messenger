const createCombinedId = (currentUserID: string, recipientID: string) => {
  return currentUserID > recipientID
    ? currentUserID + recipientID
    : recipientID + currentUserID;
};

export default createCombinedId;
