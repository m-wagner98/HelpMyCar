package greenboxcollective.helpmycar.backend.controller;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

  /**
   * Provides mapping for applications to subscribe to the socket connections. The app that
   * subscribes to a channel needs to use the /app prefix. If the app wants to send messages it
   * needs to use the /topic channel.
   *
   * @param registry Spring registry for message broker options
   */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    registry.enableSimpleBroker("/queue", "/topic");
    registry.setApplicationDestinationPrefixes("/app");
    registry.setUserDestinationPrefix("/user");
  }

  /**
   * Provides mapping for applications to connect to the WebSocket.
   *
   * @param registry Spring registry for message broker options
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/requests").setAllowedOrigins("*").withSockJS();
  }
}
