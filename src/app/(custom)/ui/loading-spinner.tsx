//? REACT BOOTSTRAP
import { Spinner } from "react-bootstrap";

export function LoadingSpinner() {
  return (
    <div className="mt-2">
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      <span className="mx-2">Views</span>
  </div>
  );
}
