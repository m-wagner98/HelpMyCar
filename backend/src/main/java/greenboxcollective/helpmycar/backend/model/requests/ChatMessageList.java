package greenboxcollective.helpmycar.backend.model.requests;

import java.util.ArrayList;
import java.util.List;

public class ChatMessageList {
  private static ChatMessageList instance;
  private List<ChatMessage> messageList = new ArrayList<>();

  /**
   * Singleton implementation of this class.
   *
   * @return instance of this class
   */
  public static ChatMessageList getInstance() {
    if (ChatMessageList.instance == null) {
      ChatMessageList.instance = new ChatMessageList();
    }
    return ChatMessageList.instance;
  }

  public List<ChatMessage> getMessageList() {
    return messageList;
  }

  public void setMessageList(List<ChatMessage> messageList) {
    this.messageList = messageList;
  }
}
