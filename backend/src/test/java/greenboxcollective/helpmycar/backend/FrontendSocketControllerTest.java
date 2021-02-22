package greenboxcollective.helpmycar.backend;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.junit.Assert.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import greenboxcollective.helpmycar.backend.model.Status;
import greenboxcollective.helpmycar.backend.model.requests.ChatMessage;
import greenboxcollective.helpmycar.backend.model.requests.Driver;
import greenboxcollective.helpmycar.backend.model.requests.HelpRequest;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeoutException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.lang.NonNull;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

@ContextConfiguration
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class FrontendSocketControllerTest {

  private static final String WEBSOCKET_REQUEST_TOPIC = "/topic/requests";
  private static final String WEBSOCKET_STATUS_TOPIC = "/topic/status";
  private static final String WEBSOCKET_CHAT_TOPIC = "/topic/chatMessages";
  private static final String WEBSOCKET_REQUEST_MESSAGE_CHANNEL = "/app/request";
  private static final String WEBSOCKET_CHAT_CHANNEL = "/app/chat";
  private static final String WEBSOCKET_STATUS_MESSAGE_CHANNEL = "/app/status";
  private CompletableFuture<HelpRequest> helpRequestFuture = new CompletableFuture<>();
  private final CompletableFuture<ChatMessage> chatMessageFuture = new CompletableFuture<>();
  private String uri;
  @LocalServerPort private int randomServerPort;

  @Test
  void frontendSocketControllerNewRequestTest()
      throws InterruptedException, ExecutionException, TimeoutException {
    WebSocketStompClient stompClient1;
    stompClient1 =
        new WebSocketStompClient(
            new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
    stompClient1.setMessageConverter(new MappingJackson2MessageConverter());
    uri = "ws://localhost:" + randomServerPort + "/requests";
    StompSession session1 =
        stompClient1.connect(uri, new CustomStompSessionHandlerAdapter()).get(1, SECONDS);
    session1.subscribe(WEBSOCKET_REQUEST_TOPIC, new HelpRequestFrameHandler());
    session1.send(
        WEBSOCKET_REQUEST_MESSAGE_CHANNEL,
        new Driver(Collections.singletonList("V1RTUALV1N0000001"), "juliaBecker"));
    HelpRequest helpRequest = helpRequestFuture.get(10, SECONDS);
    System.out.println(helpRequest.toString());
    assertNotNull(helpRequest);
  }

  @Test
  void frontendSocketControllerStatusUpdateTest()
      throws InterruptedException, ExecutionException, TimeoutException {
    WebSocketStompClient driverClient =
        new WebSocketStompClient(
            new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
    WebSocketStompClient assistanceClient =
        new WebSocketStompClient(
            new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
    driverClient.setMessageConverter(new MappingJackson2MessageConverter());
    assistanceClient.setMessageConverter(new MappingJackson2MessageConverter());
    uri = "ws://localhost:" + randomServerPort + "/requests";
    StompSession driverSession =
        driverClient.connect(uri, new CustomStompSessionHandlerAdapter()).get(1, SECONDS);
    driverSession.subscribe(WEBSOCKET_STATUS_TOPIC, new HelpRequestFrameHandler());
    StompSession assistanceSession =
        assistanceClient.connect(uri, new CustomStompSessionHandlerAdapter()).get(1, SECONDS);

    assistanceSession.subscribe(WEBSOCKET_REQUEST_TOPIC, new HelpRequestFrameHandler());
    driverSession.send(
        WEBSOCKET_REQUEST_MESSAGE_CHANNEL,
        new Driver(Collections.singletonList("V1RTUALV1N0000001"), "juliaBecker"));
    HelpRequest helpRequest = helpRequestFuture.get(5, SECONDS);
    assistanceSession.send(WEBSOCKET_STATUS_MESSAGE_CHANNEL, helpRequest);
    helpRequestFuture = new CompletableFuture<>();
    HelpRequest message = helpRequestFuture.get(5, SECONDS);
    System.out.println(helpRequest);
    System.out.println(message);
    assertNotNull(message);
    assertEquals(Status.IN_PROGRESS, message.getStatus());
  }

  @Test
  void frontendSocketControllerChatMessageTest()
      throws InterruptedException, ExecutionException, TimeoutException {
    WebSocketStompClient driverClient =
        new WebSocketStompClient(
            new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
    WebSocketStompClient assistanceClient =
        new WebSocketStompClient(
            new SockJsClient(
                Collections.singletonList(new WebSocketTransport(new StandardWebSocketClient()))));
    driverClient.setMessageConverter(new MappingJackson2MessageConverter());
    assistanceClient.setMessageConverter(new MappingJackson2MessageConverter());
    uri = "ws://localhost:" + randomServerPort + "/requests";
    StompSession driverSession =
        driverClient.connect(uri, new CustomStompSessionHandlerAdapter()).get(1, SECONDS);
    driverSession.subscribe(WEBSOCKET_CHAT_TOPIC, new ChatMessageFrameHandler());
    StompSession assistanceSession =
        assistanceClient.connect(uri, new CustomStompSessionHandlerAdapter()).get(1, SECONDS);

    assistanceSession.subscribe(WEBSOCKET_CHAT_TOPIC, new ChatMessageFrameHandler());
    driverSession.send(
        WEBSOCKET_CHAT_CHANNEL, new ChatMessage("juliaBecker", "Help!!", "AssistanceOperator"));
    ChatMessage driverMessage = chatMessageFuture.get(5, SECONDS);
    assertEquals("Help!!", driverMessage.getMessage());
  }

  private static class CustomStompSessionHandlerAdapter extends StompSessionHandlerAdapter {

    public void afterConnected(
        @NonNull StompSession stompSession, @NonNull StompHeaders stompHeaders) {
      System.out.println("Now connected");
    }

    @Override
    public void handleException(
        @NonNull StompSession session,
        StompCommand command,
        @NonNull StompHeaders headers,
        @NonNull byte[] payload,
        Throwable exception) {
      System.out.println("Got an exception" + exception.getMessage());
      exception.printStackTrace();
    }
  }

  private class HelpRequestFrameHandler implements StompFrameHandler {

    @SuppressWarnings("NullableProblems")
    @Override
    public Type getPayloadType(@NonNull StompHeaders stompHeaders) {
      System.out.println("HelpRequest Message being handled");
      return HelpRequest.class;
    }

    @Override
    public void handleFrame(@NonNull StompHeaders stompHeaders, Object o) {
      helpRequestFuture.complete((HelpRequest) o);
    }
  }

  private class ChatMessageFrameHandler implements StompFrameHandler {

    @SuppressWarnings("NullableProblems")
    @Override
    public Type getPayloadType(@NonNull StompHeaders stompHeaders) {
      System.out.println("Chat Message being handled");
      return ChatMessage.class;
    }

    @Override
    public void handleFrame(@NonNull StompHeaders stompHeaders, Object o) {
      chatMessageFuture.complete((ChatMessage) o);
    }
  }
}
