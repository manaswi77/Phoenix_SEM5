import { tableSchema } from "@nozbe/watermelondb";

export const securityScreenSchema = tableSchema({
  name: "security_screen",
  columns: [
    { name: "current_feature", type: "string" },
    { name: "is_sos_button_enabled", type: "boolean" },
    { name: "is_safety_timer_enabled", type: "boolean" },
    { name: "safety_timer_time_interval", type: "string" },
    { name: "sos_button_contacts", type: "string" },
    { name: "safety_timer_contacts", type: "string" },
  ],
});
