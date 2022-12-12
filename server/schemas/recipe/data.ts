import { Field, ObjectType } from 'type-graphql';

import DataObject from './dataObject';

@ObjectType()
class Data extends DataObject {
    @Field(() => String)
    user: string;
}

export default Data;
