import { Field, ObjectType } from 'type-graphql';

import { UserData } from '@schemas/user';

import DataObject from './dataObject';

@ObjectType()
class PopulatedData extends DataObject {
    @Field(() => UserData)
    user: UserData;
}

export default PopulatedData;
