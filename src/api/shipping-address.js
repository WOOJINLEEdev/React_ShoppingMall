import { instance } from "utils/http-client";

export function updateShippingAddressApi({
  name,
  recipientName,
  postalCode,
  address1,
  address2,
  note,
  phone1,
  phone2,
}) {
  return instance.put("/v1/me/shipping-address", {
    name: name,
    recipient_name: recipientName,
    postal_code: postalCode,
    address1: address1,
    address2: address2,
    note: note,
    phone1: phone1,
    phone2: phone2,
  });
}