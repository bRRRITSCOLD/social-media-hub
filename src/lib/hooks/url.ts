import {
  useLocation,
} from 'react-router-dom';

export function useUrlQueryString(): URLSearchParams {
  return new URLSearchParams(useLocation().search);
}
