package greenboxcollective.helpmycar.backend.controller;

import greenboxcollective.helpmycar.backend.model.Status;
import greenboxcollective.helpmycar.backend.model.requests.ChatMessage;
import greenboxcollective.helpmycar.backend.model.requests.ChatMessageList;
import greenboxcollective.helpmycar.backend.model.requests.Driver;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequest;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequestList;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class FrontendSocketController {

  private final ApiController apiController = ApiController.getInstance();
  private List<HelpRequest> requestList;
  private List<ChatMessage> messageList;

  @PostConstruct
  private void initialize() {
    this.requestList = HelpRequestList.getInstance().getRequestList();
    this.messageList = ChatMessageList.getInstance().getMessageList();
  }

  /**
   * Method that provides a channel that accepts help requests containing a VIN and user. Enables
   * subscribing to this channel via SockJS and returns a response containing vehicle data, the
   * status and driver information.
   *
   * @param driver Driver that sent the request
   * @return Response with data from server, the status and driver information
   */
  @MessageMapping("/request")
  @SendTo("/topic/requests")
  public HelpRequest incomingRequest(Driver driver) {
    ApiResponse apiResponse = apiController.doPost(driver.getVinList());
    HelpRequest newHelpRequest =
        new HelpRequest(driver, apiResponse, Status.OPEN, requestList.size());
    System.out.println("New Request: " + newHelpRequest);
    requestList.add(newHelpRequest);
    return newHelpRequest;
  }

  /**
   * Websocket channel that processes status updates and returns the new status.
   *
   * @param helpRequest request whose status needs to be updated
   */
  @MessageMapping("/status")
  @SendTo("/topic/status")
  public HelpRequest statusUpdate(HelpRequest helpRequest) {
    HelpRequest request = requestList.get(helpRequest.getId());
    request.setStatus(request.getStatus().next());
    return request;
  }

  /**
   * Websocket channel that processes chat messages.
   *
   * @param chatMessage message that needs to be relayed
   */
  @MessageMapping("/chat")
  @SendTo("/topic/chatMessages")
  public ChatMessage sendChatMessage(ChatMessage chatMessage) {
    System.out.println("New Chat Message: " + chatMessage.toString());
    messageList.add(chatMessage);
    return chatMessage;
  }
}
