package greenboxcollective.helpmycar.backend.model.requests;

import java.util.ArrayList;
import java.util.List;

public class HelpRequestList {
  private static HelpRequestList instance;
  private List<HelpRequest> requestList = new ArrayList<>();

  private HelpRequestList() {}

  /**
   * Singleton implementation of this class.
   *
   * @return instance of this class
   */
  public static HelpRequestList getInstance() {
    if (HelpRequestList.instance == null) {
      HelpRequestList.instance = new HelpRequestList();
    }
    return instance;
  }

  public List<HelpRequest> getRequestList() {
    return requestList;
  }

  public void setRequestList(List<HelpRequest> requestList) {
    this.requestList = requestList;
  }
}
