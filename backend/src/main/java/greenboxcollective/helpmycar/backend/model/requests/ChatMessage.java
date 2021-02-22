package greenboxcollective.helpmycar.backend.model.requests;

public class ChatMessage {
  private String sender;
  private String receiver;
  private String message;

  public ChatMessage() {}

  /**
   * Class that models a chat message.
   *
   * @param sender sender of the message.
   * @param message actual message content.
   * @param receiver receiver of the message.
   */
  public ChatMessage(String sender, String message, String receiver) {
    this.sender = sender;
    this.message = message;
    this.receiver = receiver;
  }

  public String getSender() {
    return sender;
  }

  public void setSender(String sender) {
    this.sender = sender;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public String getReceiver() {
    return receiver;
  }

  public void setReceiver(String receiver) {
    this.receiver = receiver;
  }

  @Override
  public String toString() {
    return "ChatMessage{"
        + "sender='"
        + sender
        + '\''
        + ", message='"
        + message
        + '\''
        + " ,receiver='"
        + receiver
        + '\''
        + '}';
  }
}
