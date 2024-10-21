import Model from "@nozbe/watermelondb/Model";
import { field } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
  static table = "users";

  @field("is_logged_in") isLoggedIn!: boolean;
  @field("token") token!: string;
}
