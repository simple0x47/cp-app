import {Observable} from 'rxjs';
import {Entity} from "../../../api/entity-api/entity";
import {EntityProviderService} from "../../../api/entity-api/entity-provider.service";

export class EntityProviderServiceMock extends EntityProviderService {

  constructor() {
    super();
  }

  public override getEntities$(entityType: string): Observable<Entity[]> {
    const firstEntity = new Entity();
    firstEntity["name"] = "Entity 1";
    firstEntity["description"] = "First entity";
    firstEntity["year"] = "2023";
    firstEntity["verified"] = "true";

    const secondEntity = new Entity();
    secondEntity["name"] = "Entity 2";
    secondEntity["description"] = "Second entity";
    secondEntity["year"] = "2020";
    secondEntity["verified"] = "true";

    const thirdEntity = new Entity();
    thirdEntity["name"] = "Entity 3";
    thirdEntity["description"] = "Third entity";
    thirdEntity["year"] = "2015";
    thirdEntity["verified"] = "true";


    const entity: Entity[] = [
      firstEntity, secondEntity, thirdEntity
    ];

    return new Observable(observer => {
      observer.next(entity);
    });
  }
}
