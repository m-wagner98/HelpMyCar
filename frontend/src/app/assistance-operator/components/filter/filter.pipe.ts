import {Pipe, PipeTransform} from '@angular/core';

/**
 * Filters an array of Request objects.
 * Use ';' to send multiple criterias and use ':' after some criterias to seach thru this specific selection.
 */
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(requests: any[], criteriaString: string): any[] {
    if (!requests) {
      return [];
    }
    if (!criteriaString) {
      return requests;
    }
    // to seach filtered items
    const parameters = criteriaString.split(':');

    const criterias = parameters[0].split(';');
    const filteredCriterias = requests.filter(req => {
      // pass a copy of the criterias
      return this.checkMultipleCriterias(JSON.stringify(req).toLowerCase(), criterias.slice(0));
    });
    if (parameters.length > 1 && parameters[1]) {
      const additionalSearchParameters = parameters[1].split(';');
      return filteredCriterias.filter(req => {
        // pass a copy of the additionalSearchParameters
        return this.checkMultipleCriterias(JSON.stringify(req).toLowerCase(), additionalSearchParameters.slice(0));
      });
    }
    return filteredCriterias;
  }

  private checkMultipleCriterias(helpRequest: string, criterias: string[]): boolean {
    if (!criterias.length) {
      return false;
    }
    const criteria = criterias.splice(0, 1)[0];
    return helpRequest.includes(criteria.toLowerCase().trim()) ||
      this.checkMultipleCriterias(helpRequest, criterias);
  }
}

