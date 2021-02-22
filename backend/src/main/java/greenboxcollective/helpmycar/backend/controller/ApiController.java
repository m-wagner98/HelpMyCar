package greenboxcollective.helpmycar.backend.controller;

import java.util.List;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import greenboxcollective.helpmycar.backend.logic.RequestBuilder;
import greenboxcollective.helpmycar.backend.logic.MockResponseBuilder;
import greenboxcollective.helpmycar.backend.model.requests.RequestBody;
import greenboxcollective.helpmycar.backend.model.response.ApiResponse;

public class ApiController {

  private static final String SUBSCRIPTION_ID = "SUB_ID";
   private static final String API_KEY = "API_KEY";
  private static ApiController instance;

  private ApiController() {}

  /**
   * Singleton implementation.
   *
   * @return the same CarusoApiController instance
   */
  public static ApiController getInstance() {
    if (ApiController.instance == null) {
      ApiController.instance = new ApiController();
    }
    return ApiController.instance;
  }

  /**
   * Send post request to caruso API.
   *
   * @param vins list of vins for the request
   * @return the JSON response of the API as an ApiResponse Object
   */
  public ApiResponse doPost(final List<String> vins) {

    final RequestBody requestBody = RequestBuilder.getInstance().generateRequest(vins);
    final String uri = "https://randomApiThatDoesNotExist.com/API";
    final RestTemplate restTemplate = new RestTemplate();

    final HttpHeaders headers = new HttpHeaders();
    headers.set("X-Subscription-Id", SUBSCRIPTION_ID);
    headers.set("X-API-Key", API_KEY);
    final HttpEntity<RequestBody> request = new HttpEntity<>(requestBody, headers);
    try {
      ResponseEntity<ApiResponse> response =
          restTemplate.postForEntity(uri, request, ApiResponse.class);
      if (response.getBody() != null && !response.getBody().hasVehicleLevelError()) {
        return response.getBody();
      } else {
        System.out.println("Error found, responding with mock data.");
        return MockResponseBuilder.buildMockResponse(vins.size(), vins);
      }
    } catch (RestClientException e) {
      e.printStackTrace();
      System.out.println("Error found, responding with mock data.");
      return MockResponseBuilder.buildMockResponse(vins.size(), vins);
    }
  }
}
