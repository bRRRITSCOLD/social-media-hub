import {
  useLocation,
} from 'react-router-dom';

export function useUrlQueryString() {
  return new URLSearchParams(useLocation().search);
}
