import { NotificationGroup } from "notiwind";
import { Notification } from "notiwind";

declare module "notiwind" {
  import { Plugin } from "vue";
  const Notifications: Plugin;
  export default Notifications;
  export default NotificationGroup;
  export function notify(
    notification: {
      group: string;
      title: string;
      text?: string;
      kind?: "error" | "success";
    },
    time: number
  ): void;
}
