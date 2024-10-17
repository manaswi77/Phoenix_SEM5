import Model from "@nozbe/watermelondb/Model";
import { field } from "@nozbe/watermelondb/decorators";

export default class SecurityScreenModel extends Model {
  static table = "security_screen";

  @field("current_feature") currentFeature!: string;
  @field("is_sos_button_enabled") isSOSButtonEnabled!: boolean;
  @field("is_safety_timer_enabled") isSafetyTimerEnabled!: boolean;
  @field("safety_timer_time_interval") safetyTimerTimeIntervalString!: string;
  @field("sos_button_contacts") sosButtonContactsString!: string;
  @field("safety_timer_contacts") safetyTimerContactsString!: string;

  get safetyTimerTimeInterval() {
    return JSON.parse(this.safetyTimerTimeIntervalString || "[]");
  }

  set safetyTimerTimeInterval(value: number[]) {
    this.safetyTimerTimeIntervalString = JSON.stringify(value);
  }

  get sosButtonContacts() {
    return JSON.parse(this.sosButtonContactsString || "[]");
  }

  set sosButtonContacts(value: string[]) {
    this.sosButtonContactsString = JSON.stringify(value);
  }

  get safetyTimerContacts() {
    return JSON.parse(this.safetyTimerContactsString || "[]");
  }

  set safetyTimerContacts(value: string[]) {
    this.safetyTimerContactsString = JSON.stringify(value);
  }
}
