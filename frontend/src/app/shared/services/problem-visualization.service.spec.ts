import {TestBed} from '@angular/core/testing';

import {ProblemVisualizationService} from './problem-visualization.service';

describe('ProblemVisualizationService', () => {
  let service: ProblemVisualizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProblemVisualizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
