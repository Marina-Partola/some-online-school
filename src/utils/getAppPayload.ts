import { getPayload } from "payload";
import config from "@/modules/admin/payload.config";

export const getAppPayload = () => {
  return getPayload({ config });
};
