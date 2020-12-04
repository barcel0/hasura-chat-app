import { gql } from '@apollo/client';

//QUERIES
export const QUERY_ROOMS = gql`
  query{
    rooms{
      id
      name
    }
  }
`;

//SUBSCRIPTIONS
export const SUBSCRIPTION_ROOM_MESSAGES = gql`
  subscription roomMessages($id: uuid!){
      rooms_by_pk(id: $id){
        name
        messages {
          id
          content
          author
        }
      }
  }
`;

export const SUBSCRIPTION_USERS_ONLINE = gql`
subscription{
  users_online(order_by: {name: asc}){
    id
    name
  }
}
`;

//MUTATIONS
export const MUTATION_ADD_MESSAGE = gql`
  mutation insert_single_message(
    $author: String!,
    $content: String!,
    $room: uuid!
  ){
    insert_messages_one(
      object: {
        author: $author,
        content: $content,
        room: $room
      }
    ){
      id
    }
  }
`;

export const MUTATION_CREATE_USER = gql`
  mutation upsert_user(
    $name: String!,
    $last_online: timestamptz!
  ){
    insert_users_one(
      object: {
        name: $name,
        last_online: $last_online
      },
      on_conflict: {
        constraint: users_name_key,
        update_columns: [last_online]
      }
    ){
      id
      name
    }
  }
`;

export const MUTATION_UPDATE_USER = gql`
  mutation update_user($id: uuid!){
    update_users_by_pk(pk_columns: {id: $id}, _set: {last_online: "now()"}) {
      id
      last_online
    }
  }
`;