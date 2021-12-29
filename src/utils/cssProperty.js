export default function (property) {
  return getComputedStyle(document.body).getPropertyValue(property);
}